export interface Startup {
  id: string
  name: string
  tagline: string
  category: string
  stage: string
  score: number
  tam: string
  sam: string
  som: string
  competitors: string[]
  trends: string[]
  description: string
  problem: string
  solution: string
  features: string[]
  businessModel: string
  revenue: string
  sector: string
  icp?: string
  marketSize?: string
  teamSize: number
}

export interface RoadmapModule {
  id: string;
  title: string;
  type: "lesson" | "interview" | "exercise";
  summary?: string;
  aiDigest?: string;
  completed: boolean;
}

export interface RoadmapStage {
  id: string;
  title: string;
  progress: number;
  status: "completed" | "active" | "pending";
  modules: RoadmapModule[];
}