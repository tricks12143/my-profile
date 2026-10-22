import { profileInfo, skillCategories, sampleProjects } from "./profileData";

export const GEMINI_SYSTEM_INSTRUCTION = `
You are the official AI Portfolio Assistant for ${profileInfo.name}, powered by Google Gemini AI.
Your purpose is to answer questions about John Irvin Udang's engineering background, skills, work history, architecture philosophy, projects, and how to get in touch with him.

Profile Overview:
- Name: ${profileInfo.name}
- Title: ${profileInfo.title}
- Experience: Over 9+ years of professional engineering experience.
- Location: ${profileInfo.location} (Philippine Standard Time, GMT+8).
- Email: ${profileInfo.email}
- Phone: ${profileInfo.phone}
- Availability: Currently open for Full-Stack, SaaS engineering, Senior Frontend, and AI Integration opportunities.
- Development Philosophy: I utilize Gemini AI for speedy development while monitoring the readability of the code.
- Education: ${profileInfo.education.degree} from ${profileInfo.education.school} (${profileInfo.education.period}).

Online Profiles:
- GitHub: ${profileInfo.socials.github}
- LinkedIn: ${profileInfo.socials.linkedin}
- JobStreet: ${profileInfo.socials.jobstreet}

Technical Skill Inventory:
${skillCategories
  .map(
    (c) => `* ${c.title}: ${c.description}\n  Skills: ${c.skills.join(", ")}`
  )
  .join("\n\n")}

Sample Projects & Architecture Experience:
${sampleProjects
  .map(
    (p) => `* Project: ${p.title}
  Category: ${p.category}
  Description: ${p.description}
  Tech Stack: ${p.techStack.join(", ")}
  Key Highlights:
  ${p.keyHighlights.map((h) => `  - ${h}`).join("\n")}
  ${p.links ? `Links: ${p.links.map((l) => `${l.label} (${l.url})`).join(", ")}` : ""}`
  )
  .join("\n\n")}

Guidelines for your responses:
1. Speak in a confident, professional, friendly, and articulate tone representing John's work.
2. Provide specific technical examples (e.g., Next.js, React, Node.js, C# .NET, CouchDB, Azure, LangChain, ChromaDB, Gemini AI).
3. Format with clean markdown (bullet points, bold highlights, code tags) for scannability.
4. If asked how to contact or hire John, provide his direct email (${profileInfo.email}) and phone/WhatsApp (${profileInfo.phone}) or suggest the Contact page.
5. If asked questions unrelated to John's portfolio, software engineering, or AI, politely bring the conversation back to John's work and expertise.
`;

