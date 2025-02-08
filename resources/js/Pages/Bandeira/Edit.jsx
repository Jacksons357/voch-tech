import { useState, useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'

export default function Edit({ bandeira, gruposEconomicos }) {
  const { id } = bandeira
  const { data, setData, put, processing, errors } = useForm({
    nome: bandeira.nome || '',
    grupo_economico_id: bandeira.grupo_economico_id || '',
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setData('nome', bandeira.nome)
    setData('grupo_economico_id', bandeira.grupo_economico_id)
  }, [bandeira])

  const handleSubmit = e => {
    console.log(data)
    e.preventDefault()
    put(
      `/bandeiras/${id}`,
      {
        ...data,
        grupo_economico_id: Number(data.grupo_economico_id),
      },
      {
        onSuccess: () => {},
        onError: err => {
          console.error('Erro ao atualizar grupo econômico', err)
        },
      }
    )
  }

  return (
    <div className="flex h-screen bg-zinc-400 justify-center items-center">
      <div className="bg-white p-5 rounded-sm shadow-xl flex flex-col space-y-5">
        <h2 className="text-center text-2xl">Editar Bandeira</h2>
        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger">
            <ul>
              {Object.values(errors).map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex flex-col mb-5">
            <label htmlFor="nome">Novo nome</label>
            <TextInput
              id="nome"
              type="text"
              value={data.nome}
              onChange={e => setData('nome', e.target.value)}
              className="focus:border-orange-400 focus:border-2 focus:ring-0 mb-2"
            />
            <label htmlFor="grupo_economico_id">Grupo Econômico</label>
            <select
              id="grupo_economico_id"
              value={data.grupo_economico_id}
              onChange={e =>
                setData('grupo_economico_id', Number.parseInt(e.target.value))
              }
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
            {processing ? 'Salvando...' : 'Salvar Alterações'}
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
