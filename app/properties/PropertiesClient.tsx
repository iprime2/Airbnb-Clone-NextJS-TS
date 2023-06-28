'use client'

import { Container, Heading } from '@/components'
import { SafeListings, SafeUser } from '@/types'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useState } from 'react'

import axios from 'axios'
import { toast } from 'react-hot-toast'
import ListingCard from '@/components/listings/ListingCard'

interface PropertiesClientProps {
  listings: SafeListings[]
  currentUser: SafeUser
}

const PropertiesClient: FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Deleted')
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
      <Heading title='Properties' subtitle='Your listed properties' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6'>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId == listing.id}
            actionLabel='Delete Properties'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default PropertiesClient
