import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useGetProfile } from 'features/auth'
import { Layout } from 'types'

export const AuthLayout = ({ children }: Layout) => {
  const { push } = useRouter()

  const { data, isLoading } = useGetProfile()
  const user = data?.data

  useEffect(() => {
    if (user) {
      push('/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading])

  if (isLoading) {
    return <div>...loading</div>
  }

  if (!user) {
    return <div>{children}</div>
  }

  return null
}
