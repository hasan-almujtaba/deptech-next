import Head from 'next/head'

import { DashboardLayout } from 'components/layouts'
import { ProductTable } from 'features/product'
import { NextPageWithLayout } from 'types'

const Product: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Product</title>
      </Head>

      <div className="divide-y divide-white/5">
        <ProductTable />
      </div>
    </>
  )
}

Product.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Product
