import { create } from 'zustand'

import { FC } from 'react'

interface RegisterModalProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useRegisterModal = create<RegisterModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useRegisterModal
