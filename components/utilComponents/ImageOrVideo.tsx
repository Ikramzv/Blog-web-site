import Image from 'next/image'
import React from 'react'
import { PostType } from '../../types/Post'

type Props = {
    post: PostType
    videoRef: React.MutableRefObject<HTMLVideoElement>
}

const ImageOrVideo = ({post , videoRef} : Props) => {
  return (
    <>
        {post.video ? (
            <video 
            ref={videoRef}
            src={post.video.asset.url} loop 
            className='w-[250px] h-[300px] sm:w-[350px] lg:w-[700px] lg:h-[530px] md:w-[500px] md:h-[400px] 
            rounded-2xl cursor-pointer bg-gray-100 '
        ></video>
        ) : (
            <Image
                src={post.image.asset.url}
                layout='intrinsic'
                width={540}
                height={430}   
                objectFit='contain'                         
            />
        )}
    </>
  )
}

export default ImageOrVideo