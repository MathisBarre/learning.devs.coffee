import Link from "next/link"
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useSessionContext } from '../context/session'

export default function Header() {
  const {session, setSession} = useSessionContext()

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(session)
      setSession(session)
    })
  }, [])

  return (
    <header className="py-4 shadow ">
      <div className="my-container flex items-center justify-between mx-auto">
        <h1 className="text-2xl font-extrabold text-gray-800"><Link href="/"><a>learning.devs.coffee</a></Link></h1>
        {!session ? <Auth /> : (<>
          <Link href="/profil"><a className="font-medium">{session.user.email}</a></Link>
        </>)}
      </div>
    </header>
  )
}

function Auth() {
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({provider: "github"}, {
        redirectTo: process.env.NEXT_PUBLIC_SIGNIN_REDIRECTION || "https://learning.devs.coffee"
      })
      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault()
          handleLogin()
        }}
        className="bg-[#181717] rounded px-4 py-2 text-white flex items-center"
        disabled={loading}
      >
        <img className="h-5 mr-3" src="/images/icones/github.svg" alt="" />
        <span className="font-medium">{loading ? 'Loading' : 'Connexion avec GitHub'}</span>
      </button>
    </div>
  )
}