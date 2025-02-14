import Head from 'next/head'

import { DashboardLayout } from 'components/layouts'
import { AddProductForm } from 'features/product'
import { NextPageWithLayout } from 'types'

const ProductCreate: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Product Create</title>
      </Head>

      <div className="divide-y divide-white/5">
        <AddProductForm />
      </div>
    </>
  )
}

ProductCreate.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default ProductCreate
