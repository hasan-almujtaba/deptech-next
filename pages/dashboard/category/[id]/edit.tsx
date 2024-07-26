import Head from 'next/head'

import { DashboardLayout } from 'components/layouts'
import { EditCategoryForm } from 'features/category'
import { NextPageWithLayout } from 'types'

const CategoryEdit: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Category Edit</title>
      </Head>

      <div className="divide-y divide-white/5">
        <EditCategoryForm />
      </div>
    </>
  )
}

CategoryEdit.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default CategoryEdit
