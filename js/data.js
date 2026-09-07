/**
 * portfolio.js — single source of truth for all content on the site.
 * Edit this file to update names, links, copy, projects, etc.
 * No other file should contain hardcoded personal information.
 */
const PORTFOLIO = {
  identity: {
    name: "Nikhil Maharana",
    firstName: "Nikhil",
    title: "AI / Full-Stack Developer",
    tagline: "Building intelligent products, full-stack systems and experimental digital experiences.",
    location: "Berhampur, Odisha",
    email: "nikhilmaharana10@gmail.com",
    phone: "+91 9938956809",
  },

  socialLinks: {
    github:    { url: "https://github.com/nikhilmaharana",                         label: "GitHub",    purpose: "Code & projects" },
    linkedin:  { url: "https://www.linkedin.com/in/nikhil-maharana-089b73337/",     label: "LinkedIn",  purpose: "Professional journey" },
    leetcode:  { url: "https://leetcode.com/u/Nikhilgudu2003/",                     label: "LeetCode",  purpose: "Problem solving" },
    youtube:   { url: "https://www.youtube.com/@nikhilmaharanamusic",               label: "YouTube",   purpose: "Music" },
    instagram: { url: "https://www.instagram.com/nikhil.maharana.music/",           label: "Instagram", purpose: "Music & creative" },
    email:     { url: "mailto:nikhilmaharana10@gmail.com",                          label: "Email",     purpose: "Direct contact" },
  },

  resume: {
    path: "resume/Nikhil_Maharana_Resume.pdf",
    fileName: "Nikhil_Maharana_Resume.pdf",
  },

  images: {
    heroPortrait: "images/portrait-hero.jpg",
    journey: "images/journey-1.jpg",
    signalPrimary: "images/signal-2.jpg",
    signalSecondary: "images/signal-1.jpg",
  },

  about: {
    summary: "Full-stack developer with internship experience across Django/DRF backends and a MERN stack in an Agile team. I like owning a feature end to end — from API design through to the interface that sits on top of it — and I'm currently finishing an MCA with an 8.5 CGPA.",
    statement: "I want to build intelligent systems, grow through difficult problems, and create a life that makes the people I care about proud.",
  },

  journey: [
    { id: "12th",     label: "12th grade",           detail: "Wanted to pursue B.Tech in Computer Science next." },
    { id: "route",    label: "The route changed",    detail: "Financial circumstances meant B.Tech CS wasn't the path. B.Sc. Computer Science wasn't offered locally either, so Nikhil enrolled in B.Sc. Physics — different route, same direction." },
    { id: "bsc",      label: "B.Sc. Physics",        detail: "Dec 2021 – May 2024. Computer science stayed the long-term plan the whole way through." },
    { id: "mca",      label: "MCA",                  detail: "Aug 2024 – June 2026, CGPA 8.5/10. The transition back into computer science, full time." },
    { id: "intern1",  label: "Python Full Stack Intern", detail: "Web Bocket Pvt. Ltd. — Django, DRF, and real production code." },
    { id: "intern2",  label: "MERN Stack Intern",    detail: "Hexaphor Technologies Pvt. Ltd. — React, Node, Express, MongoDB, Agile sprints." },
    { id: "gossiphy", label: "Gossiphy",             detail: "Designed, built and deployed a full-stack social platform end to end." },
    { id: "progress", label: "Progress AI",          detail: "Built an LLM-backed learning assistant — the clearest expression of where his interest is heading." },
    { id: "future",   label: "AI / ML — what's next", detail: "Intelligent assistants, human-computer interaction, experimental systems." },
  ],

  experience: [
    {
      id: "hexaphor",
      company: "Hexaphor Technologies Pvt. Ltd.",
      role: "MERN Stack Developer Intern",
      period: "March 2026 – June 2026",
      stack: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "Agile"],
      points: [
        "Built and shipped multiple full-stack web application modules in an Agile sprint environment.",
        "Designed and integrated RESTful API endpoints with React frontend components across 3+ application features.",
        "Implemented CRUD operations with optimized MongoDB queries, reducing average data retrieval time for key user-facing views.",
        "Collaborated in daily code reviews and debugging sessions with senior developers, improving overall module stability.",
      ],
    },
    {
      id: "webbocket",
      company: "Web Bocket Pvt. Ltd.",
      role: "Python Full Stack Developer Intern",
      period: "May 2025 – July 2025",
      stack: ["Python", "Django", "DRF", "Django ORM", "Pandas", "NumPy", "Matplotlib"],
      points: [
        "Developed and tested RESTful API endpoints using Django and DRF for multiple backend services.",
        "Built backend logic for authentication flows, form processing, and database operations using Django ORM on a production codebase.",
        "Performed exploratory data analysis on real-world datasets using Pandas and NumPy; visualized insights with Matplotlib.",
        "Participated in bug triage and code reviews, resolving 10+ reported issues across the internship.",
      ],
    },
  ],

  skills: {
    Languages:  ["Python", "JavaScript", "Java", "C"],
    Frameworks: ["Django", "Django REST Framework", "React", "Node.js", "Express.js"],
    Databases:  ["MySQL", "SQLite", "MongoDB", "PostgreSQL — basic"],
    "AI / ML":  ["NumPy", "Pandas", "Matplotlib", "NLP / LLM API Integration", "scikit-learn — basic"],
    Tools:      ["Git", "GitHub", "Postman", "VS Code", "PythonAnywhere", "Docker — basic"],
    "Core Concepts": ["REST API Design", "JWT Authentication", "Django ORM", "OOP", "DBMS", "DSA", "MVC/MVT", "System Architecture", "Agile"],
  },

  projects: [
    {
      id: "gossiphy",
      title: "Gossiphy",
      subtitle: "Full-Stack Social Media Platform",
      tech: ["Django", "Django REST Framework", "SQLite", "Python"],
      flow: ["User", "Auth", "API", "Feed", "Database"],
      points: [
        "User registration, authentication, post creation, social feed, and full CRUD, built on Django and Django ORM.",
        "RESTful API endpoints via Django REST Framework, including token-based authentication and role-based permissions.",
        "Query optimization with select_related and prefetch_related to speed up feed pagination.",
        "Deployed on PythonAnywhere with WSGI configuration, static file serving, and environment-based settings.",
      ],
      live: "https://nikhilgudu2.pythonanywhere.com",
      github: "https://github.com/nikhilmaharana/Gossiphy",
    },
    {
      id: "progress-ai",
      title: "Progress AI",
      subtitle: "Personalized Learning Assistant",
      tech: ["Python", "Django", "NLP", "LLM API"],
      flow: ["User Input", "Prompt System", "LLM / API", "Personalized Response", "Progress Tracking"],
      points: [
        "Analyzes user study input via NLP/LLM API calls to generate personalized recommendations and study plans.",
        "Custom prompt templates and third-party LLM API integration for context-aware, goal-specific responses.",
        "Persistent progress tracking for longitudinal monitoring of learning patterns and engagement.",
        "Decoupled REST backend that isolates AI processing from the frontend layer.",
      ],
      live: null,
      github: "https://github.com/nikhilmaharana/Progress-AI",
    },
  ],

  experiments: {
    intro: "Not professional work — a personal archive of what got Nikhil curious about intelligent systems in the first place. His fascination with Iron Man's JARVIS was an early spark for experimenting with AI/ML and IoT outside of coursework and internships.",
    items: [
      { label: "JARVIS-inspired experiments", detail: "Small personal explorations into conversational, assistant-style AI, inspired by fictional systems like JARVIS — not a production assistant." },
      { label: "AI / ML experiments",         detail: "Hands-on experimentation with AI/ML concepts alongside formal coursework and internships." },
      { label: "IoT experiments",             detail: "Early exploration of connected/embedded systems, complementing his NPTEL coursework in IoT." },
    ],
  },

  signal: {
    title: "Signal",
    intro: "Music has been part of Nikhil's life since school. In 2022 he started recording himself singing, and the response he got kept him going. It isn't a second career — it's a lifelong outlet that keeps him balanced under pressure.",
    milestones: [
      { label: "Childhood", detail: "Singing starts early, informally." },
      { label: "School years", detail: "Performing through school." },
      { label: "2022", detail: "Begins recording himself singing." },
      { label: "Response", detail: "People respond well — he keeps sharing." },
      { label: "Today", detail: "A lifelong passion and creative identity, alongside the engineering." },
    ],
  },

  beyond: [
    { label: "Curiosity",   detail: "Drawn to how intelligent systems work, from JARVIS-inspired curiosity to real NLP/LLM projects." },
    { label: "Persistence", detail: "Doesn't like leaving work at a level that doesn't satisfy him." },
    { label: "Family",      detail: "Comes from a middle-class family — works to build stability and make that effort count for them too." },
    { label: "Music",       detail: "Singing since childhood; recording and sharing since 2022. A release valve, not a side hustle." },
  ],

  future: {
    heading: "Future direction",
    items: ["AI / ML", "Intelligent assistants", "Human-computer interaction", "Experimental systems"],
  },

  contact: {
    heading: "Build something with me",
    body: "Open to software engineering roles, AI/LLM-focused work, and full-stack collaboration — as an MCA fresher looking to build things that matter.",
  },

  education: [
    { degree: "Master of Computer Applications (MCA)", period: "Aug 2024 – June 2026", detail: "CGPA: 8.5 / 10" },
    { degree: "Bachelor of Science — Physics", period: "Dec 2021 – May 2024", detail: "CGPA: 6.7 / 10" },
  ],

  certifications: [
    "NPTEL — Programming in Java (Score: 82%)",
    "NPTEL — Introduction to IoT (Score: 80%)",
  ],
};
