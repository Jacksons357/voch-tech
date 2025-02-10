import { Head, useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'
import InputMask from 'react-input-mask'

export default function Create({ bandeiras }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    nome_fantasia: '',
    razao_social: '',
    cnpj: '',
    bandeira_id: '',
  })

  const submit = e => {
    e.preventDefault()

    post(route('unidades.store'), {
      data: {
        nome_fantasia: data.nome_fantasia,
        razao_social: data.razao_social,
        cnpj: data.cnpj,
        bandeira_id: data.bandeira_id,
      },
      onFinish: () => reset('nome'),
    })
  }

  const formatCNPJ = value => {
    return value
      .replace(/\D/g, '') // Remove tudo que não for número
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18) // Limita ao tamanho do CNPJ
  }

  const handleCNPJChange = e => {
    setData('cnpj', formatCNPJ(e.target.value))
  }

  return (
    <div className="h-screen flex justify-center items-center bg-zinc-400">
      <Head title="Criar Grupo Economico" />
      <div className="bg-white p-10 space-y-5 w-[400px]">
        <h2 className="text-2xl font-semibold text-center">Criar Unidade</h2>

        <form onSubmit={submit} className="space-y-5">
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col">
              <label htmlFor="nome_fantasia">Nome Fantasia</label>
              <TextInput
                id="nome_fantasia"
                value={data.nome_fantasia}
                onChange={e => setData('nome_fantasia', e.target.value)}
                required
                className="focus:border-orange-400 focus:border-2 focus:ring-0"
              />
              {errors.nome_fantasia && (
                <div className="text-red-500">{errors.nome_fantasia}</div>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="razao_social">Razão Social</label>
              <TextInput
                id="razao_social"
                value={data.razao_social}
                onChange={e => setData('razao_social', e.target.value)}
                required
                className="focus:border-orange-400 focus:border-2 focus:ring-0"
              />
              {errors.razao_social && (
                <div className="text-red-500">{errors.razao_social}</div>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="cnpj">CNPJ</label>

              <TextInput
                id="cnpj"
                required
                value={data.cnpj}
                onChange={handleCNPJChange}
                // onChange={e => setData('cnpj', formatCnpj(e.target.value))}
                className="focus:border-orange-400 focus:border-2 focus:ring-0"
              />

              {errors.cnpj && <div className="text-red-500">{errors.cnpj}</div>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="bandeira_id">Bandeira</label>
              <select
                id="bandeira_id"
                value={data.bandeira_id}
                onChange={e =>
                  setData('bandeira_id', Number.parseInt(e.target.value))
                }
                className="border-zinc-300 rounded-md focus:border-orange-400 focus:border-2 focus:ring-0"
                required
              >
                <option value="">Selecione a Bandeira</option>
                {bandeiras.map(bandeira => (
                  <option key={bandeira.id} value={bandeira.id}>
                    {bandeira.nome}
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
          <a href="/unidades" className="">
            Voltar
          </a>
        </div>
      </div>
    </div>
  )
}
