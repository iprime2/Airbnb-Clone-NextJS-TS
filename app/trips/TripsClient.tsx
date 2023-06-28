'use client'

import { Container, Heading } from '@/components'
import { SafeReservations, SafeUser } from '@/types'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useState } from 'react'

import axios from 'axios'
import { toast } from 'react-hot-toast'
import ListingCard from '@/components/listings/ListingCard'

interface TripsClientProps {
  reservations: SafeReservations[]
  currentUser: SafeUser
}

const TripsClient: FC<TripsClientProps> = ({ reservations, currentUser }) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservations cancelled')
          router.refresh()
        })
        .catch((error) => {
          toast.error('Something went wrong')
          console.log(error)
        })
        .finally(() => {
          setDeletingId('')
        })
    },
    [router]
  )

  return (
    <Container>
      <Heading title='Trips' subtitle='Your upcoming and recent trips' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6'>
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId == reservation.id}
            actionLabel='Cancel Reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient
