'use client'

import useCountries from '@/hooks/useCountries'
import { SafeUser } from '@/types'
import { FC } from 'react'
import Heading from '../Heading'
import Image from 'next/image'
import HeartButton from '../HeartButton'
import ListingInfo from './ListingInfo'

interface ListingHeadProps {
  title: string
  imageSrc: string
  locationValue: string
  id: string
  currentUser?: SafeUser | null
}

const ListingHead: FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries()

  const location = getByValue(locationValue)
  console.log(imageSrc)

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image
          alt='Image'
          src={imageSrc}
          fill
          className='object-cover w-full'
        />
        <div className='absolute top-5 right-5'>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

export default ListingHead
