import { useEffect, useState } from "react"
import { runGenAI } from "@/lib/genaiClient"

export function useAIDigest(context: string) {

  const [digest,setDigest] = useState<any>(null)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    generate()
  },[context])

  async function generate(){

    setLoading(true)

    const systemPrompt = `
Você é um analista de startups.

Produza uma análise estruturada.

Formato JSON:

{
analysis: string
strengths: string[]
weaknesses: string[]
recommendations: string[]
}

português
`

    const userPrompt = context

    const response = await runGenAI(systemPrompt,userPrompt)

    try {

      const match = response.match(/\{[\s\S]*\}/)

      if (!match) throw new Error("JSON not found")

      const json = match[0]

      setDigest(JSON.parse(json))

    } catch (err) {

      console.error("AI digest parse error:", response)

    }

    setLoading(false)
  }

  return { digest, loading }
}