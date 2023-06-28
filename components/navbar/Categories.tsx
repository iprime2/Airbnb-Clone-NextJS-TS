import { FC } from 'react'
import Container from '../Container'

import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
import { categories } from '@/constants'

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = ({}) => {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()
  const isMainPage = pathname === '/'

  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <div className='pt-4 flex items-center justify-between overflow-x-auto'>
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories
