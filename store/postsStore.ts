import create from "zustand";
import { PostType } from "../types/Post";

type PostsStoreType = {
    posts: PostType[]
    setPosts: any
    setLiked: any
}



const usePostsStore = create<PostsStoreType>((set) => ({
    posts: [],
    setPosts: (posts: PostType[]) => set({ posts } , false),
    setLiked: (userId: string , postId: string) => {
        set(state => {
            let post = state.posts.find(p => p._id === postId)
            if(!post.likes.some(like => like._ref === userId)) {
                post = { ...post , likes: [...post.likes, { _ref: userId } ]}
            } else {
                post = { ...post , likes: post.likes.filter(like => like._ref !== userId) }
            }
            const updatedPosts = state.posts.map(p => p._id === post._id ? post : p)
            return {
                ...state,
                posts: updatedPosts
            }
        })
    }
}))

export default usePostsStore