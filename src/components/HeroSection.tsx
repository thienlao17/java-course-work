'use client'

import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
} from '@heroicons/react/20/solid'
import Autoplay from 'embla-carousel-autoplay'

import Banner from '@/components/Banner'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

const features = [
  {
    name: 'Защита устройства',
    description: 'Лучшая защита для вашей новой техники',
    icon: LockClosedIcon,
  },
  {
    name: 'Доставка',
    description: 'Быстро и удобно',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Быстрая оплата',
    description: 'Доступна оплата в 2 клика',
    icon: ArrowPathIcon,
  },
]

export default function HeroSection() {
  const product = {
    name: 'Название продукта',
    price: '$19.99',
    image: 'путь_к_изображению.jpg',
  }
  return (
    <div>
      <h1 className="bg-transparent pb-10 pt-5 text-center text-4xl font-bold tracking-tight text-gray-900">
        Хиты продаж
      </h1>
      <Carousel
        className="text-Black size-full bg-transparent "
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="flex ">
          <CarouselItem className="py-4z flex items-center justify-center">
            <div className="flex size-full items-center justify-center bg-transparent">
              <Banner
                name={product.name}
                price={product.price}
                image={product.image}
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex size-full items-center justify-center bg-transparent">
              <Banner
                name={product.name}
                price={product.price}
                image={product.image}
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex  size-full items-center justify-center bg-transparent">
              <Banner
                name={product.name}
                price={product.price}
                image={product.image}
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="pt-5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className=" text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Наши преимущества
            </p>
          </div>
          <div className="mx-auto  mt-8 max-w-2xl lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center justify-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon
                      className="size-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col justify-center text-center leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
