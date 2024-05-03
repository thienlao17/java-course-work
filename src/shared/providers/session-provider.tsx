'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'

import QueryProvider from '@/shared/providers/query-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>{children}</QueryProvider>
    </SessionProvider>
  )
}
