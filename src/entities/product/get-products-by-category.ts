'use server'

import { ProductType } from '@/entities/product/product-type'

const getProductsByCategory = async (
  categoryId: number
): Promise<ProductType[]> => {
  const response = await fetch(
    `http://localhost:8080/api/product/byCategory/${categoryId}`,
    {
      method: 'GET',
    }
  )
  if (!response.ok) throw new Error('Can not access data')
  return response.json()
}

export default getProductsByCategory
