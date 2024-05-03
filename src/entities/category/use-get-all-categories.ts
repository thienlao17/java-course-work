import { useQuery } from '@tanstack/react-query'

import getAllCategories from '@/entities/category/get-all-categories'

const useGetAllCategories = () =>
  useQuery({
    queryFn: async () => getAllCategories(),
    queryKey: ['categories'],
  })

export default useGetAllCategories
