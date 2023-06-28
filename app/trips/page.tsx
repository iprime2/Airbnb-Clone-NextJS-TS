import { ClientOnly } from '@/components'
import EmptyState from '@/components/EmptyState'

import getCurrentUser from '@/actions/getCurrentuser'
import getReservations from '@/actions/getReservations'

import React from 'react'
import TripsClient from './TripsClient'

const TripPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No trips found'
          subtitle='You have not made any reservations!'
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default TripPage
