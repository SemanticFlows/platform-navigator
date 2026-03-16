import { useState } from "react"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth"

import { doc, setDoc } from "firebase/firestore"

import { auth, googleProvider, db } from "@/lib/firebase"

const logo = "/logo.png"
const bg = "/bg.png"

const Index = () => {

  const [mode,setMode] = useState<"login"|"signup">("login")

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const [startup,setStartup] = useState({
    name:"",
    category:"",
    description:"",
    teamSize:1
  })

  async function login(){
    await signInWithEmailAndPassword(auth,email,password)
  }

  async function signup(){

    const userCred = await createUserWithEmailAndPassword(auth,email,password)

    const uid = userCred.user.uid

    await setDoc(doc(db,"startups",uid),{

      id:uid,
      name:startup.name,
      category:startup.category,
      description:startup.description,
      teamSize:startup.teamSize,

      stage:"idea",
      score:0,
      tagline:"",
      tam:"",
      sam:"",
      som:"",
      competitors:[],
      trends:[],
      problem:"",
      solution:"",
      features:[],
      businessModel:"",
      revenue:"",
      sector:""

    })

  }

  async function google(){
    await signInWithPopup(auth,googleProvider)
  }

  return (

    <div className="min-h-screen grid grid-cols-2">

      {/* HERO */}

      <div className="relative bg-[#0b132b] text-white flex flex-col justify-between p-16 ">

        <img
          src={bg}
          id="logscreen-bg"
          className="absolute w-[120%] opacity-20 blur-3xl animate-slowspin"
        />

        <div>



          <span className="text-xs bg-purple-500/20 px-3 py-1 rounded-full">
            LEVEL UP YOUR BUSINESS
          </span>


          <div className="flex items-center gap-3 mb-12" id="logscreen-logo-wrapper">

            <img id="logo-logscreen" src={logo} />

          </div>

          <h1 className="text-5xl font-bold mt-6 leading-tight">

            Sua jornada <span className="text-purple-400">épica</span> começa agora.

          </h1>
          

          <p className="text-white/70 mt-6 max-w-lg">

            Transforme sua ideia em um unicórnio enquanto desbloqueia conquistas, ganha XP e domina o mercado.

          </p>

          

        </div>

      </div>

      {/* LOGIN */}

      <div className="flex items-center justify-center bg-[#0b132b]">

        <div className="w-[420px] bg-white rounded-xl p-10 shadow-xl">

          <h2 className="text-2xl font-semibold mb-2">

            {mode === "login" ? "Bem-vindo de volta!" : "Criar Startup"}

          </h2>

          <p className="text-gray-500 mb-6">
            Continue sua jornada e conquiste novos marcos hoje.
          </p>

          <div className="space-y-4">


            {mode === "signup" && (

              <>
                <input
                  placeholder="Nome da Startup"
                  value={startup.name}
                  onChange={e=>setStartup({...startup,name:e.target.value})}
                  className="w-full border rounded-lg p-3"
                />

                <input
                  placeholder="Categoria"
                  value={startup.category}
                  onChange={e=>setStartup({...startup,category:e.target.value})}
                  className="w-full border rounded-lg p-3"
                />

                <textarea
                  placeholder="Descrição básica da startup"
                  value={startup.description}
                  onChange={e=>setStartup({...startup,description:e.target.value})}
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="number"
                  placeholder="Número de pessoas no time"
                  value={startup.teamSize}
                  onChange={e=>setStartup({...startup,teamSize:Number(e.target.value)})}
                  className="w-full border rounded-lg p-3"
                />

              </>

            )}

            <input
              placeholder="Email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              className="w-full border rounded-lg p-3"
            />


            {mode === "login" ? (
              <>
              
              <button
                onClick={login}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 rounded-lg font-semibold"
                >
                Iniciar Missão
              </button>

                          <button
              onClick={google}
              className="w-full border p-3 rounded-lg"
            >
              Login com Google
            </button>
                </>

            ) : (

              <button
                onClick={signup}
                className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold"
              >
                Criar Startup
              </button>

            )}



          </div>

          <div className="text-center mt-6 text-sm">

            {mode === "login" ? (

              <button onClick={()=>setMode("signup")}>
                Novo por aqui? Crie sua conta
              </button>

            ) : (

              <button onClick={()=>setMode("login")}>
                Já possui conta?
              </button>

            )}

          </div>

        </div>

      </div>

    </div>

  )
}

export default Index