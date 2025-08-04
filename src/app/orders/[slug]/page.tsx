import OrderDetailsPage from '@/components/order-details-page'
import React from 'react'

interface PageProps {
  params: { slug: string }
}

export default async function Page({ params }: PageProps) {
  return (
    <div>
      <OrderDetailsPage params={params} />
    </div>
  )
}


