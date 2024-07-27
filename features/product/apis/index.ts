import axios from 'axios'

import { axiosInstance } from 'apis'

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
