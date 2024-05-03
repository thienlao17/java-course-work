import { useQuery } from '@tanstack/react-query'

import getAllProducts from '@/entities/product/get-all-products'

const useGetAllProducts = () =>
  useQuery({
    queryFn: async () => getAllProducts(),
    queryKey: ['products'],
  })

export default useGetAllProducts
