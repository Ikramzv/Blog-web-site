import axios from 'axios'
import { motion, Variants } from 'framer-motion'
import { useState } from 'react'
import { HiArrowUp } from 'react-icons/hi'
import { MdEdit } from 'react-icons/md'
import useAuthStore from '../../store/authStore'
import usePostsStore from '../../store/postsStore'
import { PostType } from '../../types/Post'
import { convertDateToString } from '../../utils'
import Button from '../utilComponents/Button'

type Props = {
    post: PostType
}

const variants: Variants = {
    show: {
        rotateZ: '180deg'
    },
    hidden: {
        rotateZ: '360deg'
    }
}

const CaptionOrComment = ({post}: Props) => {
    const [showComments , setShowComments] = useState(false)
    const { setPosts, posts } = usePostsStore()
    const { userProfile } = useAuthStore()

    const handleEdit = async() => {
        const promp = prompt('Edit caption' , post.caption)
        if(!promp) return
        setPosts(posts.map(p => p._id === post._id ? {...p,caption: promp,_updatedAt: new Date()} : p))
        try {
            const { data } = await axios.patch('http://localhost:3000/api/update' , { type: 'edit', caption: promp, postId: post._id })
            return data
        } catch (error) {
            Promise.reject(error)
        }
    }
  return (
    <div 
        className={`flex flex-col px-3 py-4 md:px-6 bg-gray-200 leading-6 md:leading-7 md:py-4 ${showComments && 'py-0 md:py-0'} sm:ml-2 w-full max-h-[200px] sm:w-[300px] sm:max-h-[280px]
        md:w-450 md:max-h-[380px]bg-gray-100 rounded-lg relative`} 
    >
        {showComments ? (
            <motion.div 
                key={'comments'}
                initial={{y:100}}
                animate={{y: 0}}
                exit={{y: -100}}
                className='flex flex-col h-full bg-white -mx-3 md:-mx-6 
                px-2 py-1 border-2 overflow-y-auto border-gray-300 rounded-md flex-1 pb-14' 
            >
                {post.comments.length === 0 ? (
                    <div>
                        <p className='text-lg text-gray-500'>No users shared comment yet</p>
                    </div>
                ) : (
                    post.comments.map(c => (
                        <div key={c._key} className='border-b py-2 border-gray-400'>
                            <span className='text-base font-bold mr-2'>{c.postedBy?.username}</span>
                            <p className='text-sm text-gray-700 inline' style={{wordBreak:'break-all',wordWrap:'break-word'}}>{c.comment}</p>
                        </div>
                    ))
                )}
            </motion.div>
        ) : (
            
                <motion.div 
                    key={'caption'}
                    initial={{y:-100}}
                    animate={{y: 0}}
                    exit={{y: 100}}
                    className='h-full overflow-y-auto flex-1 pb-14'
                >   
                    <div className='float-right flex items-center gap-2'>
                        <span className='bg-white h-max p-2 rounded-lg text-xs text-gray-700 inline-flex items-center ml-1'>
                            {convertDateToString(post._createdAt)}
                        </span>
                        {userProfile?._id === post.postedBy._id && (
                            <Button 
                                text='Edit'
                                icon={<MdEdit className='text-lg' />}
                                classNames={'border-black text-black hover:bg-black'}
                                handleClick={handleEdit}
                            />
                        )}
                    </div>
                    <p className='text-[17px] text-gray-600 pb-2 break-words'>{post.caption}</p>
                </motion.div>
        )}
        <div className='flex absolute bottom-0 left-0 right-0 h-12 rounded-b-lg p-2 border-2 border-t-0 border-gray-200 bg-gray-800' >
            <p className='text-white text-sm' >{post.comments.length} comments</p>
            <motion.button 
                key={'show_comments_button'}
                whileTap={{scale:0.95}}
                variants={variants}
                initial={showComments ? 'hidden' : 'show'}
                animate={showComments ? 'show' : 'hidden'}
                className='ml-auto rounded-full border-2 border-blue-500 p-1' 
                onClick={() => setShowComments(!showComments)}
            >
                <HiArrowUp className='text-xl text-blue-500' />
            </motion.button>
        </div>
    </div>
  )
}

export default CaptionOrComment