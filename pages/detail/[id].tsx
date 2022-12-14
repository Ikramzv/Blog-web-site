import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Post from '../../components/Post'
import usePostsStore from '../../store/postsStore'
import { PostType } from '../../types/Post'
import client from '../../utils/client'
import { allPostsQuery, postDetailQuery } from '../../utils/queries'

interface DetailPropsType {
    post: PostType
}

const Detail = ({ post }: DetailPropsType) => {
    const router = useRouter()
    const { posts } = usePostsStore()
    if(router.isFallback) return <div>Not found</div>
    return (
        <Post post={posts.find(p => p._id === post._id)} />
    )
}

export const getStaticPaths: GetStaticPaths = async() => {
    const query = allPostsQuery()
    const posts: PostType[] = await client.fetch(query)
    const paths = posts.map((post) => {
        return {
            params: { id: post._id }
        }
    })
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async({ params }) => {
    const query = postDetailQuery(params.id)
    const post = await client.fetch(query)
    return {
        props: { post: post[0] },
    }
}

export default Detail