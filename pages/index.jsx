import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'

export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div>
      <header className=" shadow p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl text-gray-800 font-extrabold">learning.devs.coffee</h1>
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