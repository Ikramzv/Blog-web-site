import axios from 'axios'
import { NextComponentType } from 'next'
import { useEffect, useRef, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import useAuthStore from '../store/authStore'
import usePostsStore from '../store/postsStore'
import { PostType } from '../types/Post'
import PostActions from './PostDetailsComponents/PostActions'
import PostedByDetails from './PostDetailsComponents/PostedByDetails'
import Button from './utilComponents/Button'
import ControlButtons from './utilComponents/ControlButtons'
import ImageOrVideo from './utilComponents/ImageOrVideo'

interface PostInterface {
    post: PostType
}

const Post: NextComponentType<any,any,PostInterface> = ({ post }) => {
    const [isHover , setIsHover] = useState(false)
    const [playing , setPlaying] = useState(false)
    const [muted, setMuted] = useState(false) 
    const videoRef = useRef<HTMLVideoElement>(null)
    const { setPosts, posts, setLiked } = usePostsStore()
    const { userProfile } = useAuthStore()

    const onVideoPress = () => {
        if(playing) {
            videoRef.current.pause()
            setPlaying(false)
        } else {
            videoRef.current.play()
            setPlaying(true)
        }
    }

    const handleEdit = async() => {
        const promp = prompt('Edit caption' , post.caption)
        if(!promp) return
        setPosts(posts.map(p => p._id === post._id ? {...p,caption: promp} : p))
        try {
            const { data } = await axios.patch('http://localhost:3000/api/update' , { type: 'edit', caption: promp, postId: post._id })
            return data
        } catch (error) {
            Promise.reject(error)
        }
    }

    useEffect(() => {
       console.log(posts)    
    }, [posts])    

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
        <div>
            <div className='flex flex-col sm:flex-row gap-3 cursor-pointer font-semibold rounded' >
                <PostedByDetails post={post} />
                <PostActions post={post} />
            </div>
        </div>
        <div className='lg:ml-20 flex flex-col sm:flex-row relative'>
            <div className='rounded-3xl float-left' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} >
                <ImageOrVideo post={post} videoRef={videoRef} />
                {isHover && post.video && (
                    <div 
                        className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 
                        lg:justify-betweens w-[100px] md:[50px] p-3' 
                    >
                        <ControlButtons muted={muted} onVideoPress={onVideoPress} playing={playing} setMuted={setMuted} videoRef={videoRef} />
                    </div>
                )}
                <span className='absolute top-5 left-5 text-base text-gray-300 ' >{new Date(post._createdAt).toLocaleString()}</span>
            </div>
            <div className='px-3 py-4 md:px-6 md:py-4 sm:ml-2 w-full sm:w-[300px] md:w-450 bg-gray-100 rounded-lg overflow-auto ' >
                <Button 
                    text='Edit'
                    icon={<MdEdit className='text-lg' />}
                    classNames={'border-black text-black hover:bg-black'}
                    handleClick={handleEdit}
                    styles={{ float: 'right',marginLeft: '6px' }}
                />
                <p className='text-[17px] text-gray-600 pb-2 break-words'>{post.caption}</p>
            </div>
        </div>
    </div>
  )
}

export default Post
