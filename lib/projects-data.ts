export type Project = {
  num: string;
  name: string;
  tagline: string;
  year: string;
  description: string;
  highlights: string[];
  stack: string[];
  color: string;
  longDescription?: string;
  challenges?: string[];
  outcome?: string;
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    num: "01",
    name: "CampaignFlow",
    tagline: "AI Sales Automation",
    year: "2025",
    description:
      "Microservices-based architecture for autonomous sales task execution. Leverages async programming to handle high-volume, complex workflows with real-time processing.",
    longDescription:
      "CampaignFlow is an enterprise-grade AI-powered sales automation platform built on a microservices architecture. It autonomously plans, executes, and monitors outbound sales campaigns through intelligent task orchestration, allowing sales teams to scale their reach without scaling headcount. The system integrates with CRM tools, email providers, and LinkedIn to create cohesive multi-channel outreach strategies.",
    highlights: [
      "Designed microservices architecture for autonomous task execution",
      "Optimized MySQL schema with composite indexes — 15–30% read query improvement",
      "Asynchronous programming for high-volume workflow handling",
    ],
    challenges: [
      "Coordinating distributed services with eventual consistency while maintaining data integrity across campaign states",
      "Rate-limiting and backoff strategies to avoid being flagged by email providers",
      "Building a real-time analytics pipeline to surface actionable metrics without impacting write performance",
    ],
    outcome:
      "Reduced manual outreach effort by ~70% for pilot users. Achieved sub-200ms API response times under load with async task queuing.",
    stack: ["React", "Node.js", "Python", "MySQL", "Redis", "Docker"],
    color: "#f5a623",
    github: "https://github.com/shreenath-dev",
  },
  {
    num: "02",
    name: "MedMatch",
    tagline: "A Social Media Platform for Medminds",
    year: "2025",
    description:
      "Full-stack production web app with GenAI workflows and a recommendation engine. Implements secure API practices including request validation and access control.",
    longDescription:
      "MedMatch is a niche social networking platform exclusively for medical professionals and students. It features AI-powered content curation, peer recommendation, and domain-specific discussion threads. The platform uses GenAI to summarize complex medical literature and surface relevant research to users based on their specialisation and activity patterns.",
    highlights: [
      "Integrated GenAI workflows and real-time recommendation engine",
      "Secure API: request validation, access control, structured logging",
      "Microservices architecture with MERN stack",
    ],
    challenges: [
      "Building a domain-aware recommendation engine that understands medical specialisations without large training datasets",
      "Ensuring HIPAA-aligned data handling practices in a Node.js environment",
      "Scaling WebSocket-based real-time notifications across multiple service replicas",
    ],
    outcome:
      "Platform onboarded 200+ medical professionals during beta. Recommendation engine achieved a 38% click-through rate on suggested content.",
    stack: ["MongoDB", "Express", "React", "Node.js", "GenAI", "Microservices", "Socket.io"],
    color: "#e8c84a",
    github: "https://github.com/shreenath-dev",
  },
  {
    num: "03",
    name: "Defacement Detector",
    tagline: "Website Integrity Monitor",
    year: "Jun–Jul 2024",
    description:
      "Real-time monitoring system to detect structural website changes using OCR and CNN. Fault-tolerant design ensures continuous system integrity under adverse conditions.",
    longDescription:
      "Defacement Detector is a cybersecurity tool that continuously monitors websites for unauthorised visual or structural modifications — a form of attack common on government and media websites. It combines OCR text extraction with a Convolutional Neural Network trained on page layout fingerprints to detect anomalies that differ from a stored baseline snapshot. Alerts are dispatched in real time via email and webhook.",
    highlights: [
      "Real-time structural change detection via OCR + CNN",
      "Fault-tolerant monitoring with automated alerting",
      "Python-based pipeline with robust error handling",
    ],
    challenges: [
      "Distinguishing legitimate content updates from malicious defacement to minimise false positives",
      "Handling dynamic web pages with JavaScript-rendered content during screenshot capture",
      "Designing a resilient scheduler that survives network partitions and restarts without missing monitoring cycles",
    ],
    outcome:
      "Achieved 94% defacement detection accuracy on a test dataset of 500 historical defacement samples. Average alert latency under 30 seconds.",
    stack: ["Python", "OpenCV", "OCR", "CNN", "TensorFlow", "Celery"],
    color: "#c8c8c8",
    github: "https://github.com/shreenath-dev",
  },
];
