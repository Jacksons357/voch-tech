import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { TiPlus } from 'react-icons/ti'
import Index from './GrupoEconomico/Index'

export default function Dashboard(props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    nome: '',
  })

  const submit = e => {
    e.preventDefault()

    post(route('grupos-economicos.store'), {
      onFinish: () => reset('nome'),
    })
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div>Dashboard</div>
    </AuthenticatedLayout>
  )
}
