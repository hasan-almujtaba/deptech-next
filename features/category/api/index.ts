import axios from 'axios'

import { axiosInstance } from 'apis'

import { TCategoryForm } from '../types'

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
    if (axios.isAxiosError(error)) {
      return null
    }
  }
}
