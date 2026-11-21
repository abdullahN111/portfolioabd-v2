import { useState, useEffect } from "react";
import {
  Lock,
  Sparkles,
  Upload,
  ArrowUp,
  ArrowDown,
  Save,
  Trash2,
  Edit3,
  Plus,
  CheckCircle2,
  AlertCircle,
  Database,
  RefreshCw,
  ExternalLink,
  Star,
  Wand2,
  LogOut,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { projects as localProjects } from "@/data/projects";
import {
  isSanityConfigured,
  sanityWriteClient,
  uploadImageToSanity,
  saveProjectToSanity,
  updateProjectsSequenceInSanity,
  deleteProjectFromSanity,
  seedLocalProjectsToSanity,
} from "@/lib/sanity";
import { generateProjectCaseStudy, generateSafeSlug } from "@/lib/gemini";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";

const EMPTY_FORM = {
  _id: "",
  slug: "",
  title: "",
  order: 1,
  category: "AI & Backend",
  badge: "Autonomous AI Agent",
  featured: true,
  demoUrl: "",
  tagsText: "",
  duration: "",
  role: "",
  toolsText: "",
  status: "Completed",
  description: "",
  overview: "",
  planning: "",
  challenges: ["", "", "", ""],
  solutions: ["", "", "", ""],
  existingCoverUrl: "",
  existingGalleryUrls: [],
};

export const AdminStudio = () => {
  const expectedPasscode = import.meta.env.VITE_ADMIN_PASSCODE?.trim();
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (!expectedPasscode) return true;
    return sessionStorage.getItem("abd_admin_unlocked") === "true";
  });
  const [passcodeInput, setPasscodeInput] = useState("");
  const [authError, setAuthError] = useState("");

  const { projects, isLoading, usingSanity, refreshProjects } = useProjects();

  // Sequence list state for reordering
  const [sequenceList, setSequenceList] = useState([]);
  const [isSequenceDirty, setIsSequenceDirty] = useState(false);

  // AI Builder & Editor state
  const [rawNotes, setRawNotes] = useState("");
  const [refinePrompt, setRefinePrompt] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // Loading & Status banners
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [isSyncingSequence, setIsSyncingSequence] = useState(false);
  const [statusBanner, setStatusBanner] = useState(null);

  useEffect(() => {
    setSequenceList(projects);
    setIsSequenceDirty(false);
  }, [projects]);

  useEffect(() => {
    if (!coverFile) {
      setCoverPreview("");
      return;
    }
    const url = URL.createObjectURL(coverFile);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

  useEffect(() => {
    if (!galleryFiles.length) {
      setGalleryPreviews([]);
      return;
    }
    const urls = galleryFiles.map((f) => URL.createObjectURL(f));
    setGalleryPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [galleryFiles]);

  // Automatically compute a safe, collision-free slug whenever title changes
  const handleTitleChange = (newTitle) => {
    const autoSlug = generateSafeSlug(newTitle, sequenceList, form._id);
    setForm((prev) => ({
      ...prev,
      title: newTitle,
      slug: autoSlug,
    }));
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcodeInput.trim() === expectedPasscode) {
      sessionStorage.setItem("abd_admin_unlocked", "true");
      setIsUnlocked(true);
      setAuthError("");
    } else {
      setAuthError("Invalid admin passcode.");
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem("abd_admin_unlocked");
    setIsUnlocked(false);
    setPasscodeInput("");
  };

  const resetForm = () => {
    setForm({
      ...EMPTY_FORM,
      order: 1,
    });
    setRawNotes("");
    setRefinePrompt("");
    setCoverFile(null);
    setGalleryFiles([]);
  };

  const loadProjectIntoEditor = (proj) => {
    const docId = proj._id || `project-${proj.slug}`;
    setForm({
      _id: docId,
      slug:
        proj.slug ||
        generateSafeSlug(proj.title || "", sequenceList, docId),
      title: proj.title || "",
      order: proj.order || proj.id || 1,
      category: proj.category || "Full Stack",
      badge: proj.badge || proj.category || "Full-Stack",
      featured: Boolean(proj.featured),
      demoUrl: proj.demoUrl || "",
      tagsText: (proj.tags || []).join(", "),
      duration: proj.quickInfo?.duration || "1 month",
      role: proj.quickInfo?.role || "Full-Stack Developer",
      toolsText: (proj.quickInfo?.tools || []).join(", "),
      status: proj.quickInfo?.status || "Completed",
      description: proj.description || "",
      overview: proj.overview || "",
      planning: proj.planning || "",
      challenges: [
        proj.challenges?.[0] || "",
        proj.challenges?.[1] || "",
        proj.challenges?.[2] || "",
        proj.challenges?.[3] || "",
      ],
      solutions: [
        proj.solutions?.[0] || "",
        proj.solutions?.[1] || "",
        proj.solutions?.[2] || "",
        proj.solutions?.[3] || "",
      ],
      existingCoverUrl: proj.image || "",
      existingGalleryUrls: proj.gallery || [],
    });
    setCoverFile(null);
    setGalleryFiles([]);
    setStatusBanner({
      type: "info",
      text: `Loaded "${proj.title}" into the editor (Position #${proj.order || proj.id}).`,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGenerateWithGemini = async (isRefinement = false) => {
    if (!isRefinement && !rawNotes.trim() && !coverFile && !galleryFiles.length) {
      setStatusBanner({
        type: "error",
        text: "Describe your project in short words (or upload screenshots) in Step 1 so Gemini AI can auto-fill all Step 2 fields.",
      });
      return;
    }

    setIsGeneratingAI(true);
    setStatusBanner(null);

    try {
      const attachedImages = [
        ...(coverFile ? [coverFile] : []),
        ...galleryFiles,
      ].slice(0, 3);

      const currentDraft = isRefinement
        ? {
            slug: form.slug,
            title: form.title,
            demoUrl: form.demoUrl,
            category: form.category,
            badge: form.badge,
            tags: form.tagsText
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
            quickInfo: {
              duration: form.duration,
              role: form.role,
              tools: form.toolsText
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
              status: form.status,
            },
            description: form.description,
            overview: form.overview,
            planning: form.planning,
            challenges: form.challenges,
            solutions: form.solutions,
          }
        : null;

      const generated = await generateProjectCaseStudy({
        rawNotes,
        refinementInstruction: isRefinement ? refinePrompt : "",
        currentDraft,
        imageFiles: attachedImages,
        existingProjects: sequenceList,
        currentDocId: form._id,
      });

      setForm((prev) => ({
        ...prev,
        slug: generateSafeSlug(generated.title, sequenceList, prev._id),
        title: generated.title,
        demoUrl: generated.demoUrl || prev.demoUrl,
        category: generated.category,
        badge: generated.badge,
        tagsText: generated.tags.join(", "),
        duration: generated.quickInfo.duration,
        role: generated.quickInfo.role,
        toolsText: generated.quickInfo.tools.join(", "),
        status: generated.quickInfo.status,
        description: generated.description,
        overview: generated.overview,
        planning: generated.planning,
        challenges: generated.challenges,
        solutions: generated.solutions,
      }));

      if (isRefinement) setRefinePrompt("");

      setStatusBanner({
        type: "success",
        text: isRefinement
          ? "Gemini AI refined all fields while preserving schema guardrails."
          : "Gemini AI auto-filled all Step 2 fields (including Title, Auto-Slug, URL, Stack, Overview, Planning, and Challenges/Solutions)!",
      });
    } catch (err) {
      console.error("Gemini generation error:", err);
      setStatusBanner({
        type: "error",
        text: `Gemini AI Error: ${err?.message || "Failed to generate content."}`,
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handlePublishToSanity = async (e) => {
    e.preventDefault();
    const safeSlug = generateSafeSlug(form.title, sequenceList, form._id);

    if (!form.title.trim() || !safeSlug) {
      setStatusBanner({
        type: "error",
        text: "Please generate or enter a valid Project Title first.",
      });
      return;
    }
    if (!coverFile && !form.existingCoverUrl) {
      setStatusBanner({
        type: "error",
        text: "Please upload a cover image in Step 1.",
      });
      return;
    }

    setIsSavingProject(true);
    setStatusBanner(null);

    try {
      if (!usingSanity && sanityWriteClient) {
        await seedLocalProjectsToSanity(localProjects);
      }

      let coverImageAsset = null;
      if (coverFile) {
        coverImageAsset = await uploadImageToSanity(coverFile);
      }

      let galleryImageAssets = [];
      if (galleryFiles.length > 0) {
        galleryImageAssets = await Promise.all(
          galleryFiles.map((file) => uploadImageToSanity(file))
        );
      }

      const payload = {
        _id: form._id || undefined,
        slug: safeSlug,
        title: form.title,
        order: Number(form.order) || 1,
        category: form.category,
        badge: form.badge,
        featured: form.featured,
        demoUrl: form.demoUrl,
        tags: form.tagsText
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        quickInfo: {
          duration: form.duration || "1 week",
          role: form.role || "Full-Stack Developer",
          tools: form.toolsText
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          status: form.status,
        },
        description: form.description,
        overview: form.overview,
        planning: form.planning,
        challenges: form.challenges.filter((c) => c.trim()),
        solutions: form.solutions.filter((s) => s.trim()),
        coverImageAsset,
        galleryImageAssets,
        image: form.existingCoverUrl,
        gallery: form.existingGalleryUrls,
      };

      const saved = await saveProjectToSanity(payload, sequenceList);
      await refreshProjects();

      setStatusBanner({
        type: "success",
        text: `"${saved.title}" (slug: /projects/${saved.slug}) published to Sanity at Sequence Position #${saved.order}!`,
      });
      resetForm();
    } catch (err) {
      console.error("Sanity save error:", err);
      setStatusBanner({
        type: "error",
        text: `Sanity Save Error: ${err?.message || "Check CORS origins and VITE_SANITY_TOKEN in .env."}`,
      });
    } finally {
      setIsSavingProject(false);
    }
  };

  const handleSeedLocalProjects = async () => {
    setIsSyncingSequence(true);
    setStatusBanner(null);
    try {
      await seedLocalProjectsToSanity(localProjects);
      await refreshProjects();
      setStatusBanner({
        type: "success",
        text: "All 8 local projects have been synced to Sanity! You can now reorder or edit any of them.",
      });
    } catch (err) {
      console.error("Seed error:", err);
      setStatusBanner({
        type: "error",
        text: `Failed to sync projects to Sanity: ${err?.message || "Verify CORS origin http://localhost:5173 is added in Sanity dashboard."}`,
      });
    } finally {
      setIsSyncingSequence(false);
    }
  };

  const moveProjectInSequence = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sequenceList.length) return;
    const copy = [...sequenceList];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);
    const reindexed = copy.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));
    setSequenceList(reindexed);
    setIsSequenceDirty(true);
  };

  const toggleProjectFeatured = (index) => {
    const copy = [...sequenceList];
    copy[index] = { ...copy[index], featured: !copy[index].featured };
    setSequenceList(copy);
    setIsSequenceDirty(true);
  };

  const handleSaveSequenceOrder = async () => {
    setIsSyncingSequence(true);
    setStatusBanner(null);
    try {
      if (!usingSanity) {
        await seedLocalProjectsToSanity(localProjects);
      }
      await updateProjectsSequenceInSanity(sequenceList);
      await refreshProjects();
      setIsSequenceDirty(false);
      setStatusBanner({
        type: "success",
        text: "Project sequence order and featured flags updated in Sanity!",
      });
    } catch (err) {
      console.error("Reorder error:", err);
      setStatusBanner({
        type: "error",
        text: `Failed to save sequence: ${err?.message}`,
      });
    } finally {
      setIsSyncingSequence(false);
    }
  };

  const handleDeleteProject = async (proj) => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete "${proj.title}" from your portfolio?`
      )
    ) {
      return;
    }
    setIsSyncingSequence(true);
    setStatusBanner(null);
    try {
      // If Sanity has not been seeded yet, seed all other local projects first so Sanity becomes the source of truth without this deleted project
      if (!usingSanity) {
        const remainingLocal = localProjects.filter(
          (lp) => lp.slug !== proj.slug
        );
        await seedLocalProjectsToSanity(remainingLocal);
      } else {
        await deleteProjectFromSanity(proj);
        const remaining = sequenceList.filter((p) => p.slug !== proj.slug);
        if (remaining.length > 0) {
          await updateProjectsSequenceInSanity(remaining);
        }
      }
      await refreshProjects();
      setStatusBanner({
        type: "success",
        text: `Deleted "${proj.title}" and updated the project sequence.`,
      });
    } catch (err) {
      setStatusBanner({
        type: "error",
        text: `Delete failed: ${err?.message}`,
      });
    } finally {
      setIsSyncingSequence(false);
    }
  };

  if (!isUnlocked) {
    return (
      <main className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4">
        <SEO title="Admin Studio" />
        <form
          onSubmit={handleUnlock}
          className="w-full max-w-md rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xl p-8 shadow-xl text-left space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/30">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Abd.Dev Admin Studio</h1>
              <p className="text-xs text-muted-foreground">
                Protected Sanity + Gemini AI Project Manager
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-passcode"
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
            >
              Admin Passcode
            </label>
            <input
              id="admin-passcode"
              type="password"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              placeholder="Enter Admin Passcode"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
            {authError && (
              <p className="text-xs text-rose-400 mt-2">{authError}</p>
            )}
          </div>

          <button type="submit" className="cosmic-button w-full py-3">
            Unlock Studio
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-24 px-4">
      <SEO title="Admin Studio — Project & AI Manager" />

      <div className="container max-w-7xl mx-auto space-y-8 text-left">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card/85 backdrop-blur-md p-5 sm:p-6">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary border border-primary/25">
                <Sparkles className="h-3.5 w-3.5" />
                Gemini 4 Hydrogen + Sanity CMS
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border",
                  isSanityConfigured() && sanityWriteClient
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                )}
              >
                <Database className="h-3.5 w-3.5" />
                {usingSanity
                  ? "Sanity Live Connected"
                  : isSanityConfigured()
                    ? "Sanity Ready (Seed or Add Project)"
                    : "Sanity Not Configured"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
              Portfolio AI Studio &amp; Sequence Manager
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {import.meta.env.VITE_SANITY_PROJECT_ID && (
              <a
                href={`https://www.sanity.io/manage/personal/project/${import.meta.env.VITE_SANITY_PROJECT_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary/50 hover:bg-secondary px-3.5 py-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <Database className="h-3.5 w-3.5 text-primary" />
                Sanity Dashboard
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary/70 hover:bg-secondary px-4 py-2 text-xs sm:text-sm font-medium cursor-pointer"
            >
              <Plus className="h-4 w-4 text-primary" />
              New Project
            </button>
            {expectedPasscode && (
              <button
                type="button"
                onClick={handleLock}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card hover:bg-secondary px-3.5 py-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Lock
              </button>
            )}
          </div>
        </div>

        {/* Status Banner */}
        {statusBanner && (
          <div
            className={cn(
              "flex items-center justify-between gap-3 rounded-2xl border p-4 text-sm",
              statusBanner.type === "success"
                ? "border-emerald-500/35 bg-emerald-500/10 text-emerald-300"
                : statusBanner.type === "error"
                  ? "border-rose-500/35 bg-rose-500/10 text-rose-300"
                  : "border-primary/35 bg-primary/10 text-primary"
            )}
          >
            <div className="flex items-center gap-2.5">
              {statusBanner.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0" />
              )}
              <span>{statusBanner.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusBanner(null)}
              className="p-1 hover:opacity-75 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLUMNS: Step 1 (Short Prompt + Images) & Step 2 (Auto-Filled by AI) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Single Box AI Prompt + Screenshots + Sequence Selector */}
            <section className="rounded-2xl border border-primary/30 bg-card/85 backdrop-blur-sm p-6 space-y-5 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Step 1 — Describe Project in Short Words
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold">
                    Upload Screenshots &amp; Let Gemini Auto-Fill Everything
                  </h2>
                </div>
                <Wand2 className="h-5 w-5 text-primary" />
              </div>

              {/* Image Upload Dropzones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-dashed border-border p-4 bg-background/50">
                  <label className="flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center">
                    <Upload className="h-5 w-5 text-primary" />
                    <span className="text-xs font-semibold text-foreground">
                      1. Upload Cover Screenshot *
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {coverFile
                        ? coverFile.name
                        : form.existingCoverUrl
                          ? "Using existing cover image"
                          : "PNG / JPG / WebP (Hero view)"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setCoverFile(e.target.files?.[0] || null)
                      }
                      className="hidden"
                    />
                  </label>
                  {(coverPreview || form.existingCoverUrl) && (
                    <img
                      src={coverPreview || form.existingCoverUrl}
                      alt="Cover preview"
                      className="mt-3 h-28 w-full object-cover object-top rounded-lg border border-border"
                    />
                  )}
                </div>

                <div className="rounded-xl border border-dashed border-border p-4 bg-background/50">
                  <label className="flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    <span className="text-xs font-semibold text-foreground">
                      2. Upload Gallery Screenshots
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {galleryFiles.length > 0
                        ? `${galleryFiles.length} file(s) selected`
                        : form.existingGalleryUrls.length > 0
                          ? `${form.existingGalleryUrls.length} existing gallery image(s)`
                          : "Optional extra screenshots"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        setGalleryFiles(Array.from(e.target.files || []))
                      }
                      className="hidden"
                    />
                  </label>
                  {(galleryPreviews.length > 0 ||
                    form.existingGalleryUrls.length > 0) && (
                    <div className="mt-3 grid grid-cols-3 gap-1.5">
                      {(galleryPreviews.length > 0
                        ? galleryPreviews
                        : form.existingGalleryUrls
                      )
                        .slice(0, 6)
                        .map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            alt={`Gallery ${i + 1}`}
                            className="h-14 w-full object-cover object-top rounded border border-border"
                          />
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Single Unified Short Description Box */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  3. Describe Everything in Short Words (Name, Live URL,
                  Timeline, Stack &amp; What It Does)
                </label>
                <textarea
                  rows={4}
                  value={rawNotes}
                  onChange={(e) => setRawNotes(e.target.value)}
                  placeholder="Example: OpsTriage AI, live at https://opstriage-ai.vercel.app/, built in 1 day. Automatic email triage agent that fetches Gmail inbox, summarizes emails, runs a 5-step triage pipeline checking Google Drive SOP policies, logs records into Google Sheets, and drafts replies that I can refine with AI."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                />
              </div>

              {/* Sequence Position & Featured Toggle right in Step 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-1">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    4. Choose Sequence Position in Portfolio
                  </label>
                  <select
                    value={form.order}
                    onChange={(e) =>
                      setForm({ ...form, order: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value={1}>#1 — Top of Portfolio (First)</option>
                    {sequenceList.map((p, idx) => (
                      <option key={p.slug} value={idx + 2}>
                        #{idx + 2} — After {p.title.slice(0, 28)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:pt-5">
                  <label className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium cursor-pointer rounded-xl border border-border bg-background/60 px-4 py-2.5 w-full">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) =>
                        setForm({ ...form, featured: e.target.checked })
                      }
                      className="h-4 w-4 accent-primary rounded"
                    />
                    <span>Show in Home Page Featured Showcase</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  disabled={isGeneratingAI}
                  onClick={() => handleGenerateWithGemini(false)}
                  className="cosmic-button px-6 py-3 text-sm disabled:opacity-60"
                >
                  <Sparkles className="h-4 w-4" />
                  {isGeneratingAI
                    ? "Gemini AI is Filling All Step 2 Fields..."
                    : "Auto-Fill All Step 2 Fields with Gemini AI"}
                </button>

                {form.description && (
                  <div className="flex-1 flex items-center gap-2 min-w-[240px]">
                    <input
                      type="text"
                      value={refinePrompt}
                      onChange={(e) => setRefinePrompt(e.target.value)}
                      placeholder="Ask AI to tweak (e.g. 'change duration to 3 days', 'add Redis tag')"
                      className="flex-1 px-3 py-2.5 rounded-xl border border-border bg-background text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      disabled={isGeneratingAI || !refinePrompt.trim()}
                      onClick={() => handleGenerateWithGemini(true)}
                      className="rounded-xl border border-primary/40 bg-primary/15 hover:bg-primary/25 text-primary px-4 py-2.5 text-xs font-semibold disabled:opacity-50 cursor-pointer"
                    >
                      Refine
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Step 2: Auto-Filled Structured Fields & Auto-Slug */}
            <form
              onSubmit={handlePublishToSanity}
              className="rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm p-6 space-y-5 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Step 2 — AI Auto-Filled Case Study (Editable Preview)
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold">
                    {form._id
                      ? `Editing: ${form.title}`
                      : "Review AI Output & Publish"}
                  </h2>
                </div>
                <span className="text-xs font-mono text-muted-foreground bg-secondary/70 px-3 py-1 rounded-full border border-border">
                  Position #{form.order}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Project Title (Auto-filled by AI) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Auto-filled from Step 1"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-muted-foreground">
                      Auto-Generated URL Slug
                    </label>
                    <span className="text-[10px] font-semibold text-emerald-400">
                      Auto-synced &amp; collision-safe
                    </span>
                  </div>
                  <input
                    type="text"
                    readOnly
                    value={form.slug}
                    placeholder="auto-generated-from-title"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border/70 bg-secondary/40 text-muted-foreground text-sm font-mono cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Live Demo URL (Auto-extracted)
                  </label>
                  <input
                    type="url"
                    value={form.demoUrl}
                    onChange={(e) =>
                      setForm({ ...form, demoUrl: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm"
                  >
                    <option value="AI & Backend">AI &amp; Backend</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="Client Work">Client Work</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Active R&D">Active R&amp;D</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Card Badge Pill
                  </label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) =>
                      setForm({ ...form, badge: e.target.value })
                    }
                    placeholder="Auto-filled by AI"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Duration / Timeline
                  </label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                    placeholder="Auto-filled by AI"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Your Role
                  </label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="Auto-filled by AI"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Tech Stack Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={form.tagsText}
                    onChange={(e) =>
                      setForm({ ...form, tagsText: e.target.value })
                    }
                    placeholder="Auto-filled by AI"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Key Tools (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={form.toolsText}
                    onChange={(e) =>
                      setForm({ ...form, toolsText: e.target.value })
                    }
                    placeholder="Auto-filled by AI"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label className="font-semibold text-muted-foreground">
                    Card Description (1-sentence summary) *
                  </label>
                  <span className="text-muted-foreground">
                    {form.description.length} chars
                  </span>
                </div>
                <textarea
                  rows={2}
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Auto-filled by AI"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Project Overview (2 paragraphs) *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={form.overview}
                    onChange={(e) =>
                      setForm({ ...form, overview: e.target.value })
                    }
                    placeholder="Auto-filled by AI"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Architecture &amp; Planning (2 paragraphs) *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={form.planning}
                    onChange={(e) =>
                      setForm({ ...form, planning: e.target.value })
                    }
                    placeholder="Auto-filled by AI"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm"
                  />
                </div>
              </div>

              {/* 4 Paired Challenges & Solutions */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Paired Engineering Challenges &amp; Solutions (Auto-filled by
                  AI)
                </label>
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl border border-border/60 bg-background/40 p-3"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-primary">
                        Challenge 0{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={form.challenges[idx] || ""}
                        onChange={(e) => {
                          const next = [...form.challenges];
                          next[idx] = e.target.value;
                          setForm({ ...form, challenges: next });
                        }}
                        placeholder={`Challenge ${idx + 1}`}
                        className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-emerald-400">
                        Solution 0{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={form.solutions[idx] || ""}
                        onChange={(e) => {
                          const next = [...form.solutions];
                          next[idx] = e.target.value;
                          setForm({ ...form, solutions: next });
                        }}
                        placeholder={`Solution ${idx + 1}`}
                        className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground">
                  Route:{" "}
                  <code className="text-primary font-mono">
                    /projects/{form.slug || "..."}
                  </code>{" "}
                  • Sequence:{" "}
                  <strong className="text-foreground">#{form.order}</strong>
                </span>

                <button
                  type="submit"
                  disabled={isSavingProject}
                  className="cosmic-button px-7 py-3 text-sm disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {isSavingProject
                    ? "Uploading Assets & Saving to Sanity..."
                    : form._id
                      ? `Update Project at Position #${form.order}`
                      : `Publish Project to Sanity at #${form.order}`}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT 5 COLUMNS: Sequence & Storage Manager */}
          <div className="lg:col-span-5 space-y-6">
            <section className="rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm p-6 space-y-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Portfolio Sequence
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold">
                    Reorder &amp; Manage ({sequenceList.length})
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {!usingSanity && (
                    <button
                      type="button"
                      disabled={isSyncingSequence}
                      onClick={handleSeedLocalProjects}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 px-3 py-2 text-xs font-semibold cursor-pointer"
                    >
                      <RefreshCw
                        className={cn(
                          "h-3.5 w-3.5",
                          isSyncingSequence && "animate-spin"
                        )}
                      />
                      1-Click Sync Local to Sanity
                    </button>
                  )}

                  {isSequenceDirty && (
                    <button
                      type="button"
                      disabled={isSyncingSequence}
                      onClick={handleSaveSequenceOrder}
                      className="cosmic-button px-4 py-2 text-xs"
                    >
                      <Save className="h-3.5 w-3.5" />
                      {isSyncingSequence ? "Saving..." : "Save Order"}
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Use the arrows to adjust the display order across the Home and
                Projects pages, or click the star to toggle Home page featured
                visibility.
              </p>

              <div className="space-y-2.5">
                {sequenceList.map((proj, index) => (
                  <div
                    key={proj.slug}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border/75 bg-background/60 p-3 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary font-bold text-xs border border-primary/25">
                        #{index + 1}
                      </span>

                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="h-10 w-14 shrink-0 rounded-md object-cover object-top border border-border"
                      />

                      <div className="min-w-0">
                        <div className="font-semibold text-xs sm:text-sm text-foreground truncate">
                          {proj.title}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                          <span>{proj.category}</span>
                          <span>•</span>
                          <span
                            className={cn(
                              proj.source === "sanity"
                                ? "text-emerald-400"
                                : "text-amber-400"
                            )}
                          >
                            {proj.source === "sanity" ? "Sanity" : "Local"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleProjectFeatured(index)}
                        title={
                          proj.featured
                            ? "Featured on Home (click to unfeature)"
                            : "Not featured on Home (click to feature)"
                        }
                        className={cn(
                          "p-1.5 rounded-lg border transition-colors cursor-pointer",
                          proj.featured
                            ? "border-amber-500/40 bg-amber-500/15 text-amber-400"
                            : "border-border bg-secondary/40 text-muted-foreground"
                        )}
                      >
                        <Star
                          className={cn(
                            "h-3.5 w-3.5",
                            proj.featured && "fill-amber-400"
                          )}
                        />
                      </button>

                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveProjectInSequence(index, -1)}
                        title="Move Up"
                        className="p-1.5 rounded-lg border border-border bg-secondary/50 hover:bg-secondary disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        disabled={index === sequenceList.length - 1}
                        onClick={() => moveProjectInSequence(index, 1)}
                        title="Move Down"
                        className="p-1.5 rounded-lg border border-border bg-secondary/50 hover:bg-secondary disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => loadProjectIntoEditor(proj)}
                        title="Edit Project"
                        className="p-1.5 rounded-lg border border-border bg-secondary/50 hover:bg-primary/20 hover:text-primary cursor-pointer"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>

                      <Link
                        to={`/projects/${proj.slug}`}
                        title="View Case Study Page"
                        className="p-1.5 rounded-lg border border-border bg-secondary/50 hover:bg-secondary"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDeleteProject(proj)}
                        title="Delete Project"
                        className="p-1.5 rounded-lg border border-border bg-secondary/50 hover:bg-rose-500/20 hover:text-rose-400 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {isLoading && (
                <p className="text-xs text-muted-foreground text-center">
                  Syncing with Sanity CDN...
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};
