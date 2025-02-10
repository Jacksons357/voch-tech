import { Head, Link } from '@inertiajs/react'
import { FaGithub } from 'react-icons/fa'

export default function Welcome({ auth }) {
  return (
    <>
      <Head title="Home" />
      <div className="bg-zinc-400 h-screen flex flex-col items-center justify-center space-y-12">
        <header className="fixed top-0 w-full py-5 flex justify-around bg-zinc-100 items-center shadow-xl">
          <div className="text-black">
            <img src="logo.png" alt="logo da voch tech" width={200} />
          </div>
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
        <h1 className="text-4xl text-white font-semibold mb-10">
          Processo Seletivo VOCH TECH
        </h1>
        <div className="flex gap-10">
          <div className="">
            <h2 className="text-2xl">Tecnologias Utilizadas</h2>
            <div className="flex flex-col">
              <li>PHP</li>
              <li>Laravel</li>
              <li>Docker</li>
              <li>MySQL</li>
              <li>React</li>
              <li>Tailwind CSS</li>
            </div>
          </div>
          <div className="bg-white p-5 rounded-md w-[300px] space-y-5 shadow-lg">
            <h1 className="text-center font-semibold">
              Você pode criar conta ou acessar uma existente:
            </h1>
            <p className="text-sm">
              <span className="font-semibold">Email</span>: voch@tech.com
            </p>
            <p className="text-sm">
              <span className="font-semibold">Senha</span>: 12345678
            </p>
          </div>
        </div>
        <a
          href="https://github.com/Jacksons357/voch-tech"
          target="_blank"
          className="bg-orange-500 px-4 py-2 rounded-sm text-white flex items-center gap-3 hover:bg-orange-500/80 transition-all"
          rel="noreferrer"
        >
          <FaGithub />
          Acesse o repositorio no github
        </a>
      </div>
    </>
  )
}
