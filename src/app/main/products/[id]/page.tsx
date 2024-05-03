import ProductPageInfo from '@/components/ProductPageInfo'

export default function ProductPage({ params }: { params: { id: number } }) {
  return <ProductPageInfo params={params} />
}
