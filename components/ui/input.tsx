import { Field, Label, Input as HeadlessInput } from '@headlessui/react'
import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type TProps = {
  label: string
  errorMessage?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = (props: TProps) => {
  const { label, name = '', errorMessage, ...rest } = props

  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Field>
      <Label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </Label>
      <HeadlessInput
        className={twMerge(
          'block w-full rounded-md py-1.5 shadow-sm ring-inset focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6',
          errorMessage
            ? 'border-red-600 ring-red-600 focus:border-red-600 focus:ring-red-600'
            : 'text-gray-900 ring-green-300 placeholder:text-gray-400 focus:border-gray-800 focus:ring-yellow-900'
        )}
        {...rest}
        {...register(name)}
      ></HeadlessInput>

      {errors[name] && (
        <div className="pointer-events-none mt-1 flex items-center pr-3 font-light text-red-600">
          {errors[name].message as string}
        </div>
      )}
    </Field>
  )
}
