import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../../store/authStore'
import { PostType } from '../../types/Post'
import { convertLikesToText } from '../../utils'

type Props = {
    post: PostType
}

function PostedByDetails({post}: Props) {
    const { userProfile } = useAuthStore()
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
            <p className='text-red-700 text-sm'>{convertLikesToText(post.likes , userProfile)}</p>
        </div>
    </div>
  )
}

export default PostedByDetails