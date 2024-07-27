import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { Button } from 'components/ui/button'
import { useQueryActions } from 'hooks'

import { deleteCategoryRequest } from '../apis'

export type TProps = {
  id: number
}

export const CategoryTableAction = (props: TProps) => {
  const { id } = props

  const editUrl = `/dashboard/category/${id}/edit/`

  const { push } = useRouter()

  const confirmSwal = withReactContent(Swal)

  const { invalidateQueries } = useQueryActions(['categories'])
  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteCategoryRequest(id),
    onSuccess: () => {
      invalidateQueries()
      toast.success('Successfully delete category')

      push('/dashboard/category')
    },
  })

  const onDeleteClick = () => {
    confirmSwal
      .fire({
        title: 'Are you sure want to delete this item?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        confirmButtonText: 'Yes, delete it',
        confirmButtonColor: '#0f172a',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) mutate(id)
      })
  }

  return (
    <div className="flex justify-end gap-x-5">
      <Button
        className="w-40"
        asChild
      >
        <Link href={editUrl}>Edit</Link>
      </Button>

      <Button
        className="w-40"
        variant="destructive"
        onClick={onDeleteClick}
      >
        Delete
      </Button>
    </div>
  )
}
