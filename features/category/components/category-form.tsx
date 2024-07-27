import { DevTool } from '@hookform/devtools'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Textarea } from 'components/ui/textare'
import { useQueryActions } from 'hooks'

import { storeCategoryRequest } from '../apis'
import { TCategoryForm } from '../types'

export const CategoryForm = () => {
  const formMethods = useForm<TCategoryForm>({
    defaultValues: {
      name: '',
      description: '',
    },
  })
  const { handleSubmit, control } = formMethods

  const { push } = useRouter()

  const { invalidateQueries } = useQueryActions(['categories'])
  const { mutate } = useMutation({
    mutationFn: (data: TCategoryForm) => storeCategoryRequest(data),
    onSuccess: () => {
      invalidateQueries()
      toast.success('Successfully added category')
      push('/dashboard/category')
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
