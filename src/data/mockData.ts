export interface Startup {
  id: string;
  name: string;
  tagline: string;
  category: string;
  stage: string;
  score: number;
  tam: string;
  sam: string;
  som: string;
  competitors: string[];
  trends: string[];
  description: string;
  problem: string;
  solution: string;
  features: string[];
  businessModel: string;
  revenue: string;
  teamSize: number;
}

export const STARTUPS: Startup[] = [
  {
    id: "1",
    name: "FinTrack",
    tagline: "Real-time financial analytics for SMBs",
    category: "Fintech",
    stage: "Series A",
    score: 84,
    tam: "$240B",
    sam: "$18B",
    som: "$1.2B",
    competitors: ["QuickBooks", "Xero", "FreshBooks"],
    trends: ["AI-powered forecasting", "Open banking APIs", "Embedded finance"],
    description: "FinTrack provides real-time financial dashboards for small and medium businesses, integrating with major banks and payment processors.",
    problem: "SMBs lack real-time visibility into their financial health, relying on outdated spreadsheets.",
    solution: "An AI-powered dashboard that connects to all financial accounts and provides predictive analytics.",
    features: ["Real-time cash flow", "AI forecasting", "Tax optimization", "Multi-currency"],
    businessModel: "SaaS subscription",
    revenue: "$2.4M ARR",
    teamSize: 24,
  },
  {
    id: "2",
    name: "GreenRoute",
    tagline: "Carbon-neutral logistics optimization",
    category: "CleanTech",
    stage: "Seed",
    score: 72,
    tam: "$180B",
    sam: "$12B",
    som: "$800M",
    competitors: ["FourKites", "project44", "Flexport"],
    trends: ["Carbon credits", "EV fleet management", "Last-mile innovation"],
    description: "GreenRoute optimizes delivery routes for minimal carbon footprint while maintaining delivery speed.",
    problem: "Logistics companies face increasing pressure to reduce emissions without sacrificing efficiency.",
    solution: "An ML-based route optimizer that balances speed, cost, and carbon impact.",
    features: ["Route optimization", "Carbon tracking", "Fleet analytics", "Compliance reports"],
    businessModel: "Per-delivery pricing",
    revenue: "$480K ARR",
    teamSize: 12,
  },
  {
    id: "3",
    name: "MedSync",
    tagline: "Interoperable health records platform",
    category: "HealthTech",
    stage: "Series B",
    score: 91,
    tam: "$320B",
    sam: "$28B",
    som: "$3.2B",
    competitors: ["Epic", "Cerner", "Allscripts"],
    trends: ["FHIR interoperability", "Patient data ownership", "Telehealth integration"],
    description: "MedSync creates a unified patient record that works across all healthcare providers.",
    problem: "Patient data is siloed across different hospitals and clinics, leading to fragmented care.",
    solution: "A FHIR-compliant platform that aggregates and normalizes health records from any source.",
    features: ["Universal records", "Provider matching", "HIPAA compliance", "API marketplace"],
    businessModel: "Enterprise SaaS + API fees",
    revenue: "$8.6M ARR",
    teamSize: 56,
  },
  {
    id: "4",
    name: "EduForge",
    tagline: "AI-powered curriculum builder for schools",
    category: "EdTech",
    stage: "Pre-Seed",
    score: 65,
    tam: "$150B",
    sam: "$8B",
    som: "$400M",
    competitors: ["Canvas", "Google Classroom", "Schoology"],
    trends: ["Personalized learning", "AI tutoring", "Competency-based education"],
    description: "EduForge helps teachers create adaptive curricula using AI that adjusts to student performance.",
    problem: "Teachers spend excessive time creating curricula that don't adapt to individual student needs.",
    solution: "An AI assistant that generates, adapts, and optimizes lesson plans based on student data.",
    features: ["AI curriculum", "Student analytics", "Parent portal", "Assessment engine"],
    businessModel: "Per-student subscription",
    revenue: "$120K ARR",
    teamSize: 8,
  },
  {
    id: "5",
    name: "SecureNest",
    tagline: "Zero-trust security for remote teams",
    category: "Cybersecurity",
    stage: "Series A",
    score: 78,
    tam: "$280B",
    sam: "$22B",
    som: "$1.8B",
    competitors: ["CrowdStrike", "Zscaler", "Okta"],
    trends: ["Zero-trust architecture", "SASE convergence", "AI threat detection"],
    description: "SecureNest provides a zero-trust security layer for distributed teams, protecting endpoints and data.",
    problem: "Remote work has expanded the attack surface, and traditional VPNs can't keep up.",
    solution: "A lightweight zero-trust agent that secures every connection without impacting performance.",
    features: ["Zero-trust access", "Endpoint protection", "Threat intelligence", "Compliance dashboard"],
    businessModel: "Per-seat SaaS",
    revenue: "$3.1M ARR",
    teamSize: 32,
  },
  {
    id: "6",
    name: "AgroSense",
    tagline: "Precision agriculture with satellite data",
    category: "AgriTech",
    stage: "Seed",
    score: 69,
    tam: "$95B",
    sam: "$6B",
    som: "$500M",
    competitors: ["Climate Corp", "Farmers Edge", "Arable"],
    trends: ["Satellite imaging", "IoT sensors", "Regenerative farming"],
    description: "AgroSense combines satellite imagery with ground sensors to optimize crop yields and reduce waste.",
    problem: "Farmers lack precise data to make informed decisions about irrigation, fertilization, and harvesting.",
    solution: "A platform that fuses satellite and IoT data to provide field-level recommendations.",
    features: ["Satellite monitoring", "Soil analysis", "Yield prediction", "Water management"],
    businessModel: "Per-hectare subscription",
    revenue: "$340K ARR",
    teamSize: 15,
  },
];

