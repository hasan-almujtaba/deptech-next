import { useMutation } from '@tanstack/react-query'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { useQueryActions } from 'hooks'

import { updateProfileRequest } from '../apis'
import { useGetProfile } from '../hooks'
import { TUpdateProfileRequest } from '../types'

export const ProfileForm = () => {
  const { data } = useGetProfile()
  const user = data.data

  const { invalidateQueries } = useQueryActions(['profile'])
  const { mutate } = useMutation({
    mutationFn: (data: TUpdateProfileRequest) => updateProfileRequest(data),
    onSuccess: () => {
      invalidateQueries()
    },
  })

  const methods = useForm<TUpdateProfileRequest>({
    defaultValues: {
      id: user.id,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  })
  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<TUpdateProfileRequest> = (data) => {
    mutate(data)
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
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            variant="destructive"
            className="w-40"
          >
            Cancel
          </Button>

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
