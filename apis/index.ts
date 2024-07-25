import axios from 'axios'
import cookie from 'js-cookie'

import { keys } from 'config'

const baseURL = process.env.NEXT_PUBLIC_API_URL

export const axiosInstance = axios.create({
  baseURL,
})

axiosInstance.interceptors.request.use((config) => {
  const token = cookie.get(keys.localStorage)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
