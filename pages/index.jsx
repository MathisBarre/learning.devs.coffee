import { supabase } from "@/utils/supabaseClient"
import IndexRessource from "@/components/pages/index/IndexRessource"

export default function Home({ ressourcesList }) {
  return (
    <div>
      <main className="my-container mt-8">
        <h1 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Meilleures ressources</h1>
        <div className="grid gap-y-4 mt-4">
          {ressourcesList.map((ressource) => <IndexRessource key={ressource.name} ressource={ressource} />)}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps(context) {
  const secondsInOneHour = 36000

  let { data } = await supabase
    .from('learning-plateform')
    .select('*')

  return {
    props: {
      ressourcesList: data
    },
    revalidate: secondsInOneHour
  }
}
