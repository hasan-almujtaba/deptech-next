import { useQuery } from '@tanstack/react-query'

import { getCategoryDetailRequest, getCategoryRequest } from '../apis'

export const useGetCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: getCategoryRequest,
  })

type TUseCategoryParams = {
  id: number
}
export const useGetCategory = (params: TUseCategoryParams) =>
  useQuery({
    queryKey: ['category', params.id],
    queryFn: () => getCategoryDetailRequest(params.id),
    enabled: params.id !== null,
  })
