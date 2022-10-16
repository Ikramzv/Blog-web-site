import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NoResults from '../components/NoResults';
import Post from '../components/Post';
import usePostsStore from '../store/postsStore';
import { PostType } from '../types/Post';

interface HomeProps {
  posts: PostType[]
}

const Home: NextPage<HomeProps> = ({posts}) => {
  const [currentPosts , setCurrentPosts] = useState(posts)
  const router = useRouter()
  const { posts: storedPosts, setPosts } = usePostsStore()

  useEffect(() => {
    setPosts(posts)
  } , [])

  useEffect(() => {
    setCurrentPosts(storedPosts)
  } , [storedPosts])
  
  useEffect(() => {
    const filterPostsByQuery = async() => {
      if(Object.keys(router.query).length === 0) {
        setCurrentPosts(posts)
        setPosts(posts)
        return
      }
      try {
        const searchParams = router.asPath.split('?')[1]
        const { data } = await axios.get(`http://localhost:3000/api/filter?${searchParams}`)
        setCurrentPosts(data)
        return data
      } catch (error) {
        Promise.reject(error)
      }
    }
    filterPostsByQuery()
  } , [router.query])
  
  return (
    <div className='flex flex-col gap-10 videos h-full' >
      {currentPosts.length > 0 ? currentPosts.map((post) => (
        <Post post={post} key={post._id} />
      )) : <NoResults text={'There is no Posts'} />}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async({  }) => {
  const { data } = await axios.get('http://localhost:3000/api/post')
  return {
    props: {
      posts: data
    },
  }
}

export default Home;