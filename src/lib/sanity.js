import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim() || "production";
const token = import.meta.env.VITE_SANITY_TOKEN?.trim();

export const isSanityConfigured = () =>
  Boolean(projectId && projectId !== "your_sanity_project_id");

export const sanityReadClient = isSanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2025-02-01",
      useCdn: false,
    })
  : null;

export const sanityWriteClient =
  isSanityConfigured() && token
    ? createClient({
        projectId,
        dataset,
        apiVersion: "2025-02-01",
        token,
        useCdn: false,
      })
    : null;

const PROJECTS_QUERY = `*[_type == "portfolioProject"] | order(order asc, _createdAt desc) {
  _id,
  slug,
  title,
  order,
  category,
  badge,
  featured,
  "image": coalesce(coverImage.asset->url, imageUrl),
  "gallery": coalesce(galleryImages[].asset->url, galleryUrls, []),
  tags,
  demoUrl,
  quickInfo,
  description,
  overview,
  planning,
  challenges,
  solutions
}`;

export async function fetchSanityProjects() {
  if (!sanityReadClient) return [];
  const docs = await sanityReadClient.fetch(PROJECTS_QUERY);
  return (docs || []).map((doc, idx) => ({
    ...doc,
    id: doc.order ?? idx + 1,
    order: doc.order ?? idx + 1,
    gallery: Array.isArray(doc.gallery) ? doc.gallery.filter(Boolean) : [],
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    challenges: Array.isArray(doc.challenges) ? doc.challenges : [],
    solutions: Array.isArray(doc.solutions) ? doc.solutions : [],
    quickInfo: {
      duration: doc.quickInfo?.duration || "2 weeks",
      role: doc.quickInfo?.role || "Full-Stack Developer",
      tools: Array.isArray(doc.quickInfo?.tools) ? doc.quickInfo.tools : [],
      status: doc.quickInfo?.status || "Completed",
    },
  }));
}

export async function uploadImageToSanity(file) {
  if (!sanityWriteClient) {
    throw new Error(
      "Sanity write client is not configured. Check VITE_SANITY_PROJECT_ID and VITE_SANITY_TOKEN in .env."
    );
  }
  const asset = await sanityWriteClient.assets.upload("image", file, {
    filename: file.name || "project-image.png",
  });
  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
    url: asset.url,
  };
}

/**
 * Saves or updates a project in Sanity and adjusts the sequence order of other projects
 * if the project is placed at a specific targetOrder (1-based).
 */
export async function saveProjectToSanity(projectInput, existingProjects = []) {
  if (!sanityWriteClient) {
    throw new Error(
      "Sanity write client is not configured. Check VITE_SANITY_TOKEN in .env."
    );
  }

  const cleanSlug = projectInput.slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const docId = projectInput._id || `project-${cleanSlug}`;
  const desiredOrder = Math.max(
    1,
    Number(projectInput.order) || existingProjects.length + 1
  );

  // Build sorted list of other projects to recalculate clean 1..N sequence numbers
  const others = existingProjects
    .filter((p) => (p._id || `project-${p.slug}`) !== docId && p.slug !== cleanSlug)
    .sort((a, b) => (a.order ?? a.id ?? 999) - (b.order ?? b.id ?? 999));

  const clampedIndex = Math.min(desiredOrder - 1, others.length);

  const docPayload = {
    _id: docId,
    _type: "portfolioProject",
    slug: cleanSlug,
    title: projectInput.title.trim(),
    order: clampedIndex + 1,
    category: projectInput.category || "Full Stack",
    badge: projectInput.badge || projectInput.category || "Full-Stack",
    featured: Boolean(projectInput.featured),
    tags: projectInput.tags || [],
    demoUrl: projectInput.demoUrl?.trim() || "",
    quickInfo: {
      duration: projectInput.quickInfo?.duration || "1 month",
      role: projectInput.quickInfo?.role || "Full-Stack Developer",
      tools: projectInput.quickInfo?.tools || [],
      status: projectInput.quickInfo?.status || "Completed",
    },
    description: projectInput.description || "",
    overview: projectInput.overview || "",
    planning: projectInput.planning || "",
    challenges: projectInput.challenges || [],
    solutions: projectInput.solutions || [],
  };

  if (projectInput.coverImageAsset) {
    docPayload.coverImage = {
      _type: "image",
      asset: projectInput.coverImageAsset.asset,
    };
    docPayload.imageUrl = projectInput.coverImageAsset.url;
  } else if (projectInput.image) {
    docPayload.imageUrl = projectInput.image;
  }

  if (
    Array.isArray(projectInput.galleryImageAssets) &&
    projectInput.galleryImageAssets.length > 0
  ) {
    docPayload.galleryImages = projectInput.galleryImageAssets.map(
      (img, i) => ({
        _key: `gallery-${i}-${Date.now()}`,
        _type: "image",
        asset: img.asset,
      })
    );
    docPayload.galleryUrls = projectInput.galleryImageAssets.map((img) => img.url);
  } else if (Array.isArray(projectInput.gallery)) {
    docPayload.galleryUrls = projectInput.gallery;
  }

  // Recompute sequential order (1..N) for all projects
  const reorderedList = [...others];
  reorderedList.splice(clampedIndex, 0, { _id: docId, isNewTarget: true });

  const tx = sanityWriteClient.transaction();
  tx.createOrReplace(docPayload);

  reorderedList.forEach((item, index) => {
    const newOrder = index + 1;
    if (item.isNewTarget) return;
    const itemDocId = item._id || `project-${item.slug}`;
    if (item._id) {
      tx.patch(itemDocId, (p) => p.set({ order: newOrder }));
    }
  });

  await tx.commit();
  return docPayload;
}

/**
 * Batch updates the sequence order (1..N) and featured flags of Sanity projects.
 */
export async function updateProjectsSequenceInSanity(orderedProjects) {
  if (!sanityWriteClient) {
    throw new Error("Sanity write client is not configured.");
  }

  const tx = sanityWriteClient.transaction();
  orderedProjects.forEach((proj, idx) => {
    const docId = proj._id || `project-${proj.slug}`;
    tx.patch(docId, (p) =>
      p.set({
        order: idx + 1,
        featured: Boolean(proj.featured),
      })
    );
  });

  await tx.commit();
}

export async function deleteProjectFromSanity(project) {
  if (!sanityWriteClient) {
    throw new Error("Sanity write client is not configured.");
  }
  const docId = project._id || `project-${project.slug}`;
  await sanityWriteClient.delete(docId);
}

/**
 * Seeds all local projects from src/data/projects.js into Sanity so they can be
 * reordered, edited, and managed alongside new Sanity projects.
 */
export async function seedLocalProjectsToSanity(localProjects) {
  if (!sanityWriteClient) {
    throw new Error("Sanity write client is not configured.");
  }

  const tx = sanityWriteClient.transaction();

  localProjects.forEach((proj, idx) => {
    const docId = `project-${proj.slug}`;
    tx.createIfNotExists({
      _id: docId,
      _type: "portfolioProject",
      slug: proj.slug,
      title: proj.title,
      order: idx + 1,
      category: proj.category,
      badge: proj.badge || proj.category,
      featured: Boolean(proj.featured),
      imageUrl: proj.image,
      galleryUrls: proj.gallery || [],
      tags: proj.tags || [],
      demoUrl: proj.demoUrl || "",
      quickInfo: proj.quickInfo || {
        duration: "1 month",
        role: "Full-Stack Developer",
        tools: [],
        status: "Completed",
      },
      description: proj.description,
      overview: proj.overview,
      planning: proj.planning,
      challenges: proj.challenges || [],
      solutions: proj.solutions || [],
    });
  });

  await tx.commit();
}
