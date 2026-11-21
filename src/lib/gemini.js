import { GoogleGenAI } from "@google/genai";

const ALLOWED_CATEGORIES = ["Client Work", "Full Stack", "AI & Backend"];
const ALLOWED_STATUSES = ["Completed", "In Progress", "Active R&D"];

/**
 * Bulletproof slug generator covering every edge case:
 * - Strips subtitle after em-dash/en-dash if desired or normalizes full title
 * - Normalizes Unicode diacritics/accents
 * - Converts '&' -> 'and', '+' -> 'plus', '.js' -> 'js'
 * - Removes invalid characters, collapses hyphens, trims edges
 * - Enforces max length and deduplicates against existing project slugs
 */
export function generateSafeSlug(
  rawTitle = "",
  existingProjects = [],
  currentDocId = ""
) {
  if (!rawTitle || typeof rawTitle !== "string") return "";

  // Use primary project name before em-dash (—) or colon if present, unless too short
  const primaryPart = rawTitle.split(/\s*[—–:|]\s*/)[0]?.trim();
  const baseSource =
    primaryPart && primaryPart.length >= 3 ? primaryPart : rawTitle;

  let baseSlug = baseSource
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .toLowerCase()
    .replace(/\.js\b/g, "-js")
    .replace(/&/g, " and ")
    .replace(/\+/g, " plus ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (baseSlug.length > 60) {
    baseSlug = baseSlug.slice(0, 60).replace(/-[^-]*$/, "").replace(/-+$/, "");
  }

  if (!baseSlug) {
    baseSlug = "project";
  }

  // Check collisions against other projects
  const takenSlugs = new Set(
    existingProjects
      .filter((p) => {
        const pId = p._id || `project-${p.slug}`;
        return !currentDocId || pId !== currentDocId;
      })
      .map((p) => p.slug)
  );

  if (!takenSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let counter = 2;
  while (takenSlugs.has(`${baseSlug}-${counter}`)) {
    counter += 1;
  }
  return `${baseSlug}-${counter}`;
}

/**
 * Strict JSON Schema enforcing portfolio project format, constraints, and guardrails.
 */
export const PROJECT_CASE_STUDY_SCHEMA = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description:
        "Project title followed by an em-dash subtitle for context (e.g., 'OpsTriage AI — Autonomous Operations Agent' or 'Fashion Home Sourcing — B2B Textile Platform').",
    },
    demoUrl: {
      type: "string",
      description:
        "Live URL extracted from the user's description if mentioned (e.g., 'https://opstriage-ai.vercel.app/'), or empty string '' if none.",
    },
    category: {
      type: "string",
      enum: ALLOWED_CATEGORIES,
      description:
        "Must be one of: 'Client Work' (for commercial/client websites), 'Full Stack' (for full-stack web apps/SaaS/e-commerce), or 'AI & Backend' (for AI agents, LLM systems, or backend/CLI tools).",
    },
    badge: {
      type: "string",
      description:
        "Concise 2-3 word label shown on the card pill (e.g., 'Autonomous AI Agent', 'Client Project', 'Full-Stack E-Commerce', 'AI + Full-Stack').",
    },
    tags: {
      type: "array",
      items: { type: "string" },
      description:
        "4 to 6 key technologies or architectural tags inferred from the description and screenshots (e.g., ['Next.js', 'Gemini AI', 'FastAPI', 'TypeScript', 'Tailwind CSS']).",
    },
    quickInfo: {
      type: "object",
      properties: {
        duration: {
          type: "string",
          description:
            "Development timeline extracted or inferred from notes (e.g., '1 day', '2 weeks', '2 months').",
        },
        role: {
          type: "string",
          description:
            "Developer role matching the project type (e.g., 'AI Engineer & Full-Stack Developer', 'Full-Stack Developer').",
        },
        tools: {
          type: "array",
          items: { type: "string" },
          description:
            "4 to 6 core tools/platforms used (e.g., ['Next.js', 'Gemini API', 'Tailwind CSS', 'Vercel', 'Git']).",
        },
        status: {
          type: "string",
          enum: ALLOWED_STATUSES,
          description: "Project completion status.",
        },
      },
      required: ["duration", "role", "tools", "status"],
    },
    description: {
      type: "string",
      description:
        "1-sentence high-impact summary for the project card (between 120 and 195 characters). No markdown.",
    },
    overview: {
      type: "string",
      description:
        "Detailed 2-paragraph project overview separated by a double newline (\\n\\n). Paragraph 1 explains what the product is, who it is for, and its core value proposition. Paragraph 2 highlights key user workflows, architectural modes, or standout interface capabilities.",
    },
    planning: {
      type: "string",
      description:
        "Detailed 2-paragraph architecture and planning narrative separated by a double newline (\\n\\n). Paragraph 1 explains the technical architecture, data flow, or agentic pipeline steps. Paragraph 2 explains UX decisions, security/authentication design, or performance/SEO strategy.",
    },
    challenges: {
      type: "array",
      items: { type: "string" },
      description:
        "Exactly 4 specific engineering or product challenges faced during development (each 1 concise sentence, 80-150 characters).",
    },
    solutions: {
      type: "array",
      items: { type: "string" },
      description:
        "Exactly 4 concrete engineering solutions paired 1-to-1 with each challenge in the same order (each 1 concise sentence, 90-170 characters).",
    },
  },
  required: [
    "title",
    "demoUrl",
    "category",
    "badge",
    "tags",
    "quickInfo",
    "description",
    "overview",
    "planning",
    "challenges",
    "solutions",
  ],
};

