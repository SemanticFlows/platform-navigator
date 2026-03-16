import { useQuery } from "@tanstack/react-query"
import { fetchStartups } from "@/services/startupService"


export function useStartups(){
  return useQuery({
    queryKey:["startups"],
    queryFn:fetchStartups
  })

}