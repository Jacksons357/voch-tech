import { useState, useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'

export default function Edit({ grupoEconomico }) {
  const { id } = grupoEconomico
  const { data, setData, put, processing, errors } = useForm({
    nome: grupoEconomico.nome || '',
  })

  useEffect(() => {
    setData('nome', grupoEconomico.nome)
  }, [grupoEconomico.nome])

  const handleSubmit = e => {
    e.preventDefault()
    put(`/grupos-economicos/${id}`, data, {
      onSuccess: () => {},
      onError: err => {
        console.error('Erro ao atualizar grupo econômico', err)
      },
    })
  }

  return (
    <div className="flex h-screen bg-zinc-400 justify-center items-center">
      <div className="bg-white p-5 rounded-sm shadow-xl flex flex-col space-y-5">
        <h2 className="text-center text-2xl">Editar Grupo Econômico</h2>
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
              className="focus:border-orange-400 focus:border-2 focus:ring-0"
            />
          </div>
          <button
            type="submit"
            disabled={processing}
            className="bg-orange-400 w-full rounded-sm py-3"
          >
            {processing ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </div>
  )
}
