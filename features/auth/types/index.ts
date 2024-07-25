export type TLoginRequest = {
  email: string
  password: string
}

export type TUpdateProfileRequest = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  gender: string
  dateOfBirth: string
}
