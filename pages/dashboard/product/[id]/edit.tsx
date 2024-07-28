import Head from 'next/head'

import { DashboardLayout } from 'components/layouts'
import { EditProductForm } from 'features/product'
import { NextPageWithLayout } from 'types'

const ProductEdit: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Product Edit</title>
      </Head>

      <div className="divide-y divide-white/5">
        <EditProductForm />
      </div>
    </>
  )
}

ProductEdit.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default ProductEdit
