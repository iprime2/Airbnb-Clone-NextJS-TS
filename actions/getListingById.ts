import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

interface IParams {
  listingId?: string
}

export default async function GET(params: IParams) {
  try {
    const { listingId } = params

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    })

    if (!listing) {
      return null
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.createdAt.toISOString(),
        updatedAt: listing.createdAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    }
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}
