'use server'

import { ProductType } from '@/entities/product/product-type'

const getCurrentProduct = async (productId: number): Promise<ProductType> => {
  const response = await fetch(
    `http://localhost:8080/api/product/${productId}`,
    {
      method: 'GET',
    }
  )
  if (!response.ok) throw new Error('Can not access data')
  return response.json()
}

export default getCurrentProduct
