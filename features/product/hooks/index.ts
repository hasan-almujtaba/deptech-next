import { useQuery } from '@tanstack/react-query'

import { getProductDetailRequest, getProductRequest } from 'features/product'

export const useGetProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: getProductRequest,
  })

type TUseCategoryParams = {
  id: number
}
export const useGetProduct = (params: TUseCategoryParams) =>
  useQuery({
    queryKey: ['product', params.id],
    queryFn: () => getProductDetailRequest(params.id),
    enabled: params.id !== null,
  })
