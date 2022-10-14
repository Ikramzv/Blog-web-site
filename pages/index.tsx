import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import NoResults from '../components/NoResults';
import Post from '../components/Post';
import { PostType } from '../types/Post';

interface HomeProps {
  posts: PostType[]
}

const Home: NextPage<HomeProps> = ({posts}) => {
  console.log(posts)
  return (
    <div className='flex flex-col gap-10 videos h-full' >
      {posts.length > 0 ? posts.map((post) => (
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
