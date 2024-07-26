import axios from 'axios'

import { axiosInstance } from 'apis'

import { TCategoryForm } from '../types'

export const getCategoryRequest = async () => {
  try {
    const { data } = await axiosInstance.get('/user')

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Access to config, request, and response

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
      // Access to config, request, and response

      return null
    }
  }
}
