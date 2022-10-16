import create from "zustand";
import { PostType } from "../types/Post";

type PostsStoreType = {
    posts: PostType[]
    setPosts: any
}



const usePostsStore = create<PostsStoreType>((set) => ({
    posts: [],
    setPosts: (posts: PostType[]) => set({ posts } , false)
}))

export default usePostsStore