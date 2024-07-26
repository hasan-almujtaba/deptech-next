import { useQuery } from '@tanstack/react-query'

import { getCategoryRequest } from '../api'

export const useGetCategory = () =>
  useQuery({
    queryKey: ['category'],
    queryFn: getCategoryRequest,
  })
