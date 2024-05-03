import { useQuery } from '@tanstack/react-query'

import getAllOrders from '@/entities/order/get-all-orders'

const useGetAllOrders = () =>
  useQuery({
    queryFn: async () => getAllOrders(),
    queryKey: ['orders'],
  })

export default useGetAllOrders
