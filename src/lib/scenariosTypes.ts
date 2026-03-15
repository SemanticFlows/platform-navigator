import { Startup } from "@/types/startup"

export type Scenario = {

  id: string
  title: string
  systemPrompt: string

  buildSearchQueries?: (
    profile: Startup,
    userAnswer: string
  ) => string[]

  formatSearchContext?: (
    results: any
  ) => string

}
