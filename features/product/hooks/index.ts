import { useQuery } from '@tanstack/react-query'

import { getProductRequest } from 'features/product'

export const useGetProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: getProductRequest,
  })
