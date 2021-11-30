import { ArrowUpIcon } from "@heroicons/react/solid"

export default function Home() {

  const ressourcesList = [
    {
      name: "freeCodeCamp.org",
      upvote: 83,
      url: "https://freecodecamp.org"
    },
    {
      name: "OpenClassrooms",
      upvote: 20,
      url: "https://openclassrooms.com"
    },
  ]

  return (
    <div>
      <main className="my-container mt-8">
        <h1 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Meilleures ressources</h1>
        <div className="grid gap-y-4 mt-4">
          {ressourcesList.map((ressource) => {
            return (
              <section key={ressource.name} className="p-4 border border-gray-200 rounded-md flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-4 rounded py-1 px-2 bg-gray-200">{ressource.upvote}</div>
                  <h2>
                    <a href={ressource.url} target="_blank" rel="noopener noreferrer" className="underline">
                      {ressource.name}
                    </a>
                  </h2>
                </div>
                <div className="flex">
                  <div className="cursor-pointer hover:underline"><ArrowUpIcon className="h-6 opacity-50 hover:opacity-100" /></div>
                </div>
              </section>
            )
          })}
        </div>
      </main>
    </div>
  )
}