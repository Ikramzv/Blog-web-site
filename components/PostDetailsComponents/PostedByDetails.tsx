import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io'
import useAuthStore from '../../store/authStore'
import { PostType } from '../../types/Post'
import { convertLikesToText } from '../../utils'

type Props = {
    post: PostType
}

const Like = ({post}: Props) => {
    const { userProfile } = useAuthStore()
    return (
        <p className='text-red-700 text-sm inline-flex items-center gap-1'>
            {post.likes.some(p => p._ref === userProfile._id) ? <IoMdHeart /> : <IoMdHeartEmpty />}
            {convertLikesToText(post.likes , userProfile)} 
        </p>
    )
}

const PostedByDetails = ({post}: Props) => {
  return (
    <div className='flex items-center gap-3 p-2' >
        <div className='md:w-16 md:h-16 w-10 h-10 ' >
            <Link href={'/profile'}>
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
            <Link href={'/profile'}>
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
            <Like post={post} />
        </div>
    </div>
  )
}

export default PostedByDetails