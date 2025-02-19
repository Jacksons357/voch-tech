import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import dayjs from 'dayjs'
import { TiPlus } from 'react-icons/ti'
import { AgGridReact } from 'ag-grid-react'
import { useMemo, useState } from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
import { MdOutlineErrorOutline } from 'react-icons/md'

ModuleRegistry.registerModules([AllCommunityModule])

import 'ag-grid-community/styles/ag-theme-alpine.css'

export default function Index({ gruposEconomicos }) {
  const hasExistGruposEconomicos = gruposEconomicos.some(item => item.nome)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleEdit = id => {
    const selectedGrupo = gruposEconomicos.find(grupo => grupo.id === id)
    setSelectedItem(selectedGrupo)
    setShowEditModal(true)
  }

  const [rowData] = useState(
    gruposEconomicos.map(grupo => ({
      nome: grupo.nome,
      dataCriacao: dayjs(grupo.created_at).format('DD/MM/YYYY'),
      id: grupo.id,
    }))
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Data de Criação',
        field: 'dataCriacao',
        filter: 'agDateColumnFilter',
      },
      {
        headerName: 'Nome',
        field: 'nome',
      },
      {
        headerName: 'Ações',
        field: 'editar',
        filter: false,
        cellRenderer: params => (
          <div className="flex gap-3 items-center">
            <button
              className="text-blue-500"
              onClick={() => handleEdit(params.data.id)}
              type="button"
            >
              <FaEdit size={25} />
            </button>
            <button
              className="text-red-500"
              onClick={() => handleDelete(params.data)}
              type="button"
            >
              <FaTrash size={23} />{' '}
            </button>
            <Link
              className="bg-green-400 rounded-sm px-2 text-white"
              href="/bandeiras"
              type="button"
            >
              Bandeiras
            </Link>
          </div>
        ),
      },
    ],
    []
  )

  const handleDelete = item => {
    setSelectedItem(item)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    if (selectedItem) {
      router.delete(`/grupos-economicos/${selectedItem.id}`, {
        onSuccess: () => {
          setShowDeleteModal(false)
          router.visit(window.location.pathname, { replace: true })
        },
        onError: error => {
          console.error('Error deleting item:', error)
        },
      })
    }
  }

  const handleConfirmEdit = id => {
    console.log('Editing item:', selectedItem.id)
    router.visit(`/grupos-economicos/${selectedItem.id}/edit`)
    setShowEditModal(false)
  }

  const closeModal = () => {
    setShowDeleteModal(false)
    setShowEditModal(false)
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Grupo Economico
        </h2>
      }
    >
      <Head title="Grupo Economico" />

      <div className="p-12">
        <Link
          href={route('grupos-economicos.create')}
          className="bg-orange-400 text-white p-3 rounded-sm flex w-max items-center gap-2"
        >
          <TiPlus />
          Criar Novo Grupo Econômico
        </Link>

        {hasExistGruposEconomicos ? (
          <div
            className="ag-theme-alpine mt-8"
            style={{ height: 400, width: '100%' }}
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
        ) : (
          <div className="flex justify-center mt-20 text-white flex-col items-center gap-2">
            <h1 className="text-2xl">Nenhum grupo encontrado</h1>
            <MdOutlineErrorOutline size={100} />
            <p className="text-sm">Crie para exibir.</p>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold">
                Tem certeza que deseja apagar?
              </h3>
              <div className="mt-4 flex gap-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-sm"
                  onClick={handleConfirmDelete}
                  type="button"
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-sm"
                  onClick={closeModal}
                  type="button"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold">
                Tem certeza que deseja editar?
              </h3>
              <div className="mt-4 flex gap-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-sm"
                  onClick={handleConfirmEdit}
                  type="button"
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-sm"
                  onClick={closeModal}
                  type="button"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  )
}
