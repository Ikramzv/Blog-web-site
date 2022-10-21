import axios from 'axios';
import { motion } from 'framer-motion';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NoResults from '../components/NoResults';
import Post from '../components/Post';
import usePostsStore from '../store/postsStore';
import { PostType } from '../types/Post';
import { findChanged } from '../utils';

interface HomeProps {
  posts: PostType[]
}

const Home: NextPage<HomeProps> = ({posts}) => {
  const [currentPosts , setCurrentPosts] = useState(posts)
  const [lastFilteredPosts, setLastFilteredPosts] = useState<PostType[]>([])
  const router = useRouter()
  const { posts: storedPosts, setPosts } = usePostsStore()

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
      setLastFilteredPosts(data)
      return data
    } catch (error) {
      Promise.reject(error)
    }
  }
  
  useEffect(() => {
    setPosts(posts)
  } , [])

  useEffect(() => {
    if(Object.keys(router.query).length > 0) {
      const findChangedPosts = findChanged(lastFilteredPosts,storedPosts)
      setCurrentPosts(findChangedPosts)
    } else {
      setCurrentPosts(storedPosts)
    }
  } , [storedPosts])
  
  useEffect(() => {
    filterPostsByQuery()
  } , [router.query])
  
  return (
    <motion.div
        key={'initial_feed_displaying'}
        className='flex flex-col gap-10 videos h-full' 
        initial={{y:-100 ,scale:0,opacity:0}}
        animate={{y:0,opacity:1,scale:1,transitionDuration: '100ms'}}
      >
      {currentPosts.length > 0 ? currentPosts.map((post) => (
        <Post post={post} key={post._id} />
      )) : <NoResults text={'There is no Posts'} />}
    </motion.div>
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
