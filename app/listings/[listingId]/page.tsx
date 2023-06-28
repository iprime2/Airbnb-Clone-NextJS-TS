import getCurrentUser from '@/actions/getCurrentuser'
import getListingById from '@/actions/getListingById'
import { ClientOnly } from '@/components'
import EmptyState from '@/components/EmptyState'
import ListingClient from './ListingClient'
import getReservations from '@/actions/getReservations'

interface IParams {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()
  const reservations = await getReservations(params)

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  )
}

export default ListingPage
