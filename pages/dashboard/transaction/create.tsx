import Head from 'next/head'

import { DashboardLayout } from 'components/layouts'
import { TransactionForm } from 'features/transaction'
import { NextPageWithLayout } from 'types'

const TransactionCreate: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Transaction Create</title>
      </Head>

      <div className="divide-y divide-white/5">
        <TransactionForm />
      </div>
    </>
  )
}

TransactionCreate.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default TransactionCreate
