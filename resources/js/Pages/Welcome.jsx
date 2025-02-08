import { Head, Link } from '@inertiajs/react'

export default function Welcome({ auth }) {
  return (
    <>
      <Head title="Home" />
      <div className="bg-zinc-400 h-screen">
        <header className="py-5 flex justify-around bg-zinc-100 items-center shadow-xl">
          <div className="text-black">Logo</div>
          <nav className="flex gap-4  ">
            {auth.user ? (
              <Link href={route('dashboard.index')} className="">
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href={route('login')}
                  className="bg-orange-400 p-3 rounded-sm text-white"
                >
                  Acessar
                </Link>
                <Link
                  href={route('register')}
                  className="p-3 rounded-sm border border-orange-400 text-orange-400"
                >
                  Registrar
                </Link>
              </>
            )}
          </nav>
        </header>
      </div>
    </>
  )
}
