import { Field, Label, Input as HeadlessInput } from '@headlessui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { InputHTMLAttributes, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type TProps = {
  label: string
  errorMessage?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export const PasswordInput = (props: TProps) => {
  const { label, errorMessage, name = '', ...rest } = props

  const { register } = useFormContext()

  const [type, setType] = useState('password')

  const toggle = () => (type === 'text' ? setType('password') : setType('text'))

  return (
    <Field>
      <Label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </Label>
      <div
        className={twMerge(
          'flex h-9 rounded-md border px-0.5 py-1.5 shadow-sm ring-inset focus-within:ring-1 focus-within:ring-inset',
          errorMessage
            ? 'border-red-600 ring-red-600 focus:border-red-600 focus:ring-red-600'
            : 'border-gray-800 text-gray-900 ring-green-300 placeholder:text-gray-400 focus:ring-yellow-900'
        )}
      >
        <HeadlessInput
          type={type}
          className="h-full flex-1 rounded-md border-0 ring-0 focus:ring-0 focus:ring-transparent sm:text-sm sm:leading-6"
          {...register(name)}
          {...rest}
        ></HeadlessInput>

        <button
          className="mr-2.5"
          onClick={toggle}
          type="button"
        >
          {type === 'password' ? (
            <EyeIcon className="h-5 w-5" />
          ) : (
            <EyeSlashIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      {errorMessage && (
        <div className="pointer-events-none mt-1 flex items-center pr-3">
          {errorMessage}
        </div>
      )}
    </Field>
  )
}
