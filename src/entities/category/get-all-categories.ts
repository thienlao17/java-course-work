'use server'

import { CategoryType } from '@/entities/category/category-type'

const getAllCategories = async (): Promise<CategoryType[]> => {
  const response = await fetch(`http://localhost:8080/api/category`, {
    method: 'GET',
  })
  if (!response.ok) throw new Error('Can not access data')
  return response.json()
}

export default getAllCategories
