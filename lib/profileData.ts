export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Full-Stack & Web" | "Cloud & Enterprise" | "Interactive & AI";
  description: string;
  techStack: string[];
  keyHighlights: string[];
  links?: { label: string; url: string }[];
  playableUrl?: string;
  playableBadge?: string;
  price?: number;
  isEcommerceShowcase?: boolean;
}

export const profileInfo = {
  name: "John Irvin C. Udang",
  title: "Senior Full-Stack & SaaS Developer",
  tagline:
    "Building scalable SaaS platforms, high-performance web applications, and interactive digital experiences with over 9+ years of engineering across modern front-end, back-end, cloud, and AI ecosystems.",
  philosophy:
    "I utilize Gemini AI for speedy development while monitoring the readability of the code.",
  location: "Bacolod City, Philippines",
  email: "johnirvinudang@gmail.com",
  phone: "+63 915 066 5312",
  avatar: "/profile.png",
  education: {
    degree: "Bachelor of Science in Information Technology (BSIT)",
    school: "STI Davao",
    period: "2012 – 2016",
  },
  socials: {
    github: "https://github.com/tricks12143?tab=repositories",
    linkedin: "https://www.linkedin.com/in/john-irvin-udang-3b1482109/",
    jobstreet: "https://ph.jobstreet.com/profile/johnirvin-udang-j4tLsTFM72",
  },
  stats: [
    { label: "Years of Experience", value: "9+" },
    { label: "Core Technologies", value: "25+" },
    { label: "Projects Delivered", value: "50+" },
    { label: "Client & Team Focus", value: "100%" },
  ],
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Engineering & UI",
    description: "Modern, reactive, and responsive interfaces built with clean component architecture.",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "AngularJS",
      "SCSS",
      "styled-components",
      "Bootstrap",
      "Fluent UI",
      "Ionic",
      "AJAX / jQuery",
    ],
  },
  {
    title: "Backend, APIs & Architecture",
    description: "Robust server-side logic, API design, data pipelines, and performance optimization.",
    skills: [
      "SaaS Programming",
      "Multi-Tenant Architecture",
      "Node.js",
      "Express.js",
      "C# .NET",
      "PHP",
      "GraphQL",
      "RESTful APIs",
      "Swagger / OpenAPI",
      "Query Caching",
      "Lazy Loading",
      "Error Handling",
    ],
  },
  {
    title: "Databases & Data Stores",
    description: "Relational, document-oriented, distributed, and vector storage engines.",
    skills: [
      "MongoDB",
      "CouchDB",
      "MySQL",
      "MSSQL",
      "SQLite",
      "NoSQL",
      "ChromaDB (Vector DB)",
    ],
  },
  {
    title: "AI, GenAI & Modern Ecosystems",
    description: "LLM integration, retrieval pipelines, AI assistants, and modern developer workflows.",
    skills: [
      "Azure OpenAI",
      "LangChain",
      "Claude AI",
      "Gemini AI",
      "GitHub Copilot",
      "CodeX",
      "ChromaDB Embeddings",
    ],
  },
  {
    title: "Cloud, DevOps & Enterprise Tools",
    description: "Cloud infrastructure, intranet development, automation, and continuous delivery.",
    skills: [
      "Microsoft Azure",
      "AWS",
      "Azure DevOps",
      "Power Apps (Canvas & Dataverse)",
      "Power Automate",
      "SharePoint",
      "OutSystems Migration",
      "Slack / Agile Tooling",
    ],
  },
  {
    title: "Specialty, Interactive & Systems",
    description: "Canvas game development, document generation, data visualization, and hardware/software systems.",
    skills: [
      "Phaser.js (Game Web Dev)",
      "D3.js",
      "Chart.js",
      "PDF.js",
      "React-PDF",
      "jsPDF",
      "Adobe Photoshop",
      "Hardware Troubleshooting",
      "Software Troubleshooting",
      "Technical Documentation",
    ],
  },
];

