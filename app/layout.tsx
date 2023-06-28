import {
  ClientOnly,
  Navbar,
  RegisterModal,
  LoginModal,
  RentModal,
} from '@/components'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from '@/providers/ToasterProvider'
import getCurrentUser from '@/actions/getCurrentuser'

const inter = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RentModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  )
}
