import React from 'react'
import Link from 'next/link'

interface Product {
  name: string
  price: string
  image: string
}

const Banner: React.FC<Product> = ({ name, price, image }) => (
  <Link href="/">
    <div className=" m-3 flex items-center rounded-md p-5 shadow-md">
      <img src={image} className="mr-4 h-64 w-64" alt={name} />
      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600">{price}</p>
      </div>
    </div>
  </Link>
)

export default Banner
