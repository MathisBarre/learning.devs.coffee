import Account from "../components/Account"
import { useSessionContext } from '../context/session'

export default function Profil() {
  const {session, setSession} = useSessionContext()

  return (
    <main className="my-container mt-8">
      {session && <Account key={session.user.id} session={session} />}
    </main>
  )
}