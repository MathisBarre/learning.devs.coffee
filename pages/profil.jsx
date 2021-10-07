import Account from "../components/Account"
import { useSessionContext } from '../context/session'

export default function profil() {
  const {session, setSession} = useSessionContext()

  return (
    <main className="container mx-auto mt-8">
      {session && <Account key={session.user.id} session={session} />}
    </main>
  )
}