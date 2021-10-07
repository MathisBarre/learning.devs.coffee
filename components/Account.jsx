import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        website,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <div className="flex flex-col mb-4">
        <label htmlFor="email" className="mb-1 label">Adresse e-mail</label>
        <input id="email" type="text" className="input" value={session.user.email} disabled />
      </div>
      <div className="flex flex-col mb-4">
        <label className="label" htmlFor="username">Nom</label>
        <input
          className="input"
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="label" htmlFor="website">Site internet</label>
        <input
          className="input"
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-end">
        <div>
          <button
            className="px-4 py-2 mr-2 text-white bg-blue-800 rounded"
            onClick={() => updateProfile({ username, website })}
            disabled={loading}
          >
            {loading ? 'Chargement...' : 'Mettre à jour'}
          </button>
        </div>
        <div>
          <button className="px-4 py-2 text-white bg-red-700 rounded" onClick={() => supabase.auth.signOut()}>
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  )
}
