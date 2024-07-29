import axios from 'axios'

import { axiosInstance } from 'apis'

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
