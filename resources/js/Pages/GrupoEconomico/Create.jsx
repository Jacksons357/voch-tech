import { Head, useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'

export default function Create() {
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
    <div className="h-screen flex justify-center items-center bg-zinc-400">
      <Head title="Criar Grupo Economico" />
      <div className="bg-white p-10 space-y-5">
        <h2 className="text-2xl font-semibold text-center">
          Criar Grupo Econômico
        </h2>

        <form onSubmit={submit} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="nome">Nome do grupo</label>
            <TextInput
              id="nome"
              value={data.nome}
              onChange={e => setData('nome', e.target.value)}
              required
              className="focus:border-orange-400 focus:border-2 focus:ring-0"
            />
            {errors.nome && <div className="text-red-500">{errors.nome}</div>}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="bg-orange-400 w-full rounded-sm py-3"
          >
            Criar
          </button>
        </form>
        <div className="flex justify-end">
          <a href="/dashboard" className="">
            Voltar
          </a>
        </div>
      </div>
    </div>
  )
}
