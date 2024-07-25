import Head from 'next/head'

import { AuthLayout } from 'components/layouts'
import { LoginForm } from 'features/auth'
import { NextPageWithLayout } from 'types'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <LoginForm />
    </>
  )
}

Home.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default Home
