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
  }
]

export async function fetchStartups(): Promise<Startup[]> {

  const ref = collection(db, "startups")
  const snap = await getDocs(ref)

  // seed inicial
  if (snap.empty) {

    for (const s of MOCK_STARTUPS) {
      await setDoc(
        doc(db, "startups", s.id),
        s,
        { merge: true }
      )
    }

    return MOCK_STARTUPS
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