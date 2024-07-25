/* eslint-disable @next/next/no-img-element */

import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import * as yup from 'yup'

import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { PasswordInput } from 'components/ui/password-input'
import { keys } from 'config'
import { TLoginRequest, loginRequest } from 'features/auth'

type Inputs = {
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
})

export const LoginForm = () => {
  const formMethods = useForm<Inputs>({ resolver: yupResolver(schema) })
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods

  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationFn: (data: TLoginRequest) => loginRequest(data),
    onSuccess: (data) => {
      Cookies.set(keys.localStorage, data.token)
      push('/dashboard')
    },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data)
  }

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=slate&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <FormProvider {...formMethods}>
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                label="Email"
                name="email"
                errorMessage={errors.email?.message}
              />

              <PasswordInput
                label="Password"
                name="password"
                errorMessage={errors.password?.message}
              />

              <Button
                className="w-full"
                type="submit"
              >
                Login
              </Button>
            </form>
          </FormProvider>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link
              href="/register"
              className="font-semibold leading-6 text-slate-600 hover:text-slate-500"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>

      <DevTool control={control} />
    </>
  )
}