// Intelligent fallback responses when no Gemini API key is configured
export function getKnowledgeFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("skill") || q.includes("stack") || q.includes("technology") || q.includes("languages")) {
    return `### 🛠️ John's Core Technical Skills\n\nJohn has **9+ years** of extensive experience across the full stack:\n\n* **Frontend:** React.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, styled-components, AngularJS, HTML5/CSS3.\n* **Backend & APIs:** SaaS Programming, Multi-Tenant Architecture, Node.js, Express.js, C# .NET, PHP, GraphQL, REST APIs, Swagger/OpenAPI.\n* **Databases:** MongoDB, CouchDB (offline sync), MySQL, MSSQL, ChromaDB (Vector DB).\n* **AI & GenAI:** Google Gemini AI, Azure OpenAI, LangChain, Claude AI, GitHub Copilot, ChromaDB Vector Embeddings.\n* **Cloud & DevOps:** Microsoft Azure, AWS, Azure DevOps, Power Apps, Power Automate.\n\nWould you like more details on his frontend architecture or AI pipelines?`;
  }

  if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("sample")) {
    return `### 🚀 Featured Engineering Projects\n\nHere are some of the notable systems John has architected:\n\n1. **GenAI Retrieval-Augmented Generation (RAG) Architecture**\n   - *Tech:* Azure OpenAI, LangChain, ChromaDB, Next.js, Node.js, C# .NET.\n   - *Focus:* Vector similarity search, automated LLM document Q&A pipelines.\n\n2. **High-Performance Real Estate Search & Listing Platforms**\n   - *Tech:* React.js, PHP, MySQL, SCSS, Query Caching.\n   - *Live Portals:* [Real Estate Experts](https://www.realestateexperts.net/), [Call Kym Portal](http://callkym.com/).\n\n3. **Cross-Platform Event CMS & Mobile Suite (Duuzra)**\n   - *Tech:* Angular, Ionic, Node.js, CouchDB for offline synchronization.\n\n4. **Enterprise Cloud Automation & Intranet**\n   - *Tech:* Next.js, Azure DevOps, Power Apps, Dataverse, React-PDF, jsPDF.\n\n5. **Interactive Game Canvas Engine**\n   - *Tech:* Next.js, Phaser.js, HTML5 Canvas with smooth 60fps performance.\n\nYou can visit the **/work** page to view all case studies!`;
  }

  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("location")) {
    return `### 📬 How to Contact John Irvin Udang\n\nJohn is currently open for **Full-Stack, SaaS, and Senior Frontend** roles:\n\n* **Email:** [${profileInfo.email}](mailto:${profileInfo.email})\n* **Phone / WhatsApp:** [${profileInfo.phone}](tel:${profileInfo.phone.replace(/\\s+/g, "")})\n* **Location:** Bacolod City, Philippines (GMT+8, highly experienced with global asynchronous teams)\n* **Profiles:** [LinkedIn](${profileInfo.socials.linkedin}) • [GitHub](${profileInfo.socials.github}) • [JobStreet](${profileInfo.socials.jobstreet})\n\nYou can also head over to the **/contact** page to submit a direct message!`;
  }

  if (q.includes("ai") || q.includes("gemini") || q.includes("langchain") || q.includes("llm") || q.includes("rag")) {
    return `### 🤖 John's AI & GenAI Expertise\n\nJohn actively designs and integrates AI-powered solutions:\n\n* **Development Workflow:** I utilize Gemini AI for speedy development while monitoring the readability of the code.\n* **Gemini AI & Google Gen AI SDK:** Building contextual chatbots, automated document summaries, and multi-turn conversational agents.\n* **Azure OpenAI & LangChain:** Prompt chaining, semantic search, and RAG architectures.\n* **Vector Databases:** ChromaDB indexing for low-latency similarity retrieval.\n\n*Tip:* To connect this chat bot to live Google Gemini AI, add \`GEMINI_API_KEY\` to your \`.env.local\` file or click the settings gear (⚙️) above to input your Gemini API key!`;
  }

  if (q.includes("experience") || q.includes("background") || q.includes("who is") || q.includes("about") || q.includes("education")) {
    return `### 👨‍💻 About John Irvin C. Udang\n\nJohn is a **Senior Full-Stack & SaaS Developer** with **9+ years** of hands-on experience building high-scale web applications, enterprise systems, and interactive digital products.\n\n* **Education:** Bachelor of Science in Information Technology (BSIT), STI Davao (2012 – 2016).\n* **Core Strengths:** Clean modular architecture, query caching, high-performance UI/UX, SaaS multi-tenancy, and AI integration.\n* **Engineering Mindset:** Utilizes Gemini AI for speedy development while monitoring the readability and maintainability of the code.\n\nFeel free to ask about his specific tech stacks, past projects, or contact details!`;
  }

  return `### Hello! 👋\n\nI am **John Irvin Udang's AI Portfolio Assistant**, powered by **Google Gemini AI**.\n\nYou can ask me about:\n* John's **core technical skills** (React, Next.js, Node.js, C# .NET, AI)\n* His **SaaS & cloud projects**\n* His **experience and background**\n* How to **hire or get in touch with John**\n\n*(Note: Add \`GEMINI_API_KEY\` in your \`.env.local\` or click ⚙️ to chat directly with live Gemini AI!)*`;
}
