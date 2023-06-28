import getCurrentUser from '@/actions/getCurrentuser'
import getListings, { IListingParams } from '@/actions/getListings'
import { ClientOnly, Container } from '@/components'
import EmptyState from '@/components/EmptyState'
import ListingCard from '@/components/listings/ListingCard'

interface HomeProps {
  searchParams: IListingParams
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {listings.map((listing) => {
            return (
              <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home
