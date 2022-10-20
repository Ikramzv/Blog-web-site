import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io'
import { MdComment, MdDelete } from 'react-icons/md'
import useAuthStore from '../../store/authStore'
import usePostsStore from '../../store/postsStore'
import { PostType } from '../../types/Post'
import Button from '../utilComponents/Button'

type Props = {
    post: PostType
}

function PostActions({post}: Props) {
    const { userProfile } = useAuthStore()
    const [likes , setLikes] = useState(post.likes.some((like) => like._ref === userProfile?._id))
    const { setPosts, posts, setLiked } = usePostsStore()

    const handleLike = async() => {
        console.log('lke')
        setLiked(userProfile?._id , post._id)
        try {
            const { data } = await axios.patch('http://localhost:3000/api/update', 
                { type: 'like' , postId: post._id , userId: userProfile?._id }
            )
            return data
        } catch (error) {
            
        }
    }

    const handleComment = async() => {
        const promp = prompt('Write comment here')
        if(!promp) return
        const sanityCommentData = {
            _type: 'comment',
            _key: crypto.randomUUID(),
            comment: promp,
            postedBy: {
                _type: 'reference',
                _ref: userProfile?._id
            }
        }
        const commentData = {...sanityCommentData , postedBy: { username: userProfile?.username , image: userProfile?.image }}
        setPosts(posts.map((p) => p._id === post._id ? {...p, comments: [...p.comments,commentData]} : p))
        try {
            const { data } = await axios.patch('http://localhost:3000/api/update' , { type: 'comment', commentData:sanityCommentData, postId: post._id })
            return data
        } catch (error) {
            Promise.reject(error)
        }
    }

    const handleDelete = async() => {
        const promp = prompt('Are you sure to delete post ? Type "yes" to delete post . ')
        if(promp !== 'yes') return
        try {
            setPosts(posts.filter(p => p._id !== post._id))
            const { data } = await axios.delete('http://localhost:3000/api/delete' , { data: { postId: post._id } })
            return data
        } catch (error) {
            Promise.reject(error)
        }
    }

    useEffect(() => {
        setLikes(post.likes.some((like) => like._ref === userProfile?._id))
    } , [post.likes.length , userProfile])

  return (
    <div className='sm:ml-auto flex items-center gap-5 mb-3 md:mb-0 ' >
        <Button
            text={'Like'} 
            icon={!likes ? <IoMdHeartEmpty className={`text-lg text-red-500`} /> : <IoMdHeart className='text-lg text-white' />} 
            handleClick={handleLike} 
            styles={{ 
                backgroundColor: `${likes ? 'crimson' : 'white'}`,
                color: `${likes ? 'white' : 'crimson'}`,
                borderColor: 'crimson'
            }}
        />
        <Button classNames='border-blue-500 text-blue-500 hover:bg-blue-500' text={'Comment'} icon={<MdComment className='text-lg' />} handleClick={handleComment} />
        { post.userId === userProfile?._id && (
            <Button classNames='border-red-500 text-red-500 hover:bg-red-500' text={'Delete'} icon={<MdDelete className='text-lg' />}  handleClick={handleDelete} />
        ) }
    </div>
  )
}

export default PostActions