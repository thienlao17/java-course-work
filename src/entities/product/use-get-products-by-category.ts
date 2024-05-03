'use client'

import { useQuery } from '@tanstack/react-query'

import getProductsByCategory from '@/entities/product/get-products-by-category'

const useGetProductsByCategory = (categoryId: number) =>
  useQuery({
    queryFn: async () => getProductsByCategory(categoryId ?? ''),
    queryKey: ['productsByCategory', categoryId],
  })

export default useGetProductsByCategory
