import axios from 'axios'

import { axiosInstance } from 'apis'

import { TTransactionRequest } from '../types'

export const getTransactionRequest = async () => {
  try {
    const { data } = await axiosInstance.get('/transactions')

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null
    }
  }
}

export const storeTransactionRequest = async (
  requestData: TTransactionRequest
) => {
  try {
    const { data } = await axiosInstance.post('/transactions', requestData)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // toast.error(error.response?.data)
    }
  }
}