const SYSTEM_INSTRUCTION = `You are the technical portfolio case-study architect for Muhammad Abdullah (Abd.Dev), a Full-Stack Developer & AI Engineer specializing in Next.js, React, TypeScript, Tailwind CSS, Python, FastAPI, Sanity CMS, and Agentic AI systems (Gemini API, OpenAI Agents SDK, LangChain).

The user will give you a short, casual description of a project in a single text box (along with optional UI screenshots). Your job is to extract EVERY detail—including project title, live URL (if mentioned), duration, role, category, badge, tech stack tags, tools, card description, 2-paragraph overview, 2-paragraph architecture planning, and 4 paired challenges & solutions—so the entire form is 100% auto-populated.

STRICT GUARDRAILS & FORMATTING RULES:
1. VOICE & TONE: Write in clear, authoritative, third-person product/engineering prose (never use cheesy buzzwords, emojis, or markdown headings inside field values).
2. CATEGORY CONSTRAINT: 'category' MUST be strictly one of: "Client Work", "Full Stack", or "AI & Backend".
3. URL EXTRACTION: If the user mentions a URL or domain in their short notes (e.g. "live at https://..." or "example.vercel.app"), extract it as a full https:// URL in 'demoUrl'. If no URL is mentioned, return "".
4. DESCRIPTION LENGTH: 'description' MUST be a single punchy sentence between 120 and 195 characters suitable for a 3-line portfolio card preview.
5. TWO-PARAGRAPH SECTIONS: Both 'overview' and 'planning' MUST contain exactly 2 paragraphs separated by "\\n\\n".
6. 1-TO-1 CHALLENGES & SOLUTIONS: 'challenges' and 'solutions' MUST each contain exactly 4 items. Solution[i] must directly solve Challenge[i] with concrete engineering details.
7. FACTUAL GROUNDING: Base all technical claims strictly on the user's short notes and attached screenshots.

FEW-SHOT REFERENCE CONTEXT (FOLLOW THIS EXACT QUALITY & STRUCTURE):
Example 1 (AI & Backend):
- title: "OpsTriage AI — Autonomous Operations Agent"
- category: "AI & Backend"
- badge: "Autonomous AI Agent"
- description: "An enterprise AI email triage agent that summarizes inbox messages, executes a 5-step policy-grounded triage pipeline across Gmail, Google Drive SOPs, and Google Sheets, and drafts refineable replies."
- challenges[0]: "Orchestrating a multi-step agent pipeline across Gmail, Google Drive SOP documents, and Google Sheets with sub-3-second latency"
- solutions[0]: "Built a structured 5-stage execution pipeline with typed JSON outputs for intent classification, entity extraction, Drive SOP retrieval, Sheets logging, and draft generation"

Example 2 (Client Work):
- title: "Fashion Home Sourcing"
- category: "Client Work"
- badge: "Client Project"
- description: "A B2B global textile sourcing and manufacturing platform showcasing engineered fabrics, institutional home textiles, interactive product catalogs, and quote workflows."`;

/**
 * Compresses and resizes a browser File image to max 1024px JPEG before base64 encoding
 * so multimodal Gemini requests stay lightweight (~60KB instead of 5MB+) and finish in seconds.
 */
