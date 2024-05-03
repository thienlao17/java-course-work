'use server'

import { getServerSession } from 'next-auth'
import { z } from 'zod'

import action from '@/config/action-client'
import { authConfig } from '@/config/auth'

// Определяем схему для товара в корзине
const ProductInCartSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
  price: z.number(),
  quantity: z.number(),
  quantityInCart: z.number(),
  title: z.string(),
})

// Определяем схему для массива товаров в корзине
const ProductsInCartSchema = z.array(ProductInCartSchema)

// Создаем схему для аргумента функции createOrderAction
const CreateOrderActionSchema = z.function(
  ProductsInCartSchema,
  z.promise(z.unknown())
)

// Функция createOrderAction с типом схемы
const createOrderAction = action(CreateOrderActionSchema, async (products) => {
  const session = await getServerSession(authConfig)
  const productsInOrder = products.map((product) => ({
    id: product.id,
    quantityInCart: product.quantityInCart,
  }))

  const body = JSON.stringify({
    productsInOrder,
  })
  console.log('BODY')
  console.log(body)
  const response = await fetch(`http://localhost:8080/api/order`, {
    body,
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    method: 'POST',
  })
  console.log('Ответ заказы')
  console.log(response)
  if (!response.ok) throw new Error('Can not access data')
  return response.json()
})

export default createOrderAction
