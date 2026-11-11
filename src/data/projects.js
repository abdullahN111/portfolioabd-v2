const buildAssets = (slug, ext = "jpg", galleryCount = 0) => ({
  image: `/projects/${slug}/cover.${ext}`,
  gallery: Array.from(
    { length: galleryCount },
    (_, i) => `/projects/${slug}/gallery-${i + 1}.${ext}`,
  ),
});

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "Client Work", label: "Client & Commercial" },
  { id: "Full Stack", label: "Full-Stack Web" },
  { id: "AI & Backend", label: "AI Agents & Backend" },
];

export const projects = [
  {
    id: 1,
    slug: "fashion-home-sourcing",
    title: "Fashion Home Sourcing",
    category: "Client Work",
    badge: "Client Project",
    featured: true,
    ...buildAssets("fashion-home-sourcing", "png", 5),
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "B2B Platform", "SEO"],
    demoUrl: "https://fashion-home-sourcing.vercel.app/",
    quickInfo: {
      duration: "2 months",
      role: "Full-Stack Developer",
      tools: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Git"],
      status: "Completed",
    },
    description:
      "A B2B global textile sourcing and manufacturing platform showcasing engineered fabrics, institutional home textiles, interactive product catalogs, and quote workflows.",
    overview: `Fashion Home Sourcing is a premier B2B web platform built for a Pakistan-based global textile manufacturer and exporter with over three decades of industry presence. The platform presents their luxury home textiles, institutional hospitality linens, engineered fabrics, and precision garments to international buyers across North America, Europe, and the Middle East.

Designed with a refined corporate aesthetic, the website features interactive 3D flip cards for core values, a filterable finished-goods product catalog with detailed technical specifications (GSM, weave, and fiber composition), international compliance certifications (GOTS, OEKO-TEX, ISO, WRAP, BSCI), and a streamlined quote request and inquiry experience.`,
    planning: `The planning phase focused on establishing a credible, high-converting digital storefront for global B2B textile buyers and sourcing partners. Key priorities included structuring complex textile specifications clearly, highlighting international compliance standards, and enabling seamless buyer inquiries.

Built with Next.js and Tailwind CSS, the architecture emphasizes fast page loads, responsive multi-page navigation (Home, Products, About Us, Contact Us), interactive UI micro-interactions such as flip cards and dynamic category filtering, and SEO optimization tailored for international export visibility.`,
    challenges: [
      "Organizing diverse B2B textile categories and technical product specifications (GSM, weave constructions, and finishes) into an intuitive catalog",
      "Designing a luxury corporate brand identity with engaging interactive elements like 3D flip cards and dynamic hero sliders",
      "Ensuring fast load times while rendering high-resolution textile and hospitality imagery",
      "Building a streamlined quote request and inquiry workflow for international buyers",
    ],
    solutions: [
      "Implemented dynamic category tabs with live product counts and structured specification badges for instant catalog filtering",
      "Crafted a cohesive gold-and-navy theme using Tailwind CSS with smooth CSS transforms and interactive card states",
      "Leveraged Next.js image optimization and static generation for rapid performance across desktop and mobile devices",
      "Designed clear call-to-action touchpoints and quote request pathways across every page to maximize B2B lead conversion",
    ],
  },
  {
    id: 2,
    slug: "furniro-furniture-marketplace",
    title: "Furniro — Furniture Marketplace",
    category: "Full Stack",
    badge: "Full-Stack E-Commerce",
    featured: true,
    ...buildAssets("furniro-furniture-marketplace", "jpg", 7),
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Sanity CMS",
      "Auth.js",
      "Stripe",
      "MongoDB",
    ],
    demoUrl: "https://furniro-abd.vercel.app/",
    quickInfo: {
      duration: "9 months",
      role: "Full-Stack Developer",
      tools: ["Figma", "Vercel", "VS Code", "Git", "Sanity Studio"],
      status: "Completed",
    },
    description:
      "A full-stack furniture marketplace featuring an authenticated user dashboard, seamless Stripe checkout, and Sanity-powered content management built with Next.js.",
    overview: `Furniro is a modern online furniture store designed to deliver an elegant and user-friendly shopping experience. Users can explore a curated catalog of furniture items, inspect detailed specifications, and manage their cart and orders through an intuitive interface.

Focused on aesthetics, performance, and accessibility, Furniro reflects the look and feel of a high-end interior brand. It also includes an authenticated dashboard for managing products, customer orders, and store activity, balancing visual polish with production-grade e-commerce functionality.`,
    planning: `The planning phase began by defining Furniro's goal to build a fast, clean, and manageable platform for showcasing furniture products. The design emphasized simplicity and product-focused layouts for a minimal, premium experience.

The project was built with Next.js App Router and SSR features, styled with Tailwind CSS, and secured with Google authentication via Auth.js. Sanity CMS handled dynamic product management, while the dashboard ensured smooth backend operations.`,
    challenges: [
      "Managing dynamic product catalog data, inventory states, and categories efficiently",
      "Implementing secure OAuth authentication and protected user/admin routes",
      "Maintaining consistent UI across the customer storefront and management dashboard",
      "Handling performance, Core Web Vitals, and SEO optimization for product pages",
    ],
    solutions: [
      "Integrated Sanity CMS to manage products, categories, and high-res media dynamically without code deployments",
      "Implemented Auth.js with Google OAuth 2.0 provider for secure, frictionless sign-in and session protection",
      "Built a reusable design system of Tailwind CSS and React components shared between storefront and dashboard",
      "Leveraged Next.js server components, static generation, and image optimization for fast load times and strong SEO",
    ],
  },
  {
    id: 3,
    slug: "pak-alpha-manufacturing",
    title: "Pak Alpha Manufacturing",
    category: "Client Work",
    badge: "Client Project",
    featured: true,
    ...buildAssets("pak-alpha-manufacturing", "jpg", 3),
    tags: ["Next.js", "Tailwind CSS", "Resend", "Corporate Web"],
    demoUrl: "https://www.alphaalalamiyya.com/",
    quickInfo: {
      duration: "2 months",
      role: "Frontend Developer & Planner",
      tools: ["Canva", "Vercel", "VS Code", "Git", "Resend"],
      status: "Completed",
    },
    description:
      "A professional manufacturing website for a Riyadh-based construction materials company specializing in tile bond and grout production, with automated email workflows.",
    overview: `Pak Alpha Manufacturing is a commercial business website for a Riyadh-based construction materials company specializing in high-quality tile bond and grout. The platform showcases the company's industrial products, brand identity, and regional expansion plans through a clean, modern interface.

It serves as the company's official digital presence in Saudi Arabia, offering contractors and B2B clients an easy way to explore technical product lines, download company profiles, and contact the sales team directly.`,
    planning: `The planning phase began with understanding the client's goal of building a credible, content-focused web presence to highlight their manufacturing expertise. The project was developed using Next.js for speed and SEO performance, styled with Tailwind CSS for responsive visuals, and integrated with Resend for automated email inquiries.

Custom domain setup under alphaalalamiyya.com and a downloadable company profile PDF were included to strengthen brand authority.`,
    challenges: [
      "Building a strong corporate digital presence with structured industrial product presentation",
      "Integrating reliable automated email communication using Resend",
      "Optimizing performance and regional SEO for a construction manufacturing website",
      "Handling custom domain DNS configuration, hosting setup, and production deployment",
    ],
    solutions: [
      "Designed a clean, authoritative layout highlighting chemical & construction products and company credentials",
      "Implemented transactional email automation with Resend to route client inquiries directly to the sales team",
      "Used Next.js static generation for near-instant page loads and strong search engine indexing",
      "Configured custom domain DNS and SSL on Vercel with automated CI/CD deployment",
    ],
  },
  {
    id: 4,
    slug: "blogout",
    title: "Blogout — AI Blogging Platform",
    category: "AI & Backend",
    badge: "AI + Full-Stack",
    featured: true,
    ...buildAssets("blogout", "jpg", 3),
    tags: ["Next.js", "OpenAI Agents SDK", "FastAPI", "Python", "NextAuth"],
    demoUrl: "https://blogout.vercel.app",
    quickInfo: {
      duration: "2 months",
      role: "Full-Stack & AI Agent Developer",
      tools: ["VS Code", "Vercel", "Swagger", "TablePlus", "Git"],
      status: "In Progress",
    },
    description:
      "An AI-powered blogging platform integrating OpenAI Agents with a FastAPI backend and Next.js frontend to automate context-aware article generation.",
    overview: `Blogout is a full-stack publishing platform that uses AI agents to streamline long-form content creation. Users provide a blog topic and perspective, and an integrated OpenAI Agent researches, structures, and generates a complete, contextually rich article.

Built with Next.js on the frontend and FastAPI on the backend, Blogout combines a clean editorial reading experience with intelligent agentic workflows.`,
    planning: `The planning phase focused on designing an AI-assisted writing workflow that automates drafting while preserving the author's voice. Next.js manages the UI, routing, and authentication via NextAuth, while FastAPI powers the backend API and orchestrates the OpenAI Agents SDK.

The frontend and backend communicate over structured REST endpoints, keeping the agent service modular and independently scalable.`,
    challenges: [
      "Orchestrating OpenAI Agents SDK workflows reliably inside an async FastAPI backend",
      "Managing low-latency communication between the Next.js client and FastAPI service",
      "Ensuring AI-generated articles match the user's intended perspective, structure, and tone",
      "Maintaining secure authentication and session validation across client and API layers",
    ],
    solutions: [
      "Implemented structured agent pipelines using the OpenAI Agents SDK to turn brief prompts into well-formatted articles",
      "Built typed FastAPI endpoints with Pydantic validation for reliable request/response handling",
      "Engineered system instructions and context injection so generated drafts stay faithful to user intent",
      "Integrated NextAuth for session management and protected publishing workflows",
    ],
  },
  {
    id: 5,
    slug: "ai-agents",
    title: "Multi-Agent AI Systems Suite",
    category: "AI & Backend",
    badge: "AI Engineering",
    featured: true,
    ...buildAssets("ai-agents", "jpg", 0),
    tags: ["OpenAI Agents SDK", "Python", "FastAPI", "Streamlit", "SQLite"],
    demoUrl: "",
    quickInfo: {
      duration: "Ongoing",
      role: "AI Engineer & Backend Developer",
      tools: ["FastAPI", "Streamlit", "Next.js", "OpenAI Agents SDK", "Python"],
      status: "Active R&D",
    },
    description:
      "A modular suite of intelligent multi-agent systems built with the OpenAI Agents SDK, FastAPI, and Streamlit for task handoffs, tool calling, and workflow automation.",
    overview: `Multi-Agent AI Systems Suite is an engineering collection focused on building practical agentic architectures with the OpenAI Agents SDK. Each agent is designed around specialized capabilities—data processing, tool invocation, triage, and multi-step reasoning—using structured context and guardrails.

The suite demonstrates how autonomous agents collaborate and hand off tasks seamlessly, backed by FastAPI services, SQLite persistence, and interactive Streamlit/Next.js interfaces.`,
    planning: `The architecture was planned around reusable, testable multi-agent patterns. FastAPI handles backend routing and Pydantic schema validation, Streamlit provides rapid real-time inspection of agent reasoning and tool calls, and SQLite stores conversation state and execution logs.`,
    challenges: [
      "Designing deterministic handoff and orchestration flows across multiple specialized agents",
      "Bridging async agent execution with FastAPI REST endpoints and Streamlit/Next.js frontends",
      "Managing conversation state persistence and debugging multi-turn context windows",
    ],
    solutions: [
      "Built modular agent prototypes to test handoff boundaries before unifying them into a clean orchestrator pattern",
      "Used strict Pydantic schemas for tool inputs/outputs and API contracts across services",
      "Added structured execution logging and Streamlit inspection views to trace agent reasoning step by step",
    ],
  },
  {
    id: 6,
    slug: "resumeabd",
    title: "ResumeAbd — Interactive Resume Builder",
    category: "Full Stack",
    badge: "Web Tool",
    featured: false,
    ...buildAssets("resumeabd", "jpg", 0),
    tags: ["JavaScript", "HTML5", "CSS3", "DOM API", "PDF Export"],
    demoUrl: "https://resumeabd.vercel.app/",
    quickInfo: {
      duration: "1 month",
      role: "Frontend Developer",
      tools: ["VS Code", "Vercel", "Git"],
      status: "Completed",
    },
    description:
      "An interactive browser-based resume builder that lets users craft, preview in real time, and export print-ready professional resumes.",
    overview: `ResumeAbd is a lightweight web application designed to help job seekers generate clean, well-structured resumes without wrestling with document templates. Users enter their profile details, education, skills, and work history while watching the formatted resume update live.

Once complete, users can export a print-ready PDF layout that preserves typography and spacing across devices.`,
    planning: `The project was planned as a zero-dependency frontend application showcasing core DOM manipulation, state synchronization, and print-stylesheet engineering using vanilla HTML, CSS, and JavaScript.`,
    challenges: [
      "Synchronizing multi-section form inputs with a live formatted preview in real time",
      "Preserving exact page proportions and typography across mobile and desktop viewports",
      "Generating clean, downloadable PDF output directly in the browser",
    ],
    solutions: [
      "Built reactive event listeners and modular DOM renderers for instant preview updates",
      "Crafted responsive CSS Grid/Flexbox layouts paired with dedicated print media rules",
      "Integrated client-side PDF export with preserved margins and typographic hierarchy",
    ],
  },
  {
    id: 7,
    slug: "python-cli-projects",
    title: "Python CLI & Automation Suite",
    category: "AI & Backend",
    badge: "Backend & CLI",
    featured: false,
    ...buildAssets("python-cli-projects", "jpg", 0),
    tags: ["Python", "OOP", "Stripe API", "Rich CLI", "Automation"],
    demoUrl: "",
    quickInfo: {
      duration: "3 months",
      role: "Backend Developer",
      tools: ["Python", "OOP", "Rich", "Stripe API", "VS Code", "Git"],
      status: "Completed",
    },
    description:
      "A collection of modular Python command-line applications showcasing object-oriented architecture, Stripe API integration, Rich terminal UIs, and workflow automation.",
    overview: `Python CLI & Automation Suite is a curated collection of command-line tools built to solve practical backend problems using clean object-oriented design patterns, robust exception handling, and third-party API integrations including Stripe.`,
    planning: `Each CLI tool was architected around reusable base classes, environment-based secret management, and Rich-formatted terminal tables and prompts so every utility feels like a polished developer tool.`,
    challenges: [
      "Designing extensible class hierarchies shared across multiple independent CLI utilities",
      "Integrating external payment and web APIs like Stripe safely inside terminal workflows",
      "Creating intuitive, readable terminal UX with validation and clear error recovery",
    ],
    solutions: [
      "Implemented a standardized command-pattern OOP architecture for clean separation of concerns",
      "Used dotenv and typed request wrappers for secure API key handling and error retries",
      "Styled interactive prompts, progress spinners, and tables using the Python Rich library",
    ],
  },
];