async function fileToBase64Content(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const img = new Image();
      img.onload = () => {
        try {
          const MAX_DIM = 1024;
          let { width, height } = img;
          if (width > MAX_DIM || height > MAX_DIM) {
            const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          const compressedUrl = canvas.toDataURL("image/jpeg", 0.78);
          const base64Data = compressedUrl.split(",")[1];
          resolve({
            type: "image",
            data: base64Data,
            mime_type: "image/jpeg",
          });
        } catch {
          const base64Data = result.includes(",") ? result.split(",")[1] : result;
          resolve({
            type: "image",
            data: base64Data,
            mime_type: file.type || "image/png",
          });
        }
      };
      img.onerror = () => {
        const base64Data = result.includes(",") ? result.split(",")[1] : result;
        resolve({
          type: "image",
          data: base64Data,
          mime_type: file.type || "image/png",
        });
      };
      img.src = result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Post-generation guardrail validator and sanitizer.
 */
function enforceGuardrails(raw, existingProjects = [], currentDocId = "") {
  const title = String(raw.title || "Untitled Project").trim();
  const slug = generateSafeSlug(title, existingProjects, currentDocId);

  const category = ALLOWED_CATEGORIES.includes(raw.category)
    ? raw.category
    : "Full Stack";

  const status = ALLOWED_STATUSES.includes(raw.quickInfo?.status)
    ? raw.quickInfo.status
    : "Completed";

  let demoUrl = String(raw.demoUrl || "").trim();
  if (demoUrl && !/^https?:\/\//i.test(demoUrl)) {
    demoUrl = `https://${demoUrl}`;
  }

  const challenges = Array.isArray(raw.challenges)
    ? raw.challenges.slice(0, 4)
    : [];
  const solutions = Array.isArray(raw.solutions)
    ? raw.solutions.slice(0, 4)
    : [];

  while (challenges.length < 4) {
    challenges.push(
      "Designing a scalable, maintainable architecture with responsive UX across devices"
    );
  }
  while (solutions.length < 4) {
    solutions.push(
      "Implemented modular components, strict type validation, and optimized rendering pipelines"
    );
  }

  return {
    slug,
    title,
    demoUrl,
    category,
    badge: String(raw.badge || category).trim(),
    tags:
      Array.isArray(raw.tags) && raw.tags.length > 0
        ? raw.tags.slice(0, 6)
        : ["Next.js", "TypeScript", "Tailwind CSS"],
    quickInfo: {
      duration: String(raw.quickInfo?.duration || "2 weeks").trim(),
      role: String(raw.quickInfo?.role || "Full-Stack Developer").trim(),
      tools:
        Array.isArray(raw.quickInfo?.tools) && raw.quickInfo.tools.length > 0
          ? raw.quickInfo.tools.slice(0, 6)
          : ["Next.js", "Tailwind CSS", "Vercel", "VS Code", "Git"],
      status,
    },
    description: String(raw.description || "").trim(),
    overview: String(raw.overview || "").trim(),
    planning: String(raw.planning || "").trim(),
    challenges,
    solutions,
  };
}

/**
 * Generates or refines a complete portfolio project case study from a single short description box
 * using Gemini 4 Hydrogen with structured JSON output, guardrails, and multimodal screenshot inspection.
 */
export async function generateProjectCaseStudy({
  rawNotes = "",
  refinementInstruction = "",
  currentDraft = null,
  imageFiles = [],
  existingProjects = [],
  currentDocId = "",
}) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "VITE_GEMINI_API_KEY is missing in your .env file. Add it and restart the dev server."
    );
  }

  const client = new GoogleGenAI({ apiKey });

  const textPromptParts = [
    "Auto-fill every field of the portfolio project case study JSON from the developer's short description and screenshots below.",
    rawNotes ? `\nDeveloper's Short Project Description:\n${rawNotes}` : "",
    currentDraft
      ? `\nExisting Draft JSON to Refine:\n${JSON.stringify(currentDraft, null, 2)}`
      : "",
    refinementInstruction
      ? `\nSpecific Refinement Instruction:\n${refinementInstruction}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  let inputPayload = textPromptParts;

  if (Array.isArray(imageFiles) && imageFiles.length > 0) {
    const validFiles = imageFiles.filter((f) => f instanceof File).slice(0, 3);
    if (validFiles.length > 0) {
      const imageBlocks = await Promise.all(
        validFiles.map((f) => fileToBase64Content(f))
      );
      inputPayload = [
        {
          type: "user_input",
          content: [
            ...imageBlocks,
            {
              type: "text",
              text: `${textPromptParts}\n\nInspect the attached project UI screenshots to extract the project name, URL (if visible in the browser address bar), feature names, workflows, and tech stack details.`,
            },
          ],
        },
      ];
    }
  }

  const interaction = await client.interactions.create({
    model: "gemini-3.5-flash-lite",
    system_instruction: SYSTEM_INSTRUCTION,
    input: inputPayload,
    store: false,
    generation_config: {
      thinking_level: "low",
    },
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: PROJECT_CASE_STUDY_SCHEMA,
    },
  });

  const rawText = interaction.output_text;
  if (!rawText) {
    throw new Error("Gemini returned an empty response. Please try again.");
  }

  const parsed = JSON.parse(rawText);
  return enforceGuardrails(parsed, existingProjects, currentDocId);
}
