import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { keys } from 'config'
import { Layout } from 'types'

export const AuthLayout = ({ children }: Layout) => {
  const token = Cookies.get(keys.localStorage)

  const { push } = useRouter()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      push('/dashboard')
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  if (loading) {
    return <div>...loading</div>
  }

  return <div>{children}</div>
}
