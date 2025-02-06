import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { TiPlus } from 'react-icons/ti'

export default function Index({ gruposEconomicos }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Grupo Economico
        </h2>
      }
    >
      <Head title="Grupo Economico" />

      <div className="p-12">
        <Link
          href={route('grupos-economicos.create')}
          className="bg-orange-400 text-white p-3 rounded-sm flex w-max items-center gap-2"
        >
          <TiPlus />
          Criar Novo Grupo Econômico
        </Link>

        <div className="mt-8">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 text-left">Nome</th>
                <th className="border-b px-4 py-2 text-left">
                  Data de Criação
                </th>
              </tr>
            </thead>
            <tbody>
              {gruposEconomicos.map(grupo => (
                <tr key={grupo.id}>
                  <td className="border-b px-4 py-2">{grupo.nome}</td>
                  <td className="border-b px-4 py-2">{grupo.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
