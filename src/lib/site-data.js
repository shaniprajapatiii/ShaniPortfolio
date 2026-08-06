export const SITE = {
   name: "Shani Prajapati",
   role: "Full Stack Developer | Competitive Programmer | Product Builder",
   email: "shaniprajapati630@gmail.com",
   location: "Greater Noida, India",
   resumeUrl: "/SHANI-PRAJAPATI.pdf",
   socials: {
      github: "https://github.com/shaniprajapatiii",
      linkedin: "https://www.linkedin.com/in/shaniprajapatiii",
      twitter: "https://twitter.com/shaniprajapatii",
      leetcode: "https://leetcode.com/shaniprajapatiii",
      codeforces: "https://codeforces.com/profile/shaniprajapati",
      codechef: "https://www.codechef.com/users/shani_6307",
   },
};

export const NAV = [
   { href: "/", label: "Home" },
   { href: "/about", label: "About" },
   { href: "/coding", label: "Coding" },
   { href: "/toolkit", label: "Toolkit" },
   { href: "/projects", label: "Projects" },
   { href: "/experience", label: "Experience" },
   { href: "/articles", label: "Articles" },
   { href: "/contact", label: "Contact" },
];

export const METRICS = [
   { value: "15+", label: "Projects Built" },
   { value: "25+", label: "Technologies" },
];

export const PROJECTS = [
   {
      slug: "studysphere",
      name: "StudySphere - AI-Powered Learning Platform",
      tagline:
         "AI study platform that turns YouTube content into transcripts, summaries, and quizzes",
      description:
         "Built an AI-driven learning platform that transforms YouTube videos into interactive study guides with cleaned transcripts, concise summaries, generated quizzes, progress tracking, and playlist management.",
      category: "Full-Stack",
      status: "Ongoing",
      stack: ["React", "Express.js", "MongoDB", "Node.js", "Tailwind CSS"],
      featured: true,
      href: "https://studysphere-x.vercel.app",
      repo: "https://github.com/shaniprajapatiii/StudySphere",
      image:
         "https://res.cloudinary.com/dwagwbnhm/image/upload/v1776704969/Screenshot_2026-04-20_223800_d0ycq8.png",
   },
   {
      slug: "pletto",
      name: "PLETTO — A Distributed Real-Time Collaboration Platform",
      tagline:
         "Multiplayer platform for teams, unifying documents, chat, meetings, whiteboards, coding, and AI in one synchronized workspace",
      description:
         "PLETTO is a distributed real-time collaboration platform designed to unify documents, chat, meetings, whiteboards, coding, and AI into a single shared workspace where every interaction syncs in milliseconds.",
      summary:
         "PLETTO is a distributed real-time collaboration platform where teams work inside a single shared live digital environment.",
      category: "Full-Stack",
      status: "Ongoing",
      stack: [
         "Next.js",
         "Tailwind CSS",
         "Node.js",
         "Express.js",
         "WebSockets",
         "Redis",
         "PostgreSQL",
         "Yjs",
      ],
      featured: true,
      href: "https://pletto.vercel.app",
      repo: "https://github.com/shaniprajapatiii/PLETTO",
   },
   {
      slug: "clover",
      name: "Clover - AI-Powered Parametric Insurance Platform",
      tagline:
         "Full-stack insurtech platform protecting gig workers from weather and disruption-driven income loss",
      description:
         "Engineered a production-grade insurance platform combining AI risk scoring, parametric policy logic, real-time weather intelligence, and automated claims processing.",
      category: "Full-Stack",
      status: "Ongoing",
      stack: ["React", "Express.js", "MongoDB", "Node.js", "Tailwind CSS"],
      featured: true,
      href: "https://cloverleaf-two.vercel.app",
      repo: "https://github.com/shaniprajapatiii/CLOVER",
      image:
         "https://res.cloudinary.com/dwagwbnhm/image/upload/v1775894804/Screenshot_2026-04-11_133555_z3c0fx.png",
   },
   {
      slug: "datashield",
      name: "DataShield - AI-Powered Privacy Intelligence Platform",
      tagline:
         "Real-time privacy analysis platform that scans websites, detects permission risks, and turns complex policy data into clear insights",
      description:
         "Built a full-stack privacy intelligence platform that analyzes websites through policy extraction, permission detection, and NLP-based risk scoring, including a Chrome extension and live monitoring.",
      category: "Full-Stack",
      status: "Ongoing",
      stack: ["React", "Express.js", "Node.js", "Python", "MongoDB"],
      featured: false,
      href: "https://github.com/shaniprajapatiii/DATA-SHIELD",
      repo: "https://github.com/shaniprajapatiii/DATA-SHIELD",
      image:
         "https://res.cloudinary.com/dwagwbnhm/image/upload/v1775894698/Screenshot_392_wn0k4y.png",
   },
   {
      slug: "portfolio",
      name: "Portfolio Website",
      tagline:
         "Dynamic, responsive portfolio with an admin panel for real-time content management",
      description:
         "Portfolio website with multiple sections, separate pages and a blog, built with Next.js, JavaScript and Tailwind CSS.",
      category: "Web",
      status: "Ongoing",
      stack: ["Next.js", "JavaScript", "Tailwind CSS"],
      featured: false,
      href: "https://shaniprajapati.vercel.app",
      repo: "https://github.com/shaniprajapatiii/ShaniPortfolio",
   },
   {
      slug: "Tic Tac Toe",
      name: "Tic Tac Toe Game",
      tagline:
         "Interactive Tic Tac Toe game with automatic win and draw detection",
      description:
         "Web-based Tic Tac Toe game developed using HTML, CSS, and JavaScript with win/draw detection and responsive UI.",
      category: "Frontend",
      status: "Completed",
      stack: ["JavaScript", "HTML", "CSS"],
      featured: false,
      href: "https://tictactoe-e.netlify.app",
      repo: "https://github.com/shaniprajapatiii/tic-tac-toe",
   },
];

