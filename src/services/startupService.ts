import { collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { Startup } from "@/types/startup"

export const MOCK_STARTUPS: Startup[] = [
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
    competitors: ["QuickBooks", "Xero"],
    trends: ["Open banking", "AI forecasting"],
    description: "Financial dashboards for SMBs.",
    problem: "SMBs lack financial visibility.",
    solution: "AI analytics dashboard.",
    features: ["Forecasting", "Cashflow"],
    businessModel: "SaaS subscription",
    revenue: "$2.4M ARR",
    sector: "Finance",
    teamSize: 24
  },

  {
    id: "2",
    name: "HealthSync",
    tagline: "Unified patient data for modern clinics",
    category: "Healthtech",
    stage: "Seed",
    score: 72,
    tam: "$180B",
    sam: "$12B",
    som: "$800M",
    competitors: ["Epic", "Cerner"],
    trends: ["Digital health", "AI diagnostics"],
    description: "Platform to unify medical records and analytics for clinics.",
    problem: "Patient data is fragmented across systems.",
    solution: "Cloud platform aggregating records with predictive health insights.",
    features: ["Patient dashboard", "Predictive alerts", "EHR sync"],
    businessModel: "SaaS subscription",
    revenue: "$850K ARR",
    sector: "Healthcare",
    teamSize: 14
  },

  {
    id: "3",
    name: "GreenRoute",
    tagline: "AI logistics for sustainable delivery",
    category: "Logistics",
    stage: "Pre-Seed",
    score: 63,
    tam: "$300B",
    sam: "$25B",
    som: "$2B",
    competitors: ["Route4Me", "Onfleet"],
    trends: ["Green logistics", "AI route optimization"],
    description: "Route optimization for eco-friendly delivery operations.",
    problem: "Delivery fleets waste fuel due to inefficient routing.",
    solution: "AI-driven route planning to reduce emissions and cost.",
    features: ["Route optimization", "Fleet analytics", "Emission tracking"],
    businessModel: "SaaS + usage pricing",
    revenue: "$120K ARR",
    sector: "Logistics",
    teamSize: 9
  },

  {
    id: "4",
    name: "EduForge",
    tagline: "AI-powered learning paths for professionals",
    category: "EdTech",
    stage: "Seed",
    score: 70,
    tam: "$160B",
    sam: "$10B",
    som: "$900M",
    competitors: ["Coursera", "Udemy"],
    trends: ["AI learning", "Upskilling economy"],
    description: "Adaptive learning platform for professional education.",
    problem: "Online learning lacks personalization and engagement.",
    solution: "AI builds dynamic learning paths based on skills and goals.",
    features: ["Skill graph", "Adaptive curriculum", "Progress analytics"],
    businessModel: "Subscription + enterprise licensing",
    revenue: "$540K ARR",
    sector: "Education",
    teamSize: 18
  },

  {
    id: "5",
    name: "BuildLens",
    tagline: "Construction monitoring powered by AI vision",
    category: "ConTech",
    stage: "Series A",
    score: 79,
    tam: "$90B",
    sam: "$8B",
    som: "$600M",
    competitors: ["Procore", "OpenSpace"],
    trends: ["AI computer vision", "Construction analytics"],
    description: "Visual monitoring and analytics for construction sites.",
    problem: "Construction projects lack real-time progress visibility.",
    solution: "AI camera analysis to monitor project status automatically.",
    features: ["Site monitoring", "Progress tracking", "Risk alerts"],
    businessModel: "SaaS per project",
    revenue: "$3.1M ARR",
    sector: "Construction",
    teamSize: 22
  }
]

export async function fetchStartups(): Promise<Startup[]> {

  const ref = collection(db, "startups")
  const snap = await getDocs(ref)


  // seed inicial
  if (snap.size < 3) {

    for (const s of MOCK_STARTUPS) {
      await setDoc(doc(db, "startups", s.id), s)
    }

  }
  
  return snap.docs.map(d => ({
    id: d.id,
    ...d.data()
  })) as Startup[]
}

export type CreateStartupInput = {
  name: string
  category: string
  description: string
}

export async function createStartup(data: CreateStartupInput) {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }

  // 1 — cria startup
  const startupRef = await addDoc(
    collection(db, "startups"),
    {
      ...data,
      createdAt: Date.now(),
      ownerId: user.uid
    }
  )

  const startupId = startupRef.id

  // 2 — vincula usuário à startup
  await setDoc(
    doc(db, "users", user.uid),
    {
      startupId
    },
    { merge: true }
  )

  return startupId
}