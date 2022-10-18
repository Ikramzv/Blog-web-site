import { SanityAssetDocument } from '@sanity/client'
import Image from 'next/image'
import React, { useState } from 'react'
import client from "../../utils/client"
import MediaText from './MediaText'

interface MediaFormProps {
    mediaAsset: SanityAssetDocument | null
    setMediaAsset: Function
    activePill: string
    loading: string
    setLoading: (value: React.SetStateAction<string>) => void
}

const MediaForm = ({ mediaAsset , setMediaAsset , activePill, loading , setLoading }: MediaFormProps) => {
    const [invalidFileType , setInvalidFileType] = useState(false)
    const uploadAsset = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0]
        const fileTypes = activePill === 'video' ? ['video/mp4' , 'video/ogg' , 'video/webm'] : ['image/jpeg' , 'image/png' , 'image/webp']
        const sanityFieldType = activePill === 'video' ? 'file' : 'image'
        setLoading('Uploading...')

        if(fileTypes.includes(file.type)) {
            try {
                const data = await client.assets.upload(sanityFieldType , file , {
                    contentType: file.type,
                    filename: file.name,
                    title: file.name.toUpperCase()
                })
                setMediaAsset(data)
            } catch (error) {
                Promise.reject(error)
            }
            setLoading('')
        } else {
            setLoading('')
            setInvalidFileType(true)
            setTimeout(() => {
                setInvalidFileType(false)
            } , 3000)
        }
    } 

  return (
    <div>
        <div>
            <p className="text-2xl font-bold">Upload {activePill === 'video' ? 'Video' : 'Image'}</p>
            <p className="text-base text-gray-400 mt-1" >Post a {activePill} to your account</p>
        </div>
        <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 
            w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 duration-300" 
        >
            {loading !== '' ? (
                <p>{loading}</p>
            ) : (
                <div>
                    {mediaAsset ? (
                        <div>
                            {activePill === 'video' ? (
                                <video src={mediaAsset?.url} loop controls className="rounded-xl h-[450px] mt-16 bg-black"></video>
                            ) : (
                                <Image 
                                    src={mediaAsset.url}
                                    width={250}
                                    height={300}
                                    layout='fixed'
                                    objectFit='contain'
                                    priority
                                />
                            )}
                        </div>
                    ) : (
                        <MediaText uploadAsset={uploadAsset} assetType={activePill} />
                    )}
                </div>
            )}
            {invalidFileType && (
                <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]' >Please select a video file</p>
            )}
        </div>
    </div>
  )
}

export default MediaForm