export const FOCUS = [
   "Data Structures & Algorithms",
   "System Design",
   "Machine Learning",
   "Browser Internals",
];

export const TIMELINE = [
   {
      year: "2022",
      title: "Started programming",
      body: "First lines of Java, fell in love with problem-solving.",
   },
   {
      year: "2023",
      title: "Discovered DSA",
      body: "Began structured practice on LeetCode and Codeforces.",
   },
   {
      year: "2024",
      title: "First major projects",
      body: "Shipped full-stack apps used by peers and community.",
   },
   {
      year: "2025",
      title: "Hackathons & teams",
      body: "Led cross-functional teams; placed in multiple events.",
   },
   {
      year: "2026",
      title: "Exploring concepts of AI and Machine Learning",
      body: "Diving deep into neural networks, deep learning, and their applications.",
   },
];

export const ARTICLES = [
   {
      slug: "thinking-in-segments",
      title: "Thinking in Segments",
      description:
         "A practitioner's intuition for segment trees, without the academic baggage.",
      category: "Algorithms",
      readTime: "9 min",
      date: "2025-10-14",
   },
   {
      slug: "ship-first-debug-later",
      title: "Ship First, Debug Later",
      description:
         "Why I stopped chasing perfect MVPs and started shipping rough ones.",
      category: "Career Growth",
      readTime: "5 min",
      date: "2025-09-02",
   },
   {
      slug: "react-server-mental-model",
      title: "A Mental Model for React Server Components",
      description:
         "The smallest set of ideas you need to reason about RSC boundaries.",
      category: "Web Development",
      readTime: "11 min",
      date: "2025-08-18",
   },
   {
      slug: "rating-is-noise",
      title: "Your Rating Is Mostly Noise",
      description:
         "What 100 contests taught me about variance and what to actually optimise for.",
      category: "Algorithms",
      readTime: "6 min",
      date: "2025-07-05",
   },
   {
      slug: "designing-dsa-tracker",
      title: "Designing DSA Tracker",
      description:
         "How a personal pain point became a tool used by 200+ students.",
      category: "Projects",
      readTime: "8 min",
      date: "2025-05-22",
   },
   {
      slug: "system-design-self-study",
      title: "A Self-Study Plan for System Design",
      description: "The exact books, talks and exercises I used over six months.",
      category: "System Design",
      readTime: "12 min",
      date: "2025-03-11",
   },
];

export const EXPERIENCE = [
   {
      role: "Open Source Contributor",
      org: "Various",
      period: "2024 — Present",
      summary:
         "Shipping fixes and features to TypeScript tooling and React component libraries.",
      tags: [
         "JavaScript",
         "TypeScript",
         "React",
         "Next.js",
         "Express.js",
         "Node.js",
         "Tooling",
      ],
   },
   {
      role: "Hackathon Lead",
      org: "Smart India Hackathon & campus events",
      period: "2024 — 2025",
      summary:
         "Led 4-person teams across three hackathons; built MVPs end-to-end in under 36 hours.",
      tags: ["Leadership", "Full-stack", "Product"],
   },
   {
      role: "DSA Mentor",
      org: "GLBITM CDC Department",
      period: "2024 — Present",
      summary:
         "Mentor juniors on structured DSA practice and interview preparation.",
      tags: ["Mentorship", "DSA"],
   },
   {
      role: "Undergraduate Researcher",
      org: "GLBITM Information Technology Department",
      period: "2 months in 2025",
      summary: "Exploring graph-based representations for citation analysis.",
      tags: ["Research", "Graphs", "ML"],
   },
];