export const sampleProjects: ProjectItem[] = [
  {
    id: "ecommerce-cloud-storefront",
    title: "Next.js E-Commerce Storefront & High-Conversion Cart Engine",
    category: "Full-Stack & Web",
    price: 3400,
    isEcommerceShowcase: true,
    description:
      "Engineered a high-performance modern e-commerce storefront system featuring dynamic product catalogs, client/server synchronized cart state, instant drawer previews, multi-currency support, and optimized checkout funnel flows.",
    techStack: [
      "Next.js App Router",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Zustand / Context API",
      "Stripe Checkout",
      "Webhooks",
      "Local Cache",
    ],
    keyHighlights: [
      "Engineered instantaneous client-side cart updates with zero layout shift and optimistic UI feedback.",
      "Built resilient local storage persistence and cross-tab cart synchronization.",
      "Implemented streamlined checkout workflows with structured quote estimators and inventory validation.",
      "Integrated modular promo code engine and dynamic shipping/tax calculation handlers.",
    ],
  },
  {
    id: "real-estate-platforms",
    title: "High-Performance Real Estate Search & Listing Platforms",
    category: "Full-Stack & Web",
    price: 2800,
    description:
      "Engineered comprehensive real estate web applications featuring fast property search, dynamic MLS-style listings, responsive client portals, and performance-tuned asset delivery.",
    techStack: [
      "React.js",
      "PHP",
      "WordPress",
      "JavaScript",
      "MySQL",
      "Bootstrap",
      "SCSS",
      "Query Caching",
    ],
    keyHighlights: [
      "Engineered responsive property search with custom query caching and instant filtering.",
      "Optimized high-resolution real estate photo galleries with lazy loading and asset compression.",
      "Built clean, modular components ensuring robust cross-browser and mobile performance.",
    ],
    links: [
      { label: "Real Estate Experts", url: "https://www.realestateexperts.net/" },
      { label: "Call Kym Portal", url: "http://callkym.com/" },
      { label: "Damon Sells Homes", url: "http://www.damonsells.com/" },
    ],
  },
  {
    id: "corporate-web-portals",
    title: "Corporate & International Business Web Ecosystems",
    category: "Full-Stack & Web",
    price: 2400,
    description:
      "Architected clean, modern multi-page web platforms for corporate entities and international business councils, prioritizing performance, accessibility, and intuitive navigation.",
    techStack: ["JavaScript", "PHP", "HTML5", "CSS3", "Responsive Architecture", "SEO Optimization"],
    keyHighlights: [
      "Designed clean, responsive layouts tailored for executive audiences and international stakeholders.",
      "Implemented streamlined content architectures with semantic SEO markup.",
      "Engineered lightweight, dependency-free interactive UI elements for lightning-fast page speeds.",
    ],
    links: [
      { label: "Austria Business Council", url: "https://www.austriabc.com/" },
      { label: "WTEI Group Portal", url: "https://www.wteigroup.com/" },
    ],
  },
  {
    id: "event-cms-mobile-suite",
    title: "Cross-Platform Event CMS & Synchronized Mobile Suite",
    category: "Full-Stack & Web",
    price: 4200,
    description:
      "Engineered a multi-tenant content management system and companion mobile application for event management, featuring offline synchronization and real-time content updates.",
    techStack: [
      "Angular",
      "Ionic",
      "Node.js",
      "Express.js",
      "CouchDB",
      "Query Caching",
      "Lazy Loading",
      "Error Handling",
    ],
    keyHighlights: [
      "Constructed a cross-platform mobile client with offline-first synchronization using CouchDB.",
      "Architected administrative web dashboards for real-time agenda, media, and attendee management.",
      "Implemented robust query caching and error boundaries to ensure zero downtime during live events.",
    ],
    links: [
      { label: "Event CMS Portal", url: "http://cms.duuzra.com/cms/login" },
      {
        label: "Android Application",
        url: "https://play.google.com/store/apps/details?id=com.ep.duuzra.mobile&hl=en",
      },
    ],
  },
  {
    id: "enterprise-cloud-automation",
    title: "Enterprise Cloud Automation & Intranet Platform",
    category: "Cloud & Enterprise",
    price: 4800,
    description:
      "Spearheaded full-stack intranet extensions, task management applications, automated cloud workflows, and custom component libraries for enterprise infrastructure.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "GraphQL",
      "Azure",
      "Azure DevOps",
      "Power Apps (Dataverse)",
      "Power Automate",
      "Fluent UI",
      "React-PDF",
      "jsPDF",
      "Swagger",
    ],
    keyHighlights: [
      "Engineered custom extensions and helper libraries integrated into Azure DevOps environments.",
      "Built automated enterprise canvas applications using Microsoft Power Apps and Dataverse backends.",
      "Developed programmatic client-side and server-side PDF reporting engines using React-PDF and jsPDF.",
      "Produced comprehensive OpenAPI / Swagger specifications and interactive documentation for developers.",
    ],
  },
  {
    id: "interactive-game-canvas",
    title: "Jenga – Interactive HTML5 Playable & Game Canvas",
    category: "Interactive & AI",
    price: 3200,
    description:
      "Engineered an interactive, high-performance HTML5 playable ad featuring realistic Matter.js physics Jenga block manipulation, Spine 2D skeletal animation runtimes, dynamic win/retry feedback loops, and standalone single-file distribution for ad networks.",
    techStack: [
      "Phaser 3",
      "Matter.js Physics",
      "Spine 2D Runtime",
      "JavaScript (ES6+)",
      "HTML5 Canvas",
      "Vite SingleFile",
      "AppLovin / MRAID",
    ],
    keyHighlights: [
      "Simulated real-time rigid-body block pulling and gravity collapse dynamics with Matter.js physics engine.",
      "Integrated Spine 2D skeletal animations for fluid character reactions and celebration states.",
      "Engineered touch & drag gesture mechanics with raycasting and collision boundaries for mobile and desktop viewports.",
      "Packaged as a zero-external-dependency, production-optimized single-bundle playable ad under strict ad network constraints.",
    ],
    playableUrl: "/jenga.html",
    playableBadge: "Playable Ad Demo",
  },
  {
    id: "genai-retrieval-architecture",
    title: "GenAI Retrieval-Augmented Generation (RAG) Architecture",
    category: "Interactive & AI",
    price: 5200,
    description:
      "Engineered intelligent workflow systems leveraging Large Language Models, vector similarity search, and automated generative AI pipelines.",
    techStack: [
      "Azure OpenAI",
      "LangChain",
      "ChromaDB",
      "Next.js",
      "Node.js",
      "C# .NET",
      "Vector Search",
    ],
    keyHighlights: [
      "Constructed LangChain orchestration pipelines for contextual information retrieval and document Q&A.",
      "Implemented ChromaDB vector indexing for low-latency semantic search across knowledge repositories.",
      "Integrated secure API boundaries and error-resilient prompt chaining mechanisms.",
    ],
  },
  {
    id: "gemini-ai-assistant",
    title: "Google Gemini AI Portfolio Assistant & Interactive Chatbot",
    category: "Interactive & AI",
    price: 2600,
    description:
      "Engineered an interactive conversational AI assistant powered by Google Gemini AI and the official @google/genai SDK, featuring contextual system grounding, real-time typing dynamics, client key configuration, and offline knowledge fallbacks.",
    techStack: [
      "Google Gemini AI",
      "@google/genai SDK",
      "Next.js App Router",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "RESTful API Routes",
      "Context Grounding",
    ],
    keyHighlights: [
      "I utilize Gemini AI for speedy development while monitoring the readability of the code.",
      "Integrated Google Gemini AI (gemini-2.5-flash / gemini-1.5-flash) with structured system prompts for contextual Q&A.",
      "Designed a modern glassmorphic chat drawer with prompt suggestions, live indicators, and client API key options.",
      "Engineered graceful fallback mechanisms ensuring seamless user experiences even without environment variables.",
    ],
  },
];
