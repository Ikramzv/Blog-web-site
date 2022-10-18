import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PostType } from '../../types/Post'

type Props = {
    post: PostType
    videoRef: React.MutableRefObject<HTMLVideoElement>
}

const ImageOrVideo = ({post , videoRef} : Props) => {
  return (
    <Link href={`/detail/${post._id}`} passHref={true} > 
        <a className='w-[250px] h-[300px] sm:w-[350px] md:w-[500px] md:h-[400px] cursor-pointer' >
            {post.video ? (
                <video 
                    ref={videoRef}
                    src={post.video.asset.url} loop 
                    className='w-full h-full rounded-2xl bg-gray-100'
                ></video>
            ) : (
                <Image
                    src={post.image.asset.url}
                    layout='intrinsic'
                    width={540}
                    height={430}   
                    objectFit='cover' 
                />
            )}
        </a> 
    </Link>
  )
}

export default ImageOrVideo