import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_APIKEY})

const groundingTool = {
  googleSearch: {}
}

const config = {
  tools: [groundingTool]
}

export async function runGenAI(systemPrompt: string, userPrompt: string) {

  const contents = `
SYSTEM:
${systemPrompt}

USER:
${userPrompt}
`

  const response = await ai.models.generateContent({

    model: "gemini-3-flash-preview",
    contents,
    config

  })

  return response.text
}
