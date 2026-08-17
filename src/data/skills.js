import {
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaDatabase,
  FaPhp,
  FaRobot,
} from "react-icons/fa";

import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiFastapi,
  SiMongodb,
  SiPostgresql,
  SiSqlite,
  SiPandas,
  SiVercel,
  SiSanity,
  SiOpenai,
  SiMysql,
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";

export const skills = [

  {
    name: "JavaScript",
    level: 85,
    category: "frontend",
    icon: FaJsSquare,
    color: "#F7DF1E",
  },
  {
    name: "React",
    level: 90,
    category: "frontend",
    icon: FaReact,
    color: "#61DAFB",
  },
  {
    name: "TypeScript",
    level: 90,
    category: "frontend",
    icon: SiTypescript,
    color: "#3178C6",
  },
  {
    name: "Tailwind CSS",
    level: 90,
    category: "frontend",
    icon: SiTailwindcss,
    color: "#38BDF8",
  },
  {
    name: "Next.js",
    level: 90,
    category: "frontend",
    icon: SiNextdotjs,
    color: "#000000",
  },



  {
    name: "Python",
    level: 90,
    category: "backend",
    icon: FaPython,
    color: "#3776AB",
  },
  {
    name: "FastAPI",
    level: 80,
    category: "backend",
    icon: SiFastapi,
    color: "#009688",
  },
  {
    name: "Node.js",
    level: 75,
    category: "backend",
    icon: FaNodeJs,
    color: "#68A063",
  },
  {
    name: "Express.js",
    level: 70,
    category: "backend",
    icon: SiExpress,
    color: "#828282",
  },
  {
    name: "PHP",
    level: 80,
    category: "backend",
    icon: FaPhp,
    color: "#777BB4",
  },
  {
    name: "REST APIs",
    level: 80,
    category: "backend",
    icon: FaDatabase,
    color: "#336791",
  },



  {
    name: "OpenAI Agents SDK",
    level: 80,
    category: "ai",
    icon: SiOpenai,
    color: "#412991",
  },
  {
    name: "LangChain",
    level: 70,
    category: "ai",
    icon: FaRobot,
    color: "#1C3C3C",
  },
  {
    name: "LangGraph",
    level: 65,
    category: "ai",
    icon: FaRobot,
    color: "#1C3C3C",
  },
  {
    name: "LLM Applications",
    level: 75,
    category: "ai",
    icon: FaRobot,
    color: "#412991",
  },
  {
    name: "RAG",
    level: 65,
    category: "ai",
    icon: FaRobot,
    color: "#412991",
  },
  {
    name: "AI Agents",
    level: 80,
    category: "ai",
    icon: FaRobot,
    color: "#412991",
  },
  {
    name: "Prompt Engineering",
    level: 80,
    category: "ai",
    icon: FaRobot,
    color: "#412991",
  },



  {
    name: "MongoDB",
    level: 80,
    category: "databases",
    icon: SiMongodb,
    color: "#47A248",
  },
  {
    name: "PostgreSQL",
    level: 65,
    category: "databases",
    icon: SiPostgresql,
    color: "#336791",
  },
  {
    name: "MySQL",
    level: 75,
    category: "databases",
    icon: SiMysql,
    color: "#4479A1",
  },
  {
    name: "SQLite",
    level: 80,
    category: "databases",
    icon: SiSqlite,
    color: "#003B57",
  },
  {
    name: "Neon",
    level: 80,
    category: "databases",
    icon: FaDatabase,
    color: "#00E5FF",
  },


  {
    name: "Git",
    level: 90,
    category: "tools",
    icon: FaGitAlt,
    color: "#F05032",
  },
  {
    name: "GitHub",
    level: 90,
    category: "tools",
    icon: FaGithub,
    color: "#181717",
  },
  {
    name: "VS Code",
    level: 95,
    category: "tools",
    icon: VscVscode,
    color: "#007ACC",
  },
  {
    name: "Figma",
    level: 80,
    category: "tools",
    icon: FaFigma,
    color: "#F24E1E",
  },
  {
    name: "Sanity CMS",
    level: 90,
    category: "tools",
    icon: SiSanity,
    color: "#F03E2F",
  },
  {
    name: "Vercel",
    level: 85,
    category: "tools",
    icon: SiVercel,
    color: "#000000",
  },
];

export const categories = [
  {
    id: "frontend",
    label: "Frontend Development",
  },
  {
    id: "backend",
    label: "Backend Development",
  },
  {
    id: "ai",
    label: "AI & Intelligent Systems",
  },
  {
    id: "databases",
    label: "Databases",
  },
  {
    id: "tools",
    label: "Tools & Platforms",
  },
];

export const exploringSkills = [
  "Advanced AI Agents",
  "RAG Systems",
  "Model Context Protocol (MCP)",
  "n8n Workflows",
  "Generative AI",
  "Machine Learning",
  "Data Science",
  "DSA",
  "Backend Architecture",
];