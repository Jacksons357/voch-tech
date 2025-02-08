import { Link } from '@inertiajs/react'

export default function CardResume({ nome, quantidade, href }) {
  return (
    <div className="bg-white w-[800px] rounded-md shadow-xl">
      <div className="p-5 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">{nome}</h1>
        </div>

        <div className="flex gap-1 items-center">
          <h1 className="text-sm">Quantidade:</h1>
          <span className="border border-orange-600 px-2 rounded-full">
            {quantidade}
          </span>
        </div>

        <Link
          href={href}
          className="underline hover:text-orange-600 transition-all"
        >
          Ver mais
        </Link>
      </div>
    </div>
  )
}
