'use client'

import { useQuery } from '@tanstack/react-query'

import getCurrentProduct from '@/entities/product/get-current-product'

const useGetCurrentProduct = (productId: number) =>
  useQuery({
    queryFn: async () => getCurrentProduct(productId ?? ''),
    queryKey: ['currentProduct', productId],
  })

export default useGetCurrentProduct
