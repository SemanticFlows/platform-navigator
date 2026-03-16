import { useQuery } from "@tanstack/react-query"
import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export function useRoadmap(startupId?: string) {

  return useQuery({

    queryKey: ["roadmap", startupId],

    enabled: !!startupId,

    queryFn: async () => {

      const templateSnap = await getDocs(
        collection(db,"roadmapTemplates")
      )

      const stages = templateSnap.docs.map(d => ({
        id: d.id,
        ...d.data()
      }))

      const result = []

      for (const stage of stages) {

        const progressRef = doc(
          db,
          "startups",
          startupId!,
          "roadmapProgress",
          stage.id
        )

        const progressSnap = await getDoc(progressRef)

        const progress = progressSnap.exists()
          ? progressSnap.data()
          : { modules: {} }

        const modules = stage.modules.map((m:any)=>{

          const p = progress.modules?.[m.id] || {}

          return {
            ...m,
            completed: p.completed || false,
            summary: p.summary || null,
            aiDigest: p.aiDigest || null
          }

        })

        const completedCount = modules.filter(m=>m.completed).length

        const status =
          completedCount === modules.length
            ? "completed"
            : completedCount > 0
            ? "active"
            : "pending"

        const progressPercent =
          (completedCount/modules.length)*100

        result.push({
          ...stage,
          modules,
          status,
          progress: progressPercent
        })

      }

      return result

    }

  })

}