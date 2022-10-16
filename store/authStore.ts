import create from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
    username: string
    image: string
    _id: string
}

type Auth = {
    userProfile: User
    addUser: any
    logout: any
}

const authStore = (set: any): Auth => ({
    userProfile: null,
    addUser: (user: any) => set({ userProfile: user }),
    logout: () => set({ userProfile: null })
})

const useAuthStore = create(
    persist(authStore , {
        name: 'auth',
    })
)

export default useAuthStore