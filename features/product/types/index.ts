export type TProduct = {
  id: number
  name: string
  description: string
  stock: number
  image: string
  categoryId: number
}

export type TProductForm = {
  id?: number
  name: string
  description: string
  stock: number
  image?: File
  categoryId: {
    label: string
    value: unknown
  }
}

type OmitCategoryId = Omit<TProductForm, 'categoryId'>

export type TProductRequest = OmitCategoryId & {
  categoryId: number
}
