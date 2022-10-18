import axios from 'axios'
import { NextComponentType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { GoVerified } from 'react-icons/go'
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io'
import { MdComment, MdDelete, MdEdit } from 'react-icons/md'
import useAuthStore from '../store/authStore'
import usePostsStore from '../store/postsStore'
import { PostType } from '../types/Post'
import { convertLikesToText } from '../utils'
import client from '../utils/client'
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
    const [likes , setLikes] = useState(post.likes.some((like) => like._ref === userProfile?._id))

    const onVideoPress = () => {
        if(playing) {
            videoRef.current.pause()
            setPlaying(false)
        } else {
            videoRef.current.play()
            setPlaying(true)
        }
    }

    const handleDelete = async() => {
        const promp = prompt('Are you sure to delete post ? Type "yes" to delete post . ')
        if(promp !== 'yes') return
        try {
            setPosts(posts.filter(p => p._id !== post._id))
            await client.delete(post._id)
        } catch (error) {
            Promise.reject(error)
        }
    }

    const handleLike = async() => {
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
        const commentData = {
            _type: 'comment',
            comment: promp,
            postedBy: {
                username: userProfile?.username,
                image: { asset: { url: userProfile?.image }}
            }
        }
        setPosts(posts.map((p) => p._id === post._id ? {...p, comments: [...p.comments,commentData]} : p))
        try {
            const { data } = await axios.patch('http://localhost:3000/api/update' , { type: 'comment', commentData, postId: post._id })
            return data
        } catch (error) {
            Promise.reject(error)
        }
    }

    const handleEdit = async() => {
        const promp = prompt('Edit caption' , post.caption)
        if(!promp) return
        setPosts(posts.map(p => p._id === post._id ? {...p,caption: promp} : p))
        try {
            const { data } = await axios.patch('http://localhost:3000/api/update' , { type: 'edit', caption: promp, postId: post._id })
        } catch (error) {
            Promise.reject(error)
        }
    }

    useEffect(() => {
       console.log(posts)    
    }, [posts])

    useEffect(() => {
        setLikes(post.likes.some((like) => like._ref === userProfile?._id))
    } , [post.likes.length , userProfile])
    

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
        <div>
            <div className='flex flex-col sm:flex-row gap-3 cursor-pointer font-semibold rounded' >
                <div className='flex items-center gap-3 p-2' >
                    <div className='md:w-16 md:h-16 w-10 h-10 ' >
                        <Link href={'/'}>
                            <>
                                <Image 
                                    width={62}
                                    height={62}
                                    className='rounded-full'
                                    src={post.postedBy.image}
                                    alt='Profile Photo'
                                    layout='responsive'
                                />
                            </>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-4' >
                        <Link href={'/'}>
                            <div className='flex items-center gap-2 md:text-base font-bold text-primary' >
                                <p className='flex items-center gap-2' >
                                    {post.postedBy.username}
                                    <GoVerified className='text-blue-400 text-base' />
                                </p>
                                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block' >
                                    {post.postedBy.username}
                                </p>
                            </div>
                        </Link>
                        <p className='text-red-700 text-sm'>{convertLikesToText(post.likes , userProfile)}</p>
                    </div>
                </div>
                <div className='sm:ml-auto flex items-center gap-5' >
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
                    <Button color={'blue'} colorVal={'400'} text={'Comment'} icon={<MdComment className='text-lg' />} handleClick={handleComment} />
                    { post.userId === userProfile?._id && (
                        <Button color={'red'} colorVal={'400'} text={'Delete'} icon={<MdDelete className='text-lg' />}  handleClick={handleDelete} />
                    ) }
                </div>
            </div>
        </div>
        <div className='lg:ml-20 flex flex-col sm:flex-row relative'>
            <div className='rounded-3xl float-left' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} >
                <Link href={`/detail/${post._id}`}>
                    <ImageOrVideo post={post} videoRef={videoRef} />
                </Link>
                {isHover && post.video && (
                    <div 
                        className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 
                        lg:justify-betweens w-[100px] md:[50px] p-3' 
                    >
                        <ControlButtons muted={muted} onVideoPress={onVideoPress} playing={playing} setMuted={setMuted} videoRef={videoRef} />
                    </div>
                )}
            </div>
            <div className='px-3 py-4 md:px-6 md:py-4 sm:ml-2 w-full sm:w-[300px] md:w-450 bg-gray-100 rounded-lg overflow-auto ' >
                <Button 
                    text='Edit'
                    icon={<MdEdit className='text-lg' />}
                    color={'black'}
                    handleClick={handleEdit}
                    styles={{ float: 'right' }}
                />
                <p className='text-[17px] text-gray-600 pb-2'>{post.caption}</p>
            </div>
        </div>
    </div>
  )
}

export default Post
