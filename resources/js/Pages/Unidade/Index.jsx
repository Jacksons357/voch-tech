import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import dayjs from 'dayjs'
import { TiPlus } from 'react-icons/ti'
import { AgGridReact } from 'ag-grid-react'
import { useMemo, useState } from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'

ModuleRegistry.registerModules([AllCommunityModule])

import 'ag-grid-community/styles/ag-theme-alpine.css'
import { MdOutlineErrorOutline } from 'react-icons/md'

export default function Index({ unidades, bandeiras }) {
  const hasExistBandeira = bandeiras.some(item => item.nome)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleEdit = id => {
    const selectedGrupo = unidades.find(grupo => grupo.id === id)
    setSelectedItem(selectedGrupo)
    setShowEditModal(true)
  }

  const [rowData] = useState(
    unidades.map(grupo => ({
      dataCriacao: dayjs(grupo.created_at).format('DD/MM/YYYY'),
      nome_fantasia: grupo.nome_fantasia,
      bandeira: grupo.bandeira,
      razao_social: grupo.razao_social,
      cnpj: grupo.cnpj,
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
        headerName: 'Bandeira',
        field: 'bandeira',
      },
      {
        headerName: 'Nome Fantasia',
        field: 'nome_fantasia',
      },
      {
        headerName: 'Razão Social',
        field: 'razao_social',
      },
      {
        headerName: 'CNPJ',
        field: 'cnpj',
      },
      {
        headerName: 'Ações',
        field: 'editar',
        filter: false,
        cellRenderer: params => (
          <div className="flex  gap-2  items-center">
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
              href="/colaboradores"
              type="button"
            >
              Colaboradores
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
      router.delete(`/unidades/${selectedItem.id}`, {
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
    router.visit(`/unidades/${selectedItem.id}/edit`)
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
          Unidade
        </h2>
      }
    >
      <Head title="Unidade" />

      <div className="p-12">
        {hasExistBandeira ? (
          <Link
            href={route('unidades.create')}
            className="bg-orange-400 text-white p-3 rounded-sm flex w-max items-center gap-2"
          >
            <TiPlus />
            Criar Uma Nova Unidade
          </Link>
        ) : (
          <div className="flex items-center pl-5 gap-2">
            <p>Para criar uma unidade é necessário ter uma</p>
            <a
              href="/bandeiras"
              className="border border-white text-white p-2 flex items-center gap-2"
            >
              Bandeira
              <FaExternalLinkSquareAlt size={20} />
            </a>
          </div>
        )}

        <div
          className="ag-theme-alpine mt-8"
          style={{ height: 400, width: '100%' }}
        >
          {hasExistBandeira ? (
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
          ) : (
            <div className="flex justify-center mt-20 text-white flex-col items-center gap-2">
              <h1 className="text-2xl">Nenhuma unidade foi encontrada</h1>
              <MdOutlineErrorOutline size={100} />
              <p className="text-sm">Crie para exibir.</p>
            </div>
          )}
        </div>

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
