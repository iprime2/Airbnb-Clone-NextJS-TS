'use client'

import Image from 'next/image'
import { FC } from 'react'

interface AvatarProps {
  src?: string | null | undefined
}

const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className='rounded-full'
      width={30}
      height={30}
      alt='Avatar'
      src={src ? src : '/images/placeholder.jpg'}
    />
  )
}

export default Avatar
