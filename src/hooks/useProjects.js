import { useEffect, useState, useCallback } from "react";
import { projects as localProjects } from "@/data/projects";
import { fetchSanityProjects, isSanityConfigured } from "@/lib/sanity";

let cachedProjects = null;

export function useProjects() {
  const [projects, setProjects] = useState(
    () =>
      cachedProjects ||
      localProjects.map((p, idx) => ({
        ...p,
        order: p.order ?? idx + 1,
        source: "local",
      }))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [usingSanity, setUsingSanity] = useState(false);

  const refresh = useCallback(async () => {
    if (!isSanityConfigured()) {
      return;
    }
    setIsLoading(true);
    try {
      const remote = await fetchSanityProjects();
      if (Array.isArray(remote) && remote.length > 0) {
        // Once Sanity has projects, Sanity is the 100% source of truth (so deleting a project in Sanity actually deletes it from the site)
        const normalizedSanity = remote.map((p, idx) => ({
          ...p,
          order: p.order ?? idx + 1,
          id: idx + 1,
          source: "sanity",
        }));
        setUsingSanity(true);
        cachedProjects = normalizedSanity;
        setProjects(normalizedSanity);
      } else {
        // Sanity dataset is empty — fall back to local projects.js until seeded
        const fallback = localProjects.map((p, idx) => ({
          ...p,
          order: p.order ?? idx + 1,
          source: "local",
        }));
        setUsingSanity(false);
        cachedProjects = fallback;
        setProjects(fallback);
      }
    } catch (err) {
      console.warn("Falling back to local projects data:", err?.message || err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const handleUpdate = () => refresh();
    window.addEventListener("projects-updated", handleUpdate);
    return () => window.removeEventListener("projects-updated", handleUpdate);
  }, [refresh]);

  return {
    projects,
    isLoading,
    usingSanity,
    refreshProjects: () => {
      window.dispatchEvent(new Event("projects-updated"));
      return refresh();
    },
  };
}
