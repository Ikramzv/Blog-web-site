import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Image from "next/image"
import { useEffect, useState } from 'react'
import Post from "../../components/Post"
import ProfileDetails from "../../components/profile/ProfileDetails"
import usePostsStore from "../../store/postsStore"
import { PostedBy, PostType } from "../../types/Post"
import client from "../../utils/client"
import { singleUserQuery } from '../../utils/queries'

export interface Details {
  posts: PostType[] , 
  totalPosts: number, 
  totalLikes: number , 
  totalComments: number
}

interface Props {
  user: PostedBy & Details
  mostLikedPostOfUser: PostType
}

const Profile: NextPage<Props> = ({ user, mostLikedPostOfUser }) => {
  const { posts: storedPosts , setPosts } = usePostsStore()
  const [details, setDetails] = useState<Omit<Details , 'posts'>>({
    totalPosts: 0,
    totalComments: 0,
    totalLikes: 0
  })

  useEffect(() => {
    setPosts(user.posts)
  } , [])

  useEffect(() => {
    function computeDetails() {
      const updated = storedPosts.reduce((initial , item) => {
        return {
          totalComments: initial.totalComments + item.comments.length,
          totalLikes: initial.totalLikes + item.likes.length,
          totalPosts: initial.totalPosts + 1
        }
      } , {totalPosts: 0,totalComments: 0,totalLikes: 0})
      setDetails(updated)
    }
    computeDetails()
  } , [storedPosts])

  return (
    <div className="flex flex-col h-[88vh] gap-2 bg-gray-50 px-2 lg:px-4 rounded-md">
      <div className="-z-40 fixed left-0 top-0 right-0 bottom-0">
        <Image
          src={mostLikedPostOfUser.image.asset.url}
          layout={'fill'}
        />
        <div className="absolute left-0 top-0 bottom-0 right-0 bg-white opacity-50" ></div>
      </div>
      <div className="flex-[1.5] grid gap-y-3 grid-rows-2 md:grid-rows-1 grid-cols-3 md:grid-cols-6 py-2 px-4 -mx-2 lg:-mx-4" >
        <ProfileDetails user={user} details={details} />
      </div>
      <div className="flex-[6] overflow-y-auto pb-10 sm:pb-5 " >
        {storedPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async({}) => {
  const users: PostedBy[] = await client.fetch(`*[_type == "user"]`)
  const paths = users.map(user => ({
    params: {
      userId: user._id
    }
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async({ params }) => {
  const { userId } = params
  const query = singleUserQuery(userId)
  const user: PostedBy & { posts: PostType[] } = await client.fetch(query)
  const mostLikedPostOfUser = [...user.posts].sort((a,b) => b.likes.length - a.likes.length)[0]
  return {
    props: {
      user,
      mostLikedPostOfUser
    }
  }
}

export default Profile