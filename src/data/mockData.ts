import { RoadmapStage, Startup } from "@/types/startup"
import { fetchStartups } from "@/services/startupService"

export let STARTUPS: Startup[] = []

export async function initStartups(){

  STARTUPS = await fetchStartups()

  return STARTUPS
}



export const ROADMAP_STAGES: RoadmapStage[] = [
  {
    id: "vision",
    title: "Vision",
    progress: 85,
    status: "completed",
    modules: [
      { id: "v1", title: "Defining Your Mission", type: "lesson", summary: "Our mission is to democratize financial visibility for small businesses. We believe every entrepreneur deserves real-time insight into their cash flow, runway, and growth trajectory — without needing a CFO.", aiDigest: "Strong alignment between mission and market need. The 'democratize' angle resonates well with the SMB segment. Consider sharpening the unique differentiator vs. existing tools like QuickBooks. Your mission statement scores 8/10 on clarity.", completed: true },
      { id: "v2", title: "Vision Interview", type: "interview", summary: "In 5 years, FinTrack will be the default financial OS for 2M+ SMBs across LATAM and Europe. We plan to expand from analytics into embedded lending and automated tax filing by Year 3.", aiDigest: "Vision is ambitious but achievable given current traction. The LATAM expansion is well-timed with open banking regulation. Revenue projections for Year 3-5 need more granular detail — consider building a bottoms-up model.", completed: true },
      { id: "v3", title: "Value Proposition Canvas", type: "exercise", summary: "Mapped 4 customer segments: solo founders, small retail, professional services, and e-commerce operators. Each segment has distinct pain points around cash flow visibility and tax compliance.", aiDigest: "Excellent segmentation depth. Customer-problem fit is strongest for solo founders and e-commerce. Professional services segment may require a different feature set — consider deprioritizing for MVP. Competitor differentiation could be stronger on the AI forecasting angle.", completed: true },
      { id: "v4", title: "Founder Story", type: "lesson", summary: "As a former small business owner, I spent 15 hours/week on spreadsheets trying to understand my finances. The breaking point was missing a critical tax deadline that cost $12K in penalties.", aiDigest: "Compelling founder-market fit — the personal financial pain is visceral and relatable. This story will resonate strongly with angel investors and SMB customers alike. Consider adding the 'aha moment' that led to the technical solution.", completed: false },
    ],
  },
  {
    id: "market",
    title: "Market",
    progress: 60,
    status: "active",
    modules: [
      { id: "m1", title: "Understanding Your Market", type: "lesson", summary: "TAM: $240B global SMB financial software market. SAM: $18B in LATAM and Southern Europe where open banking is emerging. SOM: $1.2B targeting tech-savvy SMBs with 10-50 employees.", aiDigest: "Market sizing methodology is sound — top-down validated with bottom-up estimates. SAM could be further segmented by vertical (retail vs. services). The $1.2B SOM is aggressive but defensible if you capture 3% of SAM within 5 years.", completed: true },
      { id: "m2", title: "Customer Discovery", type: "interview", summary: "Conducted 10 customer discovery interviews across 3 segments. Key finding: 8/10 founders spend 10+ hours/week on financial admin. Top pain points: cash flow unpredictability, tax deadline anxiety, and inability to forecast hiring capacity.", aiDigest: "Strong qualitative signal — the 80% consistency on time-spent validates the core problem. However, 10 interviews is below the recommended 30+ for statistical confidence. Recommend adding a quantitative survey (n=100+) to validate willingness-to-pay.", completed: true },
      { id: "m3", title: "Competitive Landscape", type: "exercise", summary: "Mapped 3 direct competitors: QuickBooks (market leader, complex UI), Xero (strong in EU, weak in LATAM), FreshBooks (invoicing-focused, lacks analytics). Our differentiation: AI-native forecasting and real-time bank sync.", aiDigest: "Solid direct competitor analysis. However, you're missing indirect competitors: spreadsheets (Excel/Sheets), accountants-as-a-service, and emerging AI tools like Brex and Mercury. Your AI-native positioning is strong — make it the hero of your GTM narrative.", completed: true },
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
      { id: "p1", title: "MVP Definition", type: "lesson", summary: "MVP v1 focuses on 3 core features: (1) real-time bank account sync via Plaid, (2) automated cash flow dashboard with 30/60/90-day projections, (3) smart alerts for low balance and upcoming obligations. Deliberately excluded: invoicing, tax filing, multi-currency.", aiDigest: "MVP scope is well-defined and appropriately constrained. The 3-feature focus aligns with the 'cash flow visibility' core value prop. Consider whether smart alerts alone justify a paid tier, or if you need the dashboard as the 'wow' feature for conversion. Feature exclusions are smart — resist scope creep.", completed: true },
      { id: "p2", title: "User Stories Workshop", type: "exercise", summary: "Wrote 12 user stories across 3 personas. Key stories: 'As a solo founder, I want to see my runway in real-time so I know when to fundraise.' 'As a retail owner, I want weekly cash flow predictions so I can plan inventory purchases.'", aiDigest: "Stories cover the main happy paths well. Missing critical edge cases: what happens when bank sync fails? How does the system handle multiple currencies? Error states and recovery flows need user stories too. Recommend adding 5-8 edge case stories before development.", completed: true },
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
