import axios from 'axios'
import { motion, Variants } from 'framer-motion'
import { useState } from 'react'
import { HiArrowUp } from 'react-icons/hi'
import { MdEdit } from 'react-icons/md'
import useAuthStore from '../../store/authStore'
import usePostsStore from '../../store/postsStore'
import { PostType } from '../../types/Post'
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
        setPosts(posts.map(p => p._id === post._id ? {...p,caption: promp} : p))
        try {
            const { data } = await axios.patch('http://localhost:3000/api/update' , { type: 'edit', caption: promp, postId: post._id })
            return data
        } catch (error) {
            Promise.reject(error)
        }
    }
  return (
    <div className={`px-3 py-4 md:px-6 md:py-4 ${showComments && 'py-0 md:py-0'} sm:ml-2 w-full sm:w-[300px] md:w-450 max-h-[200px] md:max-h-[380px] overflow-y-auto bg-gray-100 rounded-lg relative`} >
        {showComments && post.comments.length === 0 && (
            <div className='grid h-full w-full place-items-center'>
                <p className='text-lg'>No users share comments already</p>
            </div>
        )}
        { showComments ? (
            <motion.div 
                key={'comments'}
                initial={{y:100}}
                animate={{y: 0}}
                exit={{y: -100}}
                className='flex flex-col h-full bg-white -mx-3 md:-mx-6 
                px-2 py-1 border-2 overflow-y-auto border-gray-300 rounded-md' 
            >
                {post.comments.map(c => (
                    <div key={c._key} className='border-b py-2 border-gray-400'>
                        <p className='float-left text-base font-bold mr-2' >{c.postedBy?.username}</p>
                        <p className='text-sm text-gray-700'>{c.comment}</p>
                    </div>
                ))}
            </motion.div>
        ) : (
            
                <motion.div 
                    key={'caption'}
                    initial={{y:-100}}
                    animate={{y: 0}}
                    exit={{y: 100}}
                >
                    {userProfile?._id === post.postedBy._id && (
                        <Button 
                            text='Edit'
                            icon={<MdEdit className='text-lg' />}
                            classNames={'border-black text-black hover:bg-black'}
                            handleClick={handleEdit}
                            styles={{ float: 'right',marginLeft: '6px' }}
                        />
                    )}
                    <p className='text-[17px] text-gray-600 pb-2 break-words'>{post.caption}</p>
                </motion.div>
        ) }
        <motion.button 
            whileTap={{scale:0.95}}
            variants={variants}
            initial={showComments ? 'hidden' : 'show'}
            animate={showComments ? 'show' : 'hidden'}
            className='rounded-full border-2 border-blue-500 p-1 absolute bottom-10 right-1' 
            onClick={() => setShowComments(!showComments)}
        >
            <HiArrowUp className='text-xl text-blue-500' />
        </motion.button>
    </div>
  )
}

export default CaptionOrComment