import { useState, useEffect } from 'react'
import { Head, useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'

export default function Edit({ unidade, bandeiras }) {
  const { id } = unidade
  const { data, setData, put, processing, errors } = useForm({
    razao_social: unidade.razao_social,
    nome_fantasia: unidade.nome_fantasia,
    cnpj: unidade.cnpj,
    bandeira_id: unidade.bandeira_id,
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setData('nome_fantasia', unidade.nome_fantasia)
    setData('razao_social', unidade.razao_social)
    setData('cnpj', unidade.cnpj)
    setData('bandeira_id', unidade.bandeira_id)
  }, [unidade])

  const handleSubmit = e => {
    e.preventDefault()
    put(`/unidades/${id}`, data, {
      onSuccess: () => {},
      onError: err => {
        console.error('Erro ao atualizar grupo econômico', err)
      },
    })
  }

  return (
    <div className="flex h-screen bg-zinc-400 justify-center items-center">
      <Head title="Editar Unidade" />
      <div className="bg-white p-5 rounded-sm shadow-xl flex flex-col space-y-5 w-[400px]">
        <h2 className="text-center text-2xl">Editar Unidade</h2>
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
                value={data.cnpj}
                onChange={e => setData('cnpj', e.target.value)}
                required
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
            {processing ? 'Salvando...' : 'Salvar Alterações'}
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
