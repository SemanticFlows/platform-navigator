import { useEffect, useState } from "react"
import { collection, query, where, getDocs } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

import { db } from "@/lib/firebase"
import { auth } from "@/lib/firebase"
import { Startup } from "@/types/startup"

export function useCurrentStartup() {

  const [startup,setStartup] = useState<Startup | null>(null)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    const unsub = onAuthStateChanged(auth, async user => {

      if(!user){
        setStartup(null)
        setLoading(false)
        return
      }

      const q = query(
        collection(db,"startups"),
        where("id","==",user.uid)
      )

      const snap = await getDocs(q)

      if(!snap.empty){

        const doc = snap.docs[0]

        setStartup({
          id:doc.id,
          ...doc.data()
        } as Startup)

      }

      setLoading(false)

    })

    return ()=>unsub()

  },[])

  return {
    startup,
    loading
  }
}