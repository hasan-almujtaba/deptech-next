import axios from 'axios'
import toast from 'react-hot-toast'

import { axiosInstance } from 'apis'
import { TLoginRequest, TUpdateProfileRequest } from 'features/auth'
// import {
//   TChangePasswordRequest,
//   TLoginRequest,
//   TRegisterRequest,
// } from 'features/auth'

export const getUserRequest = async () => {
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

export const loginRequest = async (request: TLoginRequest) => {
  try {
    const { data } = await axiosInstance.post('/login', request)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Access to config, request, and response
      toast.error(error.response?.data.message)

      throw new Error(error.response?.data.message)
    } else {
      // Just a stock error
    }
  }
}

export const logoutRequest = async () => {
  try {
    await axiosInstance.post('/logout')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Access to config, request, and response
      toast.error(error.response?.data.message)
    } else {
      // Just a stock error
    }
  }
}

// export const registerRequest = async (data: TRegisterRequest) => {
//   try {
//     await axiosInstance.post('/register', data)
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       // Access to config, request, and response
//       toast.error(error.response?.data.message)
//     } else {
//       // Just a stock error
//     }
//   }
// }

// export const changePasswordRequest = async (data: TChangePasswordRequest) => {
//   try {
//     const { data: response } = await axiosInstance.put('/change-password', data)

//     return response
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       // Access to config, request, and response
//       toast.error(error.response?.data.message)

//       throw new Error(error.response?.data.message)
//     } else {
//       // Just a stock error
//     }
//   }
// }

export const updateProfileRequest = async (request: TUpdateProfileRequest) => {
  try {
    const { data } = await axiosInstance.put('/update-profile', request)

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Access to config, request, and response
      // toast.error(error.response?.data.message)

      throw new Error(error.response?.data.message)
    } else {
      // Just a stock error
    }
  }
}
