import { useState, useEffect } from 'react'
import { Head, useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'

export default function Edit({ colaborador, unidades }) {
  const { id } = colaborador
  const { data, setData, put, processing, errors } = useForm({
    razao: colaborador.razao,
    email: colaborador.email,
    cpf: colaborador.cpf,
    unidade_id: colaborador.unidade_id,
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setData('nome', colaborador.nome)
    setData('email', colaborador.email)
    setData('cpf', colaborador.cpf)
    setData('unidade_id', colaborador.unidade_id)
  }, [colaborador])

  const handleSubmit = e => {
    e.preventDefault()
    put(`/colaboradores/${id}`, data, {
      onSuccess: () => {},
      onError: err => {
        console.error('Erro ao atualizar colaborador', err)
      },
    })
  }

  return (
    <div className="flex h-screen bg-zinc-400 justify-center items-center">
      <Head title="Editar Colaborador" />
      <div className="bg-white p-5 rounded-sm shadow-xl flex flex-col space-y-5 w-[400px]">
        <h2 className="text-center text-2xl">Editar Colaborador</h2>
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
              <label htmlFor="nome">Nome Colaborador</label>
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
              <label htmlFor="unidade_id">Unidade</label>
              <select
                id="unidade_id"
                value={data.unidade_id}
                onChange={e =>
                  setData('unidade_id', Number.parseInt(e.target.value))
                }
                className="border-zinc-300 rounded-md focus:border-orange-400 focus:border-2 focus:ring-0"
                required
              >
                <option value="">Selecione a unidade</option>
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
