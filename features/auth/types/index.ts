export type TLoginRequest = {
  email: string
  password: string
}

export type TUpdateProfileForm = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  gender: {
    label: string
    value: string
  }
  dateOfBirth: string
}

type OmitGender = Omit<TUpdateProfileForm, 'gender'>

export type TUpdateProfileRequest = OmitGender & {
  gender: string
}
