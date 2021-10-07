import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'

export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(session)
      setSession(session)
    })
  }, [])

  return (
    <div>
      <header className="p-4 shadow ">
        <div className="container flex items-center justify-between mx-auto">
          <h1 className="text-2xl font-extrabold text-gray-800">learning.devs.coffee</h1>
          {!session ? <Auth /> : (<>
            <span className="font-medium">Connecté ✔️</span>
          </>)}
        </div>
      </header>

      <main className="container mx-auto mt-8">
        {session && <Account key={session.user.id} session={session} />}
      </main>
    </div>
  )
}