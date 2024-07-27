import { useMutation } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Textarea } from 'components/ui/textare'
import { useQueryActions } from 'hooks'

import { updateCategoryRequest } from '../apis'
import { useGetCategory } from '../hooks'
import { TCategoryForm } from '../types'

const DevTool: React.ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false }
)

export const EditCategoryForm = () => {
  const { query } = useRouter()

  const { data } = useGetCategory({ id: Number(query.id) })
  const category = data?.data

  const formMethods = useForm<TCategoryForm>()
  const { handleSubmit, control, setValue, setError } = formMethods

  useEffect(() => {
    if (category) {
      setValue('id', category.id)
      setValue('name', category.name)
      setValue('description', category.description)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  const { push } = useRouter()

  const { invalidateQueries } = useQueryActions(['categories'])
  const { mutate } = useMutation({
    mutationFn: (data: TCategoryForm) => updateCategoryRequest(data),
    onSuccess: () => {
      invalidateQueries()
      toast.success('Successfully updated category')
      push('/dashboard/category')
    },
    onError: (error: unknown) => {
      let parsedErrors
      if (typeof error === 'string') {
        try {
          parsedErrors = JSON.parse(error)
        } catch {
          toast.error('An unexpected error occurred')
          return
        }
      } else {
        parsedErrors = error
      }

      if (parsedErrors && typeof parsedErrors === 'object') {
        for (const [key, value] of Object.entries(parsedErrors)) {
          setError(key as never, {
            type: 'manual',
            message: value as never,
          })
        }
      } else {
        toast.error('An unexpected error occurred')
      }
    },
  })

  const onSubmit = (data: TCategoryForm) => {
    mutate(data)
  }

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Category
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Recusandae, est!
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <Input
                    label="Name"
                    name="name"
                  />
                </div>

                <div className="col-span-4">
                  <Textarea
                    name="description"
                    label="Description"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="submit"
              className="w-40"
            >
              Save
            </Button>
          </div>
        </form>
      </FormProvider>

      <DevTool control={control} />
    </>
  )
}
