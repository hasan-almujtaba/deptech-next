import { useQuery } from '@tanstack/react-query'

import { getUserRequest } from '../apis'

export const useGetProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: getUserRequest,
  })
