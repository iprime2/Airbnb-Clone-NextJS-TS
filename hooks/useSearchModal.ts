import { create } from 'zustand'

import { FC } from 'react'

interface SearchModalProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useSearchModal = create<SearchModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useSearchModal
