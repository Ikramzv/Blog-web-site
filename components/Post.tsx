import { NextComponentType } from 'next'
import { useRef, useState } from 'react'
import usePostsStore from '../store/postsStore'
import { PostType } from '../types/Post'
import { convertDateToString } from '../utils/index'
import CaptionOrComment from './PostDetailsComponents/CaptionOrComment'
import PostActions from './PostDetailsComponents/PostActions'
import PostedByDetails from './PostDetailsComponents/PostedByDetails'
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
    const { posts } = usePostsStore()

    const onVideoPress = () => {
        if(playing) {
            videoRef.current.pause()
            setPlaying(false)
        } else {
            videoRef.current.play()
            setPlaying(true)
        }
    }

    // useEffect(() => {
    //    console.log(posts)    
    // }, [posts])    

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
        <div>
            <div className='flex flex-col sm:flex-row gap-3 cursor-pointer font-semibold rounded' >
                <PostedByDetails post={post} />
                <PostActions post={post} />
            </div>
        </div>
        <div className='lg:ml-20 flex flex-col sm:flex-row relative'>
            <div className='rounded-3xl float-left ' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} >
                <ImageOrVideo post={post} videoRef={videoRef} />
                {isHover && post.video && (
                    <div 
                        className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 
                        lg:justify-betweens w-[100px] md:[50px] p-3' 
                    >
                        <ControlButtons muted={muted} onVideoPress={onVideoPress} playing={playing} setMuted={setMuted} videoRef={videoRef} />
                    </div>
                )}
                <span className='bg-black p-1 rounded-lg absolute top-0 left-0 text-xs text-gray-200' >{convertDateToString(post._createdAt)}</span>
            </div>
            <CaptionOrComment post={post} />
        </div>
    </div>
  )
}

export default Post
