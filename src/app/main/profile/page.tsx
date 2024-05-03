'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import useGetAllOrders from '@/entities/order/use-get-all-orders'

export default function ProfilePage() {
  const session = useSession()
  const { data, error } = useGetAllOrders()
  useEffect(() => {
    console.log('zakaz')
    console.log(data)
  }, [data])
  return (
    <div className=" size-full  p-5 px-32">
      <div className="flex size-full flex-col gap-10   rounded-2xl">
        <p className="text-5xl font-extrabold">Личный кабинет</p>
        <p className="text-2xl font-bold">
          Логин пользователя: {session?.data?.user?.email}
        </p>
        <p>Заказы:</p>
      </div>
    </div>
  )
}
