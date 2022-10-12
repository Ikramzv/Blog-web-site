import { GetServerSideProps } from 'next';
import { createClient } from 'next-sanity';
type Comments = {
  comment: string
}
type Posts = {
  caption: string
  comments: Comments[]
  likes: {_ref: string}[]
  topic: string
  userId: string
  video: {asset: { _ref: string }}
  _createdAt: string
  _id: string
  _updatedAt: string
}

interface HomeProps {
  posts: Posts[]
}

function Home({posts}: HomeProps) {
  return <div className='text-red-500 font-bold text-lg'>Hello world</div>;
}

const client = createClient({
  projectId: 'hp58fg4f',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2022-10-11',
})

export const getServerSideProps: GetServerSideProps = async() => {
  const posts = await client.fetch(`*[_type == 'post']`)
  return {
    props: {
      posts
    }
  }
}

export default Home;
