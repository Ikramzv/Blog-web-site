import { NextComponentType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi'
import { PostType } from '../types/Post'

interface PostInterface {
    post: PostType
}

const Post: NextComponentType<any,any,PostInterface> = ({ post }) => {
    const [isHover , setIsHover] = useState(false)
    const [playing , setPlaying] = useState(false)
    const [muted, setMuted] = useState(false) 
    const videoRef = useRef<HTMLVideoElement>(null)

    const onVideoPress = () => {
        if(playing) {
            videoRef.current.pause()
            setPlaying(false)
        } else {
            videoRef.current.play()
            setPlaying(true)
        }
    }


  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
        <div>
            <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded' >
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
                <div>
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
                </div>
            </div>
        </div>
        <div className='lg:ml-20 flex flex-col gap-4 relative'>
            <p className='text-base text-gray-600 border-b-2 border-gray-200 pb-2' >{post.caption}</p>
            <div className='rounded-3xl' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} >
                <Link href={`/detail/${post._id}`}>
                    <video 
                        ref={videoRef}
                        src={post.video.asset.url} loop 
                        className='w-[250px] h-[300px] sm:w-[350px] lg:w-[700px] lg:h-[530px] md:w-[500px] md:h-[400px] rounded-2xl cursor-pointer bg-gray-100 '
                    ></video>
                </Link>
                {isHover && (
                    <div 
                        className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 
                        lg:justify-betweens w-[100px] md:[50px] p-3' 
                    >
                        {playing ? (
                            <button onClick={onVideoPress} >
                                <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                            </button>
                        ) : (
                            <button onClick={onVideoPress} >
                                <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
                            </button>
                        )}
                        {muted ? (
                            <button onClick={() => {
                                videoRef.current.muted = false
                                setMuted(false)
                            }} >
                                <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
                            </button>
                        ) : (
                            <button onClick={() => {
                                videoRef.current.muted = true
                                setMuted(true)
                            }} >
                                <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Post