import Dropdown from '@/Components/Dropdown'
import NavLink from '@/Components/NavLink'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'
import { Link, usePage } from '@inertiajs/react'
import { useState } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'

export default function AuthenticatedLayout({ header, children }) {
  const user = usePage().props.auth.user

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false)

  return (
    <div className="min-h-screen bg-zinc-400">
      <nav className="border-b border-gray-100 bg-zinc-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                  href={route('dashboard.index')}
                  active={route().current('dashboard.index')}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  href={route('grupos-economicos.index')}
                  active={route().current('grupos-economicos.index')}
                >
                  Grupo Econômico
                </NavLink>
                <NavLink
                  href={route('bandeiras.index')}
                  active={route().current('bandeiras.index')}
                >
                  Bandeiras
                </NavLink>
                <NavLink
                  href={route('unidades.index')}
                  active={route().current('unidades.index')}
                >
                  Unidades
                </NavLink>
                <NavLink
                  href={route('colaboradores.index')}
                  active={route().current('colaboradores.index')}
                >
                  Colaboradores
                </NavLink>
                {/* <NavLink
                  href={route('relatorios.colaboradores')}
                  active={route().current('relatorios.colaboradores')}
                >
                  Relatório Colaboradores
                </NavLink> */}
              </div>
            </div>

            <div className="hidden sm:ms-6 sm:flex sm:items-center">
              <div className="relative ms-3">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                      >
                        {user.name}

                        <RiArrowDropDownLine size={25} />
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    {/* <Dropdown.Link href={route('profile.edit')}>
                      Perfil
                    </Dropdown.Link> */}
                    <Dropdown.Link
                      href={route('logout')}
                      method="post"
                      as="button"
                    >
                      Sair
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="bg-orange-300 shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      <main>{children}</main>
    </div>
  )
}
