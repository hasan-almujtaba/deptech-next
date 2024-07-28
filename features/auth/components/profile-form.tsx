import { useMutation } from '@tanstack/react-query'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Select } from 'components/ui/select'
import { useQueryActions } from 'hooks'

import { updateProfileRequest } from '../apis'
import { useGetProfile } from '../hooks'
import { TUpdateProfileForm, TUpdateProfileRequest } from '../types'

const genderOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
]

export const ProfileForm = () => {
  const { data } = useGetProfile()
  const user = data.data

  const { invalidateQueries } = useQueryActions(['profile'])
  const { mutate } = useMutation({
    mutationFn: (data: TUpdateProfileRequest) => updateProfileRequest(data),
    onSuccess: () => {
      invalidateQueries()
      toast.success('Profile updated')
    },
  })

  const methods = useForm<TUpdateProfileForm>({
    defaultValues: {
      id: user.id,
      dateOfBirth: user.dateOfBirth,
      gender: genderOptions.find((item) => item.value === user.gender),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  })
  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<TUpdateProfileForm> = (data) => {
    mutate({ ...data, gender: data.gender.value })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet,
              possimus!
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Input
                  label="First name"
                  name="firstName"
                />
              </div>

              <div className="sm:col-span-3">
                <Input
                  label="Last name"
                  name="lastName"
                />
              </div>

              <div className="sm:col-span-3">
                <Input
                  label="Email address"
                  name="email"
                  type="email"
                />
              </div>

              <div className="sm:col-span-3">
                <Input
                  label="Date Of Birth"
                  name="dateOfBirth"
                  type="date"
                />
              </div>
              <div className="sm:col-span-3">
                <Select
                  label="Gender"
                  name="gender"
                  options={genderOptions}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            className="w-40"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
