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
          'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6',
          errorMessage && 'border-red-600'
        )}
        {...rest}
        {...register(name)}
      ></HeadlessInput>

      {errors[name] && (
        <div className="pointer-events-none mt-1 flex items-center pr-3">
          {errors[name].message as string}
        </div>
      )}
    </Field>
  )
}
