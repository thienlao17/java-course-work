'use client'

import { CheckIcon } from '@heroicons/react/24/outline'

import useGetCurrentProduct from '@/entities/product/use-get-current-product'
import useCartStore from '@/states/cart-store'
import { toast } from 'sonner'

export default function ProductPageInfo({
  params,
}: {
  params: { id: number }
}) {
  const { data, error } = useGetCurrentProduct(params.id)
  const addToCart = useCartStore((state) => state.addToCart)
  const handleAddToCart = () => {
    addToCart(data) // Добавляем объект data в корзину при нажатии на кнопку
    toast('Продукт добавлен в корзину.')
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {data?.title}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">${data?.price}</p>
            </div>
            <div className="mt-6 flex items-center">
              <CheckIcon
                className="size-5 shrink-0 text-green-500"
                aria-hidden="true"
              />
              {data?.quantity === 0 ? (
                <p className="ml-2 text-sm text-red-500">Out of stock</p>
              ) : (
                <p className="ml-2 text-sm text-gray-500">
                  In stock: {data?.quantity}
                </p>
              )}
            </div>
          </section>
          <button
            onClick={handleAddToCart}
            type="submit"
            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Add to bag
          </button>
        </div>

        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
            <img
              src={data?.imageUrl}
              alt={data?.title}
              className="size-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
