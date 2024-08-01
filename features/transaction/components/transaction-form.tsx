import { DevTool } from '@hookform/devtools'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'

import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Select } from 'components/ui/select'
import { TProduct, useGetProducts } from 'features/product'
import {
  storeTransactionRequest,
  TTransactionForm,
  TTransactionRequest,
} from 'features/transaction'

const typeOptions = [
  {
    label: 'In',
    value: 'STOCK_IN',
  },
  {
    label: 'Out',
    value: 'STOCK_OUT',
  },
]

const initialProduct = {
  label: '',
  value: 0,
}

export const TransactionForm = () => {
  const { data } = useGetProducts()
  const products = data?.data
  const formattedProducts = products?.map((item: TProduct) => ({
    label: item.name,
    value: item.id,
  }))

  const formMethods = useForm<TTransactionForm>()
  const { handleSubmit, control } = formMethods
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'item',
    rules: {
      required: true,
    },
  })

  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationFn: (data: TTransactionRequest) => storeTransactionRequest(data),
    onSuccess: () => {
      push('/dashboard/transaction')
    },
  })

  const onSubmit: SubmitHandler<TTransactionForm> = (data) => {
    const requestData = {
      type: data.type.value,
      items: data.item.map((item) => ({
        productId: item.productId.value,
        quantity: +item.quantity,
      })),
    }

    mutate(requestData)
  }

  return (
    <>
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
                    name="type"
                    label="Transaction type"
                    options={typeOptions}
                  />
                </div>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid gap-x-6 gap-y-8 sm:col-span-full sm:grid-cols-6"
                  >
                    <div className="sm:col-span-3">
                      <Select
                        name={`item.${index}.productId` as const}
                        options={formattedProducts}
                        label="Product"
                        className="mt-0.5"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <Input
                        label="Quantity"
                        name={`item.${index}.quantity` as const}
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={() => remove(index)}
                    >
                      Remove Item
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="button"
              className="w-40"
              onClick={() =>
                append({
                  productId: initialProduct,
                  quantity: 0,
                })
              }
            >
              Add Item
            </Button>

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
