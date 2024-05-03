'use client'

import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Fragment } from 'react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import useGetAllCategories from '@/entities/category/use-get-all-categories'
import useCartStore from '@/states/cart-store'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function MainHeader() {
  const session = useSession()
  const { data } = useGetAllCategories()
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)
  const handleClearCart = () => {
    clearCart() // Очищаем корзину при нажатии на кнопку
    toast('Корзина очищена')
  }

  return (
    <Popover className="relative z-40 bg-transparent">
      <div className="flex items-center justify-between p-6 md:justify-start md:space-x-10">
        <div>
          <Link href="/main">
            <p className="text-3xl font-bold">Better</p>
          </Link>
        </div>
        <div className="-my-2 -mr-2 md:hidden">
          <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="size-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <Popover.Group as="nav" className="flex space-x-10">
            <a
              href="/main/products"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Продукты
            </a>
            <Popover className="relative ">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group inline-flex items-center rounded-md  pr-10 text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    )}
                  >
                    <span>Категории</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 px-2 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {data?.map((item) => (
                            <a
                              key={item.title}
                              href={`/main/category/${item.id}`}
                              className="-m-3 block rounded-md p-3 hover:bg-gray-50"
                            >
                              <p className="text-base font-medium text-gray-900">
                                {item.title}
                              </p>
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>

          <div className="flex items-center md:ml-12">
            {!session?.data && (
              <>
                <a
                  href="/signup"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign up
                </a>
                <a
                  href="/api/auth/signin"
                  className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Sign in
                </a>
              </>
            )}

            {session?.data && (
              <>
                <Link href="/main/profile" className="mr-5">
                  {session.data.user?.email}
                </Link>

                <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
                  <Popover.Button className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cart.length}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Panel className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                      <h2 className="sr-only">Shopping Cart</h2>

                      <form className="mx-auto max-w-2xl px-4">
                        <ul role="list" className="divide-y divide-gray-200">
                          {cart.map((product) => (
                            <li
                              key={product?.id}
                              className="flex items-center py-6"
                            >
                              <img
                                src={product?.imageUrl}
                                alt={product?.imageAlt}
                                className="size-16 flex-none rounded-md border border-gray-200"
                              />
                              <div className="ml-4 flex-auto">
                                <h3 className="font-medium text-gray-900">
                                  <a href={product?.href}>{product?.title}</a>
                                </h3>
                              </div>
                            </li>
                          ))}
                        </ul>

                        <p className="mt-6 text-center">
                          <a
                            href="/main/cart"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Посмотреть корзину
                          </a>
                          <a
                            onClick={handleClearCart}
                            className="mt-5 block w-full cursor-pointer rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                          >
                            Очистить
                          </a>
                        </p>
                      </form>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </>
            )}
            {session?.data && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                    SignOut
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Вы уверены, что хотите выйти?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => signOut({ callbackUrl: '/main' })}
                    >
                      Продолжить
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>
    </Popover>
  )
}
