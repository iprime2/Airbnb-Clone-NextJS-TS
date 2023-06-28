import getCurrentUser from '@/actions/getCurrentuser'
import getReservations from '@/actions/getReservations'
import { ClientOnly } from '@/components'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import ReservationsClient from './ReservationClient'

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No reservations found'
          subtitle='There is no reservation for your properties'
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ReservationsPage
