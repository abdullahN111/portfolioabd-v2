import { useEffect } from "react";

const DEFAULT_TITLE = "Muhammad Abdullah | Full-Stack Developer & AI Engineer";
const DEFAULT_DESC =
  "Portfolio of Muhammad Abdullah (Abd.Dev) — Full-Stack Developer & AI Engineer specializing in Next.js, React, TypeScript, Python, FastAPI, and OpenAI Agentic Systems.";

export const SEO = ({ title, description }) => {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | Muhammad Abdullah (Abd.Dev)`
      : DEFAULT_TITLE;
    const metaDesc = description || DEFAULT_DESC;

    document.title = fullTitle;

    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", metaDesc);
    setMeta('meta[name="title"]', "content", fullTitle);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", metaDesc);
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", metaDesc);
  }, [title, description]);

  return null;
};

