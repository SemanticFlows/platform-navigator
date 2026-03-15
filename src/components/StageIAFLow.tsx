import { useEffect, useState } from "react"
import { runGenAI } from "@/lib/genaiClient"
import { STARTUPS } from "@/data/mockData"
import { MarkdownRenderer } from "./MarkdownRenderer"

type Session = {
  id: string
  question: string
  answer?: string
  aiDigest?: string
}

export function StageExplorationFlow({ stageTitle }: { stageTitle: string }) {

  const startup = STARTUPS[0]

  const [intro,setIntro] = useState("")
  const [sessions,setSessions] = useState<Session[]>([])
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    initialize()
  },[])

  async function initialize(){

    setLoading(true)

    const intro = await generateIntro()
    const question = await generateFirstQuestion()

    setIntro(intro)

    setSessions([
      {
        id: crypto.randomUUID(),
        question
      }
    ])

    setLoading(false)
  }

  async function generateIntro(){

    const systemPrompt = `
Você é um mentor de startups.

Escreva uma introdução curta para esta etapa.

Regras:
- português
- máximo 120 palavras
- tom educativo
`

    const userPrompt = `
Startup:

Nome: ${startup.name}
Categoria: ${startup.category}

Problema:
${startup.problem}

Solução:
${startup.solution}

Etapa:
${stageTitle}
`

    return await runGenAI(systemPrompt,userPrompt)
  }

  async function generateFirstQuestion(){

    const systemPrompt = `
Você é um mentor de startups.

Gere a primeira pergunta estratégica.

máximo 25 palavras
português
`

    const userPrompt = `
Startup:

${startup.name}

Problema:
${startup.problem}

Etapa:
${stageTitle}
`

    return await runGenAI(systemPrompt,userPrompt)
  }

  async function generateNextQuestion(history:Session[]){

    const historyText = history.map(s => `
Pergunta: ${s.question}
Resposta: ${s.answer}
`).join("\n")

    const systemPrompt = `
Você é um mentor de startups.

Faça UMA pergunta que aprofunde o pensamento do fundador.

máximo 30 palavras
português
`

    const userPrompt = `
Startup: ${startup.name}

Histórico:

${historyText}
`

    return await runGenAI(systemPrompt,userPrompt)
  }

  async function analyzeAnswer(question:string,answer:string){

    const systemPrompt = `
Analise a resposta do fundador.

Produza:
- avaliação
- lacunas
- sugestão

máximo 80 palavras
`

    const userPrompt = `
Pergunta:
${question}

Resposta:
${answer}
`

    return await runGenAI(systemPrompt,userPrompt)
  }

  async function submitAnswer(index:number,answer:string){

    setLoading(true)

    const s = sessions[index]

    const aiDigest = await analyzeAnswer(s.question,answer)

    const updated = [...sessions]

    updated[index] = {
      ...s,
      answer,
      aiDigest
    }

    setSessions(updated)

    const nextQuestion = await generateNextQuestion(updated)

    setSessions([
      ...updated,
      {
        id: crypto.randomUUID(),
        question: nextQuestion
      }
    ])

    setLoading(false)
  }

  return (

    <div className="space-y-10">

      {intro && (
        <p className="text-muted-foreground leading-relaxed">
          {intro}
        </p>
      )}

      {sessions.map((s,i)=>(
        <SessionBlock
          key={s.id}
          session={s}
          onSubmit={(a)=>submitAnswer(i,a)}
        />
      ))}

      {loading && (
        <p className="text-sm text-muted-foreground">
          Gerando próxima pergunta...
        </p>
      )}

    </div>

  )
}

function SessionBlock({
  session,
  onSubmit
}:{
  session:Session
  onSubmit:(answer:string)=>void
}){

  const [value,setValue] = useState("")

  return (

    <div className="space-y-4">

      <MarkdownRenderer content={session.question} />

      {!session.answer && (
        <>
          <textarea
            className="w-full border rounded-lg p-4 h-32"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
          />

          <button
            onClick={()=>onSubmit(value)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded"
          >
            Continuar
          </button>
        </>
      )}

      {session.answer && (
        <>
          <div className="bg-muted p-4 rounded-lg">
            {session.answer}
          </div>

          {session.aiDigest && (
            <div className="bg-primary/5 border rounded-lg p-4 text-sm">
              <MarkdownRenderer content={session.aiDigest} />
            </div>
          )}
        </>
      )}

    </div>
  )
}