import CardResume from '@/Components/CardResume'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

const cardData = {
  'Grupo Economico': {
    href: '/grupos-economicos',
    quantidade: 0,
  },
  'Bandeiras ': {
    quantidade: 0,
    href: '/bandeiras',
  },
  'Unidades ': {
    quantidade: 0,
    href: '/unidades',
  },
  'Colaboradores ': {
    quantidade: 0,
    href: '/colaboradores',
  },
}

export default function Dashboard(props) {
  const { gruposEconomicos, bandeiras, unidades, colaboradores } = props.data

  cardData['Grupo Economico'].quantidade = gruposEconomicos?.length || 0
  cardData['Bandeiras '].quantidade = bandeiras?.length || 0
  cardData['Unidades '].quantidade = unidades?.length || 0
  cardData['Colaboradores '].quantidade = colaboradores?.length || 0

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="p-12 flex flex-col gap-4 items-center">
        {/* TODO: Condicional para se não tiver nenhum item a mostrar */}
        {Object.entries(cardData).map(([nome, data]) => (
          <CardResume key={nome} nome={nome} {...data} />
        ))}
      </div>
    </AuthenticatedLayout>
  )
}
