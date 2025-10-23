export const description = {
  furniro:
    "A full-stack furniture marketplace featuring an authenticated user dashboard, seamless checkout, and Sanity-powered content management built using Next.js.",
  pakalpha:
    "A professional manufacturing website for a Riyadh-based company specializing in tile bond and grout production, featuring domain setup, profile management, and automated email communication powered by Resend.",
  blogout:
    "A modern personal blog platform integrating OpenAI Agents with a FastAPI backend and Next.js frontend, enabling AI-assisted content creation through user prompts and automation.",
  resumeabd:
    "An interactive web application that enables users to create, preview, and download professional resumes through a simple and intuitive interface.",
  abdblog:
    "A fast, SEO-optimized blog platform built with Next.js and Sanity, providing a smooth and customizable experience for content creation and publishing.",
  aiagents:
    "A modular collection of intelligent AI agents built using the OpenAI Agent SDK, integrated with FastAPI, Streamlit, and Next.js for experimentation and automation.",
  pythoncli:
    "A collection of advanced Python CLI applications showcasing OOP concepts, exception handling, and automation workflows built for hands-on learning and real-world use.",
};

export const overview = {
  furniro: `Furniro is a modern online furniture store designed to deliver an elegant and user-friendly shopping experience. Users can explore a variety of furniture items, view detailed information, and manage selections through a simple interface.

Focused on aesthetics, performance, and accessibility, Furniro reflects the look and feel of a high-end furniture brand. It also includes an admin dashboard for managing products, customers, and store activity, offering a seamless digital experience that balances style and functionality.`,
  pakalpha: `Pak Alpha Manufacturing is a professional business website for a Riyadh-based construction materials company specializing in high-quality tile bond and grout. The platform showcases the company’s products, brand identity, and regional expansion plans through a clean and modern design.

It serves as the company’s official online presence, offering clients an easy way to explore services and contact the team. The design emphasizes professionalism, clarity, and accessibility, reflecting Pak Alpha’s commitment to quality and innovation.`,
  blogout: `Blogout is a full-stack personal blogging platform that uses AI to simplify content creation. Users can enter a blog title and brief perspective, and an integrated OpenAI Agent automatically generates a complete, contextually rich article.

Built with Next.js for the frontend and FastAPI for the backend, Blogout combines a clean, minimal interface with intelligent automation. It serves as both a personal publishing tool and a proof of concept for agent-driven content generation.`,
  resumeabd: `ResumeAbd is a user-friendly web application designed to help individuals quickly generate professional resumes without any design or coding knowledge. The platform provides a clean and minimal interface where users can input their personal details, education, skills, and experience, and instantly preview the formatted resume in real-time.

ResumeAbd ensures that users can easily download their resumes in a polished layout that works across devices and browsers.`,
  abdblog: `AbdBlog is a modern, performance-focused blogging platform designed to make publishing fast, simple, and visually engaging. It provides a clean, responsive layout for reading and writing blogs.

The platform is powered by Sanity CMS, AbdBlog demonstrates a balance between sleek UI design, scalability, and efficient content management ideal for personal or professional blogging setups.`,
  aiagents: `Collection AI Agents/System built to explore the capabilities of the OpenAI Agent SDK. Each agent is designed to perform specific tasks such as data processing, communication, or automation using structured context and tool-calling mechanisms.  

The project demonstrates how different agents can collaborate or hand off tasks to each other. I have used Streamlit, Next js for UI demonstrations in many projects while others are CLI based, I have used Fastapi as backend and stored data in SQLite`,
  pythoncli: `Python CLI Projects is a curated collection of command-line projects developed to strengthen functional, object-oriented programming (OOP) logic and backend problem-solving skills. Each project demonstrates core software design principles.  
The purpose of the projects is to enhance command-line application building expertise while applying professional coding standards and modular design patterns.`,
};

export const planning = {
  furniro: `The planning phase began by defining Furniro’s goal to build a fast, clean, and manageable platform for showcasing furniture products. The design emphasized simplicity and product-focused layouts for a minimal, premium experience.

The project was built with Next.js 14 for its App Router and SSR features, styled with Tailwind CSS, and secured with Google authentication via NextAuth. Sanity CMS handled dynamic product management, while the dashboard ensured smooth backend operations. Development followed structured stages from design to deployment for a complete, production-ready workflow.`,
  pakalpha: `The planning phase began with understanding the client’s goal of building a professional, content-focused website to highlight their manufacturing expertise. The project was developed using Next.js for speed and SEO performance, styled with Tailwind CSS for responsive visuals, and integrated with Resend for email automation.

Domain setup under alphaalalamiyya.com and a downloadable company profile PDF were included to strengthen the brand identity. Each stagefrom design and structure to deployment was planned for efficiency, reliability, and a polished presentation.`,
  blogout: `The planning phase focused on developing an AI-powered blogging platform that automates writing while giving users creative control. Next.js manages the frontend, routing, and authentication with NextAuth, while FastAPI handles backend logic and integrates with the OpenAI Agent SDK.

The system enables seamless communication between the frontend and backend using REST APIs. The frontend is hosted on Vercel, and the backend runs as an independent API service—ensuring modularity, scalability, and room for future features like editing, tagging, and automated publishing.`,
  resumeabd: `The planning stage focused on creating a lightweight, front-end-only application that could dynamically handle user input and generate real-time previews. The key objective was to deliver an intuitive, visually consistent, and responsive experience using core web technologies.

The project was developed using HTML, CSS, and JavaScript, emphasizing DOM manipulation and layout control without relying on external frameworks. The design phase prioritized simplicity and readability, with sections clearly divided for personal information, education, work experience, and skills.

A major part of the planning involved implementing the functionality for generating and downloading the resume in PDF format while maintaining style consistency.`,
  abdblog: `The planning phase of AbdBlog centered around building a lightweight, SEO-friendly blog platform with strong performance and an easy publishing workflow. The design approach emphasized readability, typography, and mobile responsiveness while maintaining a minimal and professional layout.

The project uses Next.js for server-side rendering (SSR) and static site generation (SSG), ensuring optimal SEO and fast page load times. Sanity CMS was integrated as the backend to handle dynamic blog content, authors, and categories. This allows non-technical users to update posts instantly through Sanity Studio without redeploying the website.`,
  aiagents: `The planning phase focused on understanding and implementing the core architecture of the OpenAI Agent SDK. The goal was to build a clean, reusable, and testable structure for multi- agents orchaestration with independent functionalities.  

FastAPI handled backend logic, routing, and data validation using Pydantic models, while Streamlit was added for real-time visualization and testing of agent behavior. Next.js provided a lightweight frontend for triggering agent runs or monitoring their responses.`,
  pythoncli: `The planning process focused on applying Python’s OOP principles in practical CLI applications. Each project was structured to highlight modularity, scalability, and error resilience.   

The goal was to build a consistent structure across all CLI applications where every project could act as a standalone program or be combined into a larger system. This approach helped reinforce real-world backend logic and code reusability skills.`,
};

