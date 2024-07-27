import axios from 'axios'

import { axiosInstance } from 'apis'

import { TProductForm } from '../types'

export const getProductRequest = async () => {
  try {
    const { data } = await axiosInstance.get('/products')

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null
    }
  }
}

export const storeProductRequest = async (dataRequest: TProductForm) => {
  try {
    const formData = new FormData()
    formData.append('name', dataRequest.name)
    formData.append('description', dataRequest.description)
    formData.append('stock', dataRequest.stock as any)
    formData.append('image', dataRequest.image as any)

    const { data } = await axiosInstance.post('/products', formData)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null
    }
  }
}

export const deleteProductRequest = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/products/${id}`)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null
    }

    throw new Error('Unexpected Error')
  }
}
