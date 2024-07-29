import Head from 'next/head'

import { DashboardLayout } from 'components/layouts'
import { TransactionTable } from 'features/transaction'
import { NextPageWithLayout } from 'types'

const Transaction: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Transaction</title>
      </Head>

      <div className="divide-y divide-white/5">
        <TransactionTable />
      </div>
    </>
  )
}

Transaction.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Transaction