export const CATEGORIES = ["Fintech", "CleanTech", "HealthTech", "EdTech", "Cybersecurity", "AgriTech"];

export const STAGES = ["Pre-Seed", "Seed", "Series A", "Series B"];

export interface RoadmapModule {
  id: string;
  title: string;
  type: "lesson" | "interview" | "exercise";
  summary?: string;
  aiDigest?: string;
  completed: boolean;
}

export interface RoadmapStage {
  id: string;
  title: string;
  progress: number;
  status: "completed" | "active" | "pending";
  modules: RoadmapModule[];
}

export const ROADMAP_STAGES: RoadmapStage[] = [
  {
    id: "vision",
    title: "Vision",
    progress: 85,
    status: "completed",
    modules: [
      { id: "v1", title: "Defining Your Mission", type: "lesson", summary: "Clear mission statement drafted", aiDigest: "Strong alignment between mission and market need. Consider sharpening the unique angle.", completed: true },
      { id: "v2", title: "Vision Interview", type: "interview", summary: "Articulated 5-year vision", aiDigest: "Vision is ambitious but achievable. Revenue projections need more detail.", completed: true },
      { id: "v3", title: "Value Proposition Canvas", type: "exercise", summary: "Canvas completed with 4 segments", aiDigest: "Good customer fit analysis. Competitor differentiation could be stronger.", completed: true },
      { id: "v4", title: "Founder Story", type: "lesson", summary: "Personal narrative connected to problem", aiDigest: "Compelling founder-market fit. Story resonates with target audience.", completed: false },
    ],
  },
  {
    id: "market",
    title: "Market",
    progress: 60,
    status: "active",
    modules: [
      { id: "m1", title: "Understanding Your Market", type: "lesson", summary: "TAM/SAM/SOM estimated", aiDigest: "Market sizing is realistic. SAM could be further segmented.", completed: true },
      { id: "m2", title: "Customer Discovery", type: "interview", summary: "10 interviews conducted", aiDigest: "Good qualitative data. Need more quantitative validation.", completed: true },
      { id: "m3", title: "Competitive Landscape", type: "exercise", summary: "3 competitors mapped", aiDigest: "Solid competitive analysis. Missing indirect competitors.", completed: true },
      { id: "m4", title: "Market Trends", type: "lesson", completed: false },
      { id: "m5", title: "Go-to-Market Strategy", type: "exercise", completed: false },
    ],
  },
  {
    id: "product",
    title: "Product",
    progress: 30,
    status: "active",
    modules: [
      { id: "p1", title: "MVP Definition", type: "lesson", summary: "Core features identified", aiDigest: "MVP scope is well-defined. Consider reducing feature set further.", completed: true },
      { id: "p2", title: "User Stories Workshop", type: "exercise", summary: "12 user stories written", aiDigest: "Stories cover main flows. Missing edge cases and error states.", completed: true },
      { id: "p3", title: "Technical Architecture", type: "lesson", completed: false },
      { id: "p4", title: "Prototype Review", type: "interview", completed: false },
      { id: "p5", title: "Usability Testing", type: "exercise", completed: false },
      { id: "p6", title: "Product Roadmap", type: "lesson", completed: false },
    ],
  },
  {
    id: "business",
    title: "Business",
    progress: 0,
    status: "pending",
    modules: [
      { id: "b1", title: "Business Model Canvas", type: "exercise", completed: false },
      { id: "b2", title: "Pricing Strategy", type: "lesson", completed: false },
      { id: "b3", title: "Revenue Projections", type: "exercise", completed: false },
      { id: "b4", title: "Investor Readiness", type: "interview", completed: false },
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    progress: 0,
    status: "pending",
    modules: [
      { id: "mk1", title: "Brand Positioning", type: "lesson", completed: false },
      { id: "mk2", title: "Content Strategy", type: "exercise", completed: false },
      { id: "mk3", title: "Launch Plan", type: "lesson", completed: false },
    ],
  },
];

export const MINICURSO_SLIDES = [
  {
    id: 1,
    title: "Understanding Your Market",
    content: "Before building a product, you must deeply understand the market you're entering. This means identifying the total addressable market (TAM), the serviceable addressable market (SAM), and your serviceable obtainable market (SOM).",
    question: "Describe your target market and how you estimated its size.",
    completed: false,
  },
  {
    id: 2,
    title: "Customer Discovery",
    content: "Customer discovery is the process of validating your assumptions about who your customer is, what problems they face, and how they currently solve those problems.",
    question: "Who is your ideal customer? What pain point do they experience daily?",
    completed: false,
  },
  {
    id: 3,
    title: "Competitive Landscape",
    content: "Understanding your competitors isn't just about knowing who they are — it's about understanding their strengths, weaknesses, and the gaps they leave unfilled.",
    question: "List your top 3 competitors and explain what differentiates your approach.",
    completed: false,
  },
  {
    id: 4,
    title: "Market Trends",
    content: "Identifying trends helps you position your startup to ride tailwinds rather than fight headwinds. Look for technological, regulatory, and behavioral shifts.",
    question: "What macro trends support the growth of your market?",
    completed: false,
  },
  {
    id: 5,
    title: "Go-to-Market Strategy",
    content: "Your go-to-market strategy defines how you'll reach your first customers. It should be specific, measurable, and aligned with your resources.",
    question: "What is your primary channel for acquiring your first 100 customers?",
    completed: false,
  },
];
