import Head from 'next/head'

import { DashboardLayout } from 'components/layouts'
import { CategoryForm } from 'features/category'
import { NextPageWithLayout } from 'types'

const CategoryCreate: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Category Create</title>
      </Head>

      <div className="divide-y divide-white/5">
        <CategoryForm />
      </div>
    </>
  )
}

CategoryCreate.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default CategoryCreate
