import axios, { AxiosError } from 'axios'

import { axiosInstance } from 'apis'
import { TCategoryForm } from 'features/category'

export const getCategoryRequest = async () => {
  try {
    const { data } = await axiosInstance.get('/categories')

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null
    }
  }
}

export const getCategoryDetailRequest = async (id: number) => {
  try {
    const { data } = await axiosInstance.get(`/categories/${id}`)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null
    }
  }
}

export const storeCategoryRequest = async (dataRequest: TCategoryForm) => {
  try {
    const { data } = await axiosInstance.post('/categories', dataRequest)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null
    }
  }
}

export const updateCategoryRequest = async (dataRequest: TCategoryForm) => {
  try {
    const { data } = await axiosInstance.put('/categories', dataRequest)

    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorStringified = JSON.stringify(error.response?.data.errors)

      throw errorStringified
    }
  }
}

export const deleteCategoryRequest = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/categories/${id}`)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null
    }

    throw new Error('Unexpected Error')
  }
}
