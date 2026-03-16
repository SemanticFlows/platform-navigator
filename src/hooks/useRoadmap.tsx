import { useQuery } from "@tanstack/react-query"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export const ROADMAP_TEMPLATE = [
  {
    id: "vision",
    title: "Visão",
    progress: 0,
    status: "pending",
    modules: [
      {
        id: "v1",
        title: "Definindo sua missão",
        type: "lesson",
        completed: false
      },
      {
        id: "v2",
        title: "Entrevista de visão",
        type: "interview",
        completed: false
      },
      {
        id: "v3",
        title: "Canvas de proposta de valor",
        type: "exercise",
        completed: false
      },
      {
        id: "v4",
        title: "História do fundador",
        type: "lesson",
        completed: false
      }
    ]
  },

  {
    id: "market",
    title: "Mercado",
    progress: 0,
    status: "pending",
    modules: [
      {
        id: "m1",
        title: "Entendendo seu mercado",
        type: "lesson",
        completed: false
      },
      {
        id: "m2",
        title: "Descoberta de clientes",
        type: "interview",
        completed: false
      },
      {
        id: "m3",
        title: "Panorama competitivo",
        type: "exercise",
        completed: false
      },
      {
        id: "m4",
        title: "Tendências de mercado",
        type: "lesson",
        completed: false
      },
      {
        id: "m5",
        title: "Estratégia de entrada no mercado",
        type: "exercise",
        completed: false
      }
    ]
  },

  {
    id: "product",
    title: "Produto",
    progress: 0,
    status: "pending",
    modules: [
      {
        id: "p1",
        title: "Definição do MVP",
        type: "lesson",
        completed: false
      },
      {
        id: "p2",
        title: "Workshop de histórias de usuário",
        type: "exercise",
        completed: false
      },
      {
        id: "p3",
        title: "Arquitetura técnica",
        type: "lesson",
        completed: false
      },
      {
        id: "p4",
        title: "Revisão de protótipo",
        type: "interview",
        completed: false
      },
      {
        id: "p5",
        title: "Testes de usabilidade",
        type: "exercise",
        completed: false
      },
      {
        id: "p6",
        title: "Roadmap de produto",
        type: "lesson",
        completed: false
      }
    ]
  },

  {
    id: "business",
    title: "Negócios",
    progress: 0,
    status: "pending",
    modules: [
      {
        id: "b1",
        title: "Canvas de modelo de negócio",
        type: "exercise",
        completed: false
      },
      {
        id: "b2",
        title: "Estratégia de precificação",
        type: "lesson",
        completed: false
      },
      {
        id: "b3",
        title: "Projeções de receita",
        type: "exercise",
        completed: false
      },
      {
        id: "b4",
        title: "Preparação para investidores",
        type: "interview",
        completed: false
      }
    ]
  },

  {
    id: "marketing",
    title: "Marketing",
    progress: 0,
    status: "pending",
    modules: [
      {
        id: "mk1",
        title: "Posicionamento de marca",
        type: "lesson",
        completed: false
      },
      {
        id: "mk2",
        title: "Estratégia de conteúdo",
        type: "exercise",
        completed: false
      },
      {
        id: "mk3",
        title: "Plano de lançamento",
        type: "lesson",
        completed: false
      }
    ]
  }
]

export function useRoadmap(startupId?: string) {

  return useQuery({

    queryKey: ["roadmap", startupId],

    enabled: !!startupId,

    queryFn: async () => {

      const ref = doc(db, "startups", startupId!, "roadmap", "data")

      const snap = await getDoc(ref)

      // se já existir
      if (snap.exists()) {
        const data = snap.data()
        return data.stages ?? []
      }

      // criar roadmap inicial
      const skeleton = {
        stages: ROADMAP_TEMPLATE
      }

      await setDoc(ref, skeleton)

      return skeleton.stages

    }

  })

}