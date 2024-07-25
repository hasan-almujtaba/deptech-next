import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { keys } from 'config'
import { Layout } from 'types'

export const AuthLayout = ({ children }: Layout) => {
  const [value] = useLocalStorage(keys.localStorage, '')
  const { push, pathname } = useRouter()

  useEffect(() => {
    if (value) {
      if (pathname === '/login') {
        push('/dashboard')
      }
    } else {
      if (pathname !== '/login') {
        push('/login')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, pathname])

  // Render loading indicator if user is authenticated but still loading
  // if (isLoading) {
  //   return <p>loading...</p>
  // }

  // Render the children (login page) only if the user is not authenticated
  if (!value && pathname === '/login') {
    return <div>{children}</div>
  }

  // Render nothing while redirecting
  return null
}
