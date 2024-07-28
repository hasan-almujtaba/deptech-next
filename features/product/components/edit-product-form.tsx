import { PhotoIcon } from '@heroicons/react/20/solid'
import { DevTool } from '@hookform/devtools'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Select } from 'components/ui/select'
import { Textarea } from 'components/ui/textare'
import { TCategory, useGetCategories } from 'features/category'
import { useQueryActions } from 'hooks'

import { updateProductRequest } from '../apis'
import { useGetProduct } from '../hooks'
import { TProductForm, TProductRequest } from '../types'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const EditProductForm = () => {
  const { query } = useRouter()
  const { data: productData } = useGetProduct({ id: Number(query.id) })
  const product = productData?.data

  const { data } = useGetCategories()
  const categories = data?.data
  const formattedCategories = categories?.map((item: TCategory) => ({
    label: item.name,
    value: item.id,
  }))

  const formMethods = useForm<TProductForm>()
  const { handleSubmit, control, setValue } = formMethods

  useEffect(() => {
    if (product) {
      setValue('id', product.id)
      setValue('name', product.name)
      setValue('stock', product.stock)
      setValue(
        'categoryId',
        formattedCategories?.find(
          (item: typeof formattedCategories) =>
            item.value === product.categoryId
        )
      )
      setValue('description', product.description)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const [file, setFile] = useState<File>()

  const { push } = useRouter()

  const { invalidateQueries } = useQueryActions(['products'])
  const { mutate } = useMutation({
    mutationFn: (data: TProductRequest) => updateProductRequest(data),
    onSuccess: () => {
      invalidateQueries()
      toast.success('Successfully updated product')
      push('/dashboard/product')
    },
  })

  const onSubmit = (data: TProductForm) => {
    mutate({
      ...data,
      image: file,
      categoryId: data.categoryId.value as number,
    })
  }

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Product
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

                <div className="sm:col-span-3">
                  <Input
                    label="Stock"
                    name="stock"
                    type="number"
                  />
                </div>

                <div className="sm:col-span-full">
                  <Select
                    label="Category"
                    options={formattedCategories}
                    name="categoryId"
                  />
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {product?.image && !file ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={baseUrl + '/uploads/' + product?.image}
                          alt="Uploaded image"
                          className="mx-auto h-12 w-20"
                        />
                      ) : (
                        <PhotoIcon
                          aria-hidden="true"
                          className="mx-auto h-12 w-12 text-gray-300"
                        />
                      )}
                      <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          <span>Click here to upload the new image</span>
                          <input
                            id="file-upload"
                            name="image"
                            type="file"
                            className="sr-only"
                            onChange={(e) => {
                              setFile(e.target.files?.[0])
                            }}
                          />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        {file
                          ? file.name
                          : baseUrl + '/uploads/' + product?.image}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
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
