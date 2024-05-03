'use server'
import { OrderType } from '@/entities/order/order-type'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/config/auth'

const getAllOrders = async (): Promise<OrderType[]> => {
  const session = await getServerSession(authConfig)
  const response = await fetch(
    `http://localhost:8080/api/order/byuser/${session.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      method: 'GET',
    }
  )
  if (!response.ok) throw new Error('Can not access data')
  return response.json()
}

export default getAllOrders
