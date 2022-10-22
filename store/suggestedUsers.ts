import create from 'zustand'
import { PostedBy } from '../types/Post'

interface StoreInterface {
    suggestedUsers: PostedBy[]
    setSuggestedUsers(users: PostedBy[]): void
}

export const useSuggestedUsersStore = create<StoreInterface>((set,get) => ({
    suggestedUsers: [],
    setSuggestedUsers: (data: PostedBy[]) =>  set(state => ({...state,suggestedUsers: data}))
}))