import create from 'zustand'

export interface UserProfile {
  id: number
  email: string
  password: string
  token: string
  role: {
    id: number
    title: string
  }
  orders: any[] // Замените any на тип ваших заказов, если у вас есть типизация
}

interface CurrentUserStore {
  currentUser: UserProfile | null
  setCurrentUser: (newUser: UserProfile) => void
  clearCurrentUser: () => void
  updateUser: (updatedUser: Partial<UserProfile>) => void
}

const useCurrentUserStore = create<CurrentUserStore>((set) => ({
  currentUser: null,

  setCurrentUser: (newUser) => set({ currentUser: newUser }),

  clearCurrentUser: () => set({ currentUser: null }),

  updateUser: (updatedUser) =>
    set((state) => ({
      currentUser: state.currentUser
        ? { ...state.currentUser, ...updatedUser }
        : null,
    })),
}))

export default useCurrentUserStore
