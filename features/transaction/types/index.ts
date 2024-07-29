import { TProduct } from 'features/product'

export type TTransaction = {
  id: number
  type: 'in' | 'out'
  amount: number
  products: TProduct[]
  items: {
    id: number
    productId: number
    transactionId: number
    quantity: number
    product: Product
  }[]
}

export type Product = {
  id: number
  name: string
  description: string
  image: string
  stock: number
  categoryId: number
  transactionId: null
}
