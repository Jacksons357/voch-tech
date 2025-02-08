import TextInput from '@/Components/TextInput'

export default function Colaboradores({ colaboradores, unidades, filtros }) {
  return (
    <div className="h-screen flex justify-center items-center bg-zinc-400">
      <div className="bg-white p-6 rounded-md shadow-xl">
        <div className="flex gap-3">
          <TextInput
            type="text"
            placeholder="Filtrar por nome"
            className="focus:border-orange-400 focus:border-2 focus:ring-0"
          />
          <button
            type="button"
            className="bg-orange-400 px-4 text-white font-semibold rounded-sm"
          >
            Filtrar
          </button>
          <button
            type="button"
            className="border border-orange-400 px-4 rounded-sm text-orange-500"
          >
            Exportar
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Unidade</th>
              <th>Criado em</th>
            </tr>
          </thead>
          <tbody>
            {colaboradores.map(colaborador => (
              <tr key={colaborador.id}>
                <td>{colaborador.id}</td>
                <td>{colaborador.nome}</td>
                <td>{colaborador.email}</td>
                <td>{colaborador.cpf}</td>
                <td>{colaborador.unidade}</td>
                <td>{new Date(colaborador.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
