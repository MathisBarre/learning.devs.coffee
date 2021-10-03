import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ provider: "github" })
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
          handleLogin(email)
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