import Checkbox from '@/Components/Checkbox'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const submit = e => {
    e.preventDefault()

    post(route('login'), {
      onFinish: () => reset('password'),
    })
  }

  return (
    <GuestLayout>
      <Head title="Acessar" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full focus:border-orange-400 focus:border-2 focus:ring-0"
            autoComplete="username"
            isFocused={true}
            onChange={e => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full focus:border-orange-400 focus:border-2 focus:ring-0"
            autoComplete="current-password"
            onChange={e => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4 block">
          <label className="flex items-center" htmlFor="checkbox">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={e => setData('remember', e.target.checked)}
              id="checkbox"
              className="text-orange-400 focus:outline-orange-400 "
            />
            <span className="ms-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <PrimaryButton
          className="w-full flex justify-center mt-5 bg-orange-400 hover:bg-orange-500"
          disabled={processing}
        >
          Acessar
        </PrimaryButton>

        <div className="mt-4 flex items-center justify-between">
          <Link
            href={route('register')}
            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            Não sou cadastrado
          </Link>

          {/* {canResetPassword && (
            <Link
              href={route('password.request')}
              className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            >
              Esqueceu a senha?
            </Link>
          )} */}
        </div>
      </form>
    </GuestLayout>
  )
}
