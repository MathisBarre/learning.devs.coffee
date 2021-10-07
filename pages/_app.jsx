import '../styles/globals.css'
import { SessionContextWrapper } from '../context/session'; // import based on where you put it
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <SessionContextWrapper>
          <Header />
          <Component {...pageProps} />
      </SessionContextWrapper>
    </div>
  )
}

export default MyApp
