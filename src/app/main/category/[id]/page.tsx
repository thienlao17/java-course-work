'use client'

import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import useGetAllCategories from '@/entities/category/use-get-all-categories'
import useGetProductsByCategory from '@/entities/product/use-get-products-by-category'
import useCartStore from '@/states/cart-store'
import { toast } from 'sonner'

export default function CategoryPage({ params }: { params: { id: number } }) {
  const { data } = useGetProductsByCategory(params.id)
  const { data: categories } = useGetAllCategories()
  const foundObject = categories?.find((obj) => obj.id === Number(params.id))
  const addToCart = useCartStore((state) => state.addToCart)
  const handleAddToCart = (product) => {
    addToCart(product) // Добавляем объект data в корзину при нажатии на кнопку
    toast('Продукт добавлен в корзину.')
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4   lg:max-w-7xl lg:px-8">
        <Breadcrumb className="pb-10">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/main">Главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/main">Категории</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{foundObject?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h2 className="sr-only">Продукты в категории {foundObject?.title}</h2>
        <div className="mx-auto max-w-2xl px-4  lg:max-w-7xl lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">
            {foundObject?.title}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {data?.map((product) => (
              <div key={product.id}>
                <Link href={`/main/products/${product.id}`}>
                  <div className="relative">
                    <div className="relative h-72 w-full overflow-hidden rounded-lg">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="size-full object-cover object-center"
                      />
                    </div>
                    <div className="relative mt-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {product.title}
                      </h3>
                    </div>
                    <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                      />
                      <p className="relative text-lg font-semibold text-white">
                        {product.price}$
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="mt-6">
                  <a
                    onClick={() => handleAddToCart(product)}
                    href="#"
                    className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                  >
                    Add to bag
                    <span className="sr-only">, {product.title}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
