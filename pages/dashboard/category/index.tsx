import Head from 'next/head'

import { DashboardLayout } from 'components/layouts'
import { CategoryTable } from 'features/category'
import { NextPageWithLayout } from 'types'

const Category: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Category</title>
      </Head>

      <div className="divide-y divide-white/5">
        <CategoryTable />
      </div>
    </>
  )
}

Category.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Category
