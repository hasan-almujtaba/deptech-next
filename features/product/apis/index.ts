import axios, { AxiosError } from 'axios'

import { axiosInstance } from 'apis'

import { TProductRequest } from '../types'

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

export const getProductDetailRequest = async (id: number) => {
  try {
    const { data } = await axiosInstance.get(`/products/${id}`)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null
    }
  }
}

export const storeProductRequest = async (dataRequest: TProductRequest) => {
  try {
    const formData = new FormData()
    formData.append('name', dataRequest.name)
    formData.append('description', dataRequest.description)
    formData.append('categoryId', dataRequest.categoryId.toString())
    formData.append('stock', dataRequest.stock.toString())
    formData.append('image', dataRequest.image ?? '')

    const { data } = await axiosInstance.post('/products', formData)

    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorStringified = JSON.stringify(error.response?.data.errors)

      throw errorStringified
    }
  }
}

export const updateProductRequest = async (dataRequest: TProductRequest) => {
  try {
    const formData = new FormData()
    formData.append('name', dataRequest.name)
    formData.append('description', dataRequest.description)
    formData.append('categoryId', dataRequest.categoryId.toString())
    formData.append('stock', dataRequest.stock.toString())
    if (dataRequest.image) formData.append('image', dataRequest.image ?? '')

    const { data } = await axiosInstance.put(
      `/products/${dataRequest.id}`,
      formData
    )

    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorStringified = JSON.stringify(error.response?.data.errors)

      throw errorStringified
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
