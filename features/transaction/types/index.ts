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

export type TTransactionForm = {
  type: {
    label: string
    value: 'STOCK_IN' | 'STOCK_OUT'
  }
  item: {
    productId: { label: string; value: number }
    quantity: number
  }[]
}

export type TTransactionRequest = {
  type: 'STOCK_IN' | 'STOCK_OUT'
  items: {
    productId: number
    quantity: number
  }[]
}
