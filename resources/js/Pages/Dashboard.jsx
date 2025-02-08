import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'

export default function Dashboard(props) {
  const { post, reset } = useForm({
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
