import { ClientOnly } from '@/components'
import EmptyState from '@/components/EmptyState'
import getCurrentUser from '@/actions/getCurrentuser'
import React from 'react'
import PropertiesClient from './PropertiesClient'
import getListings from '@/actions/getListings'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientOnly>
    )
  }

  const listings = await getListings({
    userId: currentUser.id,
  })

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No Properties found'
          subtitle='You have not listed any properties!'
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default PropertiesPage
