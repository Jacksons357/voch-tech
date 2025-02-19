import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import dayjs from 'dayjs'
import { AgGridReact } from 'ag-grid-react'
import { useMemo, useState } from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'

ModuleRegistry.registerModules([AllCommunityModule])

export default function Index({ logs, users }) {
  const [rowData] = useState(
    logs.map(log => {
      const user = users.find(user => user.id === log.user_id)

      return {
        acoes: log.acoes,
        user: user ? user.name : 'Usuario não encontrado',
        model: log.model,
        updated_at: dayjs(log.dados.updated_at).format('DD/MM/YYYY'),
        dataCriacao: dayjs(log.created_at).format('DD/MM/YYYY'),
        id: log.id,
      }
    })
  )

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Data',
        field: 'dataCriacao',
        filter: 'agDateColumnFilter',
      },
      {
        headerName: 'Entidade',
        field: 'model',
      },
      {
        headerName: 'Usuario',
        field: 'user',
      },
      {
        headerName: 'Ação',
        field: 'acoes',
        cellRenderer: params => {
          const traducao = {
            create: 'Criado',
            update: 'Atualizado',
            delete: 'Deletado',
          }

          const styles = {
            create:
              'border border-green-500 bg-green-200 px-4 py-2 text-sm font-semibold rounded-sm text-green-700',
            update:
              'border border-yellow-500 bg-yellow-200 px-4 py-2 text-sm font-semibold rounded-sm text-yellow-700',
            delete:
              'border border-red-500 bg-red-200 px-4 py-2 text-sm font-semibold rounded-sm text-red-700',
          }

          const acionandoTraducao = traducao[params.value] || 'Desconhecido'
          const acoesEstilos = styles[params.value] || 'text-gray-600'

          return <span className={acoesEstilos}>{acionandoTraducao}</span>
        },
      },
      {
        headerName: 'Data de atualização',
        field: 'updated_at',
      },
    ],
    []
  )

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Auditoria
        </h2>
      }
    >
      <Head title="Auditoria" />

      <div className="p-12">
        <div
          className="ag-theme-alpine mt-8"
          style={{ height: 500, width: '100%' }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{
              sortable: false,
              filter: true,
              floatingFilter: true,
            }}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 25, 50]}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
