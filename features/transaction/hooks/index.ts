import { useQuery } from '@tanstack/react-query'

import { getTransactionRequest } from '../apis'

export const useGetTransactions = () =>
  useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactionRequest,
  })
