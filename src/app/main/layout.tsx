import MainHeader from '@/components/MainHeader'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  )
}
