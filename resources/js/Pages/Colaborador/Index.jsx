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
import { FaDownload } from 'react-icons/fa'

ModuleRegistry.registerModules([AllCommunityModule])

import 'ag-grid-community/styles/ag-theme-alpine.css'
import { MdOutlineErrorOutline } from 'react-icons/md'

export default function Index({ colaboradores, unidades }) {
  const hasExistUnidade = unidades.some(item => item.id)
  const hasExistColaborador = colaboradores.some(item => item.nome)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleEdit = id => {
    const selectedGrupo = colaboradores.find(grupo => grupo.id === id)
    setSelectedItem(selectedGrupo)
    setShowEditModal(true)
  }

  const [rowData] = useState(
    colaboradores.map(colaborador => ({
      dataCriacao: dayjs(colaborador.created_at).format('DD/MM/YYYY'),
      unidade: colaborador.unidade,
      nome: colaborador.nome,
      email: colaborador.email,
      cpf: colaborador.cpf,
      id: colaborador.id,
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
        headerName: 'Unidade',
        field: 'unidade',
      },
      {
        headerName: 'Nome',
        field: 'nome',
      },
      {
        headerName: 'Email',
        field: 'email',
      },
      {
        headerName: 'CPF',
        field: 'cpf',
      },
      {
        headerName: 'Ações',
        field: 'editar',
        filter: false,
        cellRenderer: params => (
          <div className="flex  gap-5 items-end">
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
      router.delete(`/colaboradores/${selectedItem.id}`, {
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
    router.visit(`/colaboradores/${selectedItem.id}/edit`)
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
        <div className="flex justify-between px-5">
          {hasExistUnidade ? (
            <>
              <Link
                href={route('colaboradores.create')}
                className="bg-orange-400 text-white p-3 rounded-sm flex w-max items-center gap-2"
              >
                <TiPlus />
                Criar Um Novo Colaborador
              </Link>

              <a
                href="colaboradores/export"
                className="flex items-center border border-white text-white px-5 gap-2"
                target="__blank"
              >
                Gerar Relatório
                <FaDownload />
              </a>
            </>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <p>Para criar um colaborador é necessário ter uma</p>
              <a
                href="/unidades"
                className="border border-white text-white p-2 flex items-center gap-2"
              >
                Unidade
                <FaExternalLinkSquareAlt size={20} />
              </a>
            </div>
          )}
        </div>

        <div
          className="ag-theme-alpine mt-8"
          style={{ height: 400, width: '100%' }}
        >
          {hasExistColaborador ? (
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
              <h1 className="text-2xl">Nenhum colaborador encontrado</h1>
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
