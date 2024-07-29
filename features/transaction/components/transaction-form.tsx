import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from 'components/ui/button'
import { Select } from 'components/ui/select'
import { storeCategoryRequest, TCategoryForm } from 'features/category'
import { TProduct, useGetProducts } from 'features/product'
import { useQueryActions } from 'hooks'

const typeOptions = [
  {
    label: 'In',
    value: 'in',
  },
  {
    label: 'Out',
    value: 'out',
  },
]

export const TransactionForm = () => {
  const formMethods = useForm<TCategoryForm>({
    defaultValues: {
      name: '',
      description: '',
    },
  })
  const { handleSubmit } = formMethods
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

  const { data } = useGetProducts()
  const products = data?.data
  const productOptions = products?.map((item: TProduct) => ({
    label: item.name,
    value: item.id,
  }))

  const onSubmit = (data: TCategoryForm) => {
    mutate(data)
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Transaction
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Recusandae, est!
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Select
                  label="Type"
                  name="type"
                  options={typeOptions}
                />
              </div>

              <div className="sm:col-span-3">
                <Select
                  label="Product"
                  name="product"
                  options={productOptions}
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
  )
}
