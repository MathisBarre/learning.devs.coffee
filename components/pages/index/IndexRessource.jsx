import { ArrowUpIcon } from "@heroicons/react/solid"

export default function IndexRessource({ ressource }) {
  return (
    <section key={ressource.name} className="p-4 border border-gray-200 rounded-md flex justify-between items-center">
      <div className="flex items-center">
        <div className="mr-4 rounded py-1 px-2 bg-gray-200">{ressource.upvotes}</div>
        <h2>
          <a href={ressource.link} target="_blank" rel="noopener noreferrer" className="underline">
            {ressource.name}
          </a>
        </h2>
      </div>
      <div className="flex">
        <div className="cursor-pointer hover:underline"><ArrowUpIcon className="h-6 opacity-50 hover:opacity-100" /></div>
      </div>
    </section>
  )
}