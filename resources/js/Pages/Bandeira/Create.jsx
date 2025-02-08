import { Head, useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'

export default function Create({ gruposEconomicos, userId }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    nome: '',
    grupo_economico_id: '',
    userId: userId,
  })

  const submit = e => {
    e.preventDefault()

    post(route('bandeiras.store'), {
      data: {
        nome: data.nome,
        grupo_economico_id: data.grupo_economico_id,
        userId: userId,
      },
    })
  }

  return (
    <div className="h-screen flex justify-center items-center bg-zinc-400">
      <Head title="Criar Bandeira" />
      <div className="bg-white p-10 space-y-5">
        <h2 className="text-2xl font-semibold text-center">Criar Bandeira</h2>

        <form onSubmit={submit} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="nome">Nome da bandeira</label>
            <TextInput
              id="nome"
              value={data.nome}
              onChange={e => setData('nome', e.target.value)}
              required
              className="focus:border-orange-400 focus:border-2 focus:ring-0 mb-3"
            />
            {errors.nome && <div className="text-red-500">{errors.nome}</div>}
            <label htmlFor="grupo_economico_id">Grupo Econômico</label>
            <select
              id="grupo_economico_id"
              value={data.grupo_economico_id}
              onChange={e => setData('grupo_economico_id', e.target.value)}
              className="border-zinc-300 rounded-md focus:border-orange-400 focus:border-2 focus:ring-0"
              required
            >
              <option value="">Selecione um Grupo Econômico</option>
              {gruposEconomicos.map(grupo => (
                <option key={grupo.id} value={grupo.id}>
                  {grupo.nome}
                </option>
              ))}
            </select>
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
          <a href="/bandeiras" className="">
            Voltar
          </a>
        </div>
      </div>
    </div>
  )
}
