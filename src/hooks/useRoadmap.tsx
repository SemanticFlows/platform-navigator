import { useQuery } from "@tanstack/react-query"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export function useRoadmap(startupId?: string) {

  return useQuery({

    queryKey: ["roadmap", startupId],

    enabled: !!startupId,

    queryFn: async () => {

      const ref = doc(db, "roadmaps", startupId!)

      const snap = await getDoc(ref)

      if (!snap.exists()) {
        return []
      }

      const data = snap.data()

      return data.stages ?? []

    }

  })
}