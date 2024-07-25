import Head from 'next/head'

import { DashboardLayout } from 'components/layouts'
import { ProfileForm } from 'features/auth'
import { NextPageWithLayout } from 'types'

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div className="divide-y divide-white/5">
        <ProfileForm />
      </div>
    </>
  )
}

Dashboard.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Dashboard
