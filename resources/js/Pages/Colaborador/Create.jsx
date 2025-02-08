import { Head, useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'

export default function Create({ unidades }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    nome: '',
    email: '',
    cpf: '',
    unidade_id: '',
  })

  const submit = e => {
    e.preventDefault()

    post(route('colaboradores.store'), {
      data: {
        nome: data.nome,
        email: data.email,
        cpf: data.cpf,
        unidade_id: data.unidade_id,
      },
      onFinish: () => reset('nome'),
    })
  }

  return (
    <div className="h-screen flex justify-center items-center bg-zinc-400">
      <Head title="Criar Colaborador" />
      <div className="bg-white p-10 space-y-5 w-[400px]">
        <h2 className="text-2xl font-semibold text-center">
          Criar Colaborador
        </h2>

        <form onSubmit={submit} className="space-y-5">
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col">
              <label htmlFor="nome">Nome</label>
              <TextInput
                id="nome"
                value={data.nome}
                onChange={e => setData('nome', e.target.value)}
                required
                className="focus:border-orange-400 focus:border-2 focus:ring-0"
              />
              {errors.nome && <div className="text-red-500">{errors.nome}</div>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <TextInput
                id="email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                required
                className="focus:border-orange-400 focus:border-2 focus:ring-0"
              />
              {errors.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="cpf">CPF</label>
              <TextInput
                id="cpf"
                value={data.cpf}
                onChange={e => setData('cpf', e.target.value)}
                required
                className="focus:border-orange-400 focus:border-2 focus:ring-0"
              />
              {errors.cpf && <div className="text-red-500">{errors.cpf}</div>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="unidade_id">Bandeira</label>
              <select
                id="unidade_id"
                value={data.unidade_id}
                onChange={e =>
                  setData('unidade_id', Number.parseInt(e.target.value))
                }
                className="border-zinc-300 rounded-md focus:border-orange-400 focus:border-2 focus:ring-0"
                required
              >
                <option value="">Selecione a Bandeira</option>
                {unidades.map(unidade => (
                  <option key={unidade.id} value={unidade.id}>
                    {unidade.nome_fantasia} - {unidade.razao_social}
                  </option>
                ))}
              </select>
            </div>
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
          <a href="/colaboradores" className="">
            Voltar
          </a>
        </div>
      </div>
    </div>
  )
}