export const challenges = {
  furniro: [
    "Managing dynamic product data efficiently",
    "Implementing secure and smooth authentication",
    "Maintaining consistent UI across dashboard and storefront",
    "Handling performance and SEO optimization",
  ],
  pakalpha: [
    "Building a professional business presence with limited initial content",
    "Integrating automated email communication using Resend",
    "Optimizing performance and SEO for a static manufacturing website",
    "Handling domain registration, hosting setup, and deployment",
  ],
  blogout: [
    "Integrating OpenAI Agent SDK with FastAPI backend",
    "Managing real-time communication between FastAPI API and Next.js frontend",
    "Ensuring generated blogs align with user context and tone",
    "Maintaining authentication and secure data handling between client and server",
  ],
  resumeabd: [
    "Managing dynamic user input and real-time preview updates",
    "Ensuring proper layout and formatting across different browsers and devices",
    "Implementing PDF download functionality with preserved styling",
    "Designing a clean and responsive UI using only HTML, CSS, and JavaScript",
  ],
  abdblog: [
    "Connecting and querying structured content efficiently from Sanity CMS",
    "Maintaining consistent design and typography across dynamic pages",
    "Optimizing for SEO while using a headless CMS architecture",
    "Ensuring fast load times and smooth transitions between blog posts",
  ],
  aiagents: [
    "Understanding and implementing the handoff and orchestration flow within the OpenAI Agent SDK",
    "Ensuring smooth communication between multiple frameworks (FastAPI, Streamlit, Next.js)",
    "Managing agent state persistence and debugging context handling",
  ],
  pythoncli: [
    "Designing reusable architectures across multiple CLI applications",
    "Integrating external APIs like Stripe within terminal interfaces",
    "Maintaining consistent CLI UX across different environments and systems",
  ],
};

export const solutions = {
  furniro: [
    "Integrated Sanity CMS to handle products, categories, and images dynamically without manual updates",
    "Used NextAuth with Google provider, ensuring quick login and OAuth 2.0 compliance",
    "Created reusable UI components and layout templates using Tailwind CSS and React components",
    "Leveraged Next.js built-in optimizations like static generation, server components, and image optimization for faster load times and improved SEO",
  ],
  pakalpha: [
    "Designed a clean, professional layout highlighting products and company details effectively",
    "Implemented email automation with Resend to handle client inquiries and contact forms",
    "Used Next.js static generation for fast load times and better SEO performance",
    "Configured domain and hosting setup on Vercel with a smooth deployment process",
  ],
  blogout: [
    "Implemented custom agent logic using the OpenAI Agent SDK to process prompts and return structured blog content",
    "Created clear API endpoints in FastAPI to handle user input and deliver agent responses efficiently",
    "Fine-tuned prompt structure and system messages to ensure blogs reflect user perspective accurately",
    "Used NextAuth for secure authentication and seamless session management between frontend and backend",
  ],
  resumeabd: [
    "Used JavaScript for dynamic DOM manipulation to reflect real-time resume updates",
    "Applied responsive CSS techniques to maintain consistent layout across devices",
    "Integrated client-side PDF generation ensuring downloadable and print-ready resumes",
    "Designed an intuitive UI with clear sections for seamless user experience",
  ],
  abdblog: [
    "Configured GROQ queries to fetch and filter Sanity content effectively",
    "Used global layout components and Tailwind utility classes for consistent styling",
    "Implemented SEO optimization using Next.js metadata API and dynamic OG tags",
    "Leveraged Next.js static generation and image optimization for fast performance",
  ],
  aiagents: [
    "Created isolated prototypes to analyze agent-to-agent communication and then unified them into a modular architecture",
    "Used Pydantic models for structured data validation and clean API design across frameworks",
    "Implemented detailed logging and Streamlit dashboards for monitoring agent context and execution flow",
  ],
  pythoncli: [
    "Created a standardized class-based command architecture to maintain modularity",
    "Used Python’s requests and dotenv libraries for secure API handling",
    "Implemented styled outputs and prompts using the rich library to enhance CLI usability",
  ],
};
