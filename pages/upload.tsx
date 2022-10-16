import { SanityAssetDocument } from '@sanity/client'
import axios from 'axios'
import { NextPage } from "next"
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa"
import useAuthStore from '../store/authStore'
import client from "../utils/client"
import { topics } from '../utils/constants'


const Upload: NextPage = () => {
    const userProfile = useAuthStore(state => state.userProfile)
    const [isLoading , setIsLoading] = useState(false)
    const [videoAsset , setVideoAsset] = useState<SanityAssetDocument | null>(null)
    const [invalidFileType , setInvalidFileType] = useState(false)
    const [form , setForm] = useState({
        category: topics[0].name,
        caption: ''
    })
    const [savingPost , setSavingPost] = useState(false)
    const router = useRouter()

    const uploadVideo = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const video = e.target.files[0]
        const fileTypes = ['video/mp4' , 'video/ogg' , 'video/webm']
        setIsLoading(true)

        if(fileTypes.includes(video.type)) {
            client.assets.upload('file' , video , {
                contentType: video.type,
                filename: video.name,
                title: video.name.toUpperCase()
            })
            .then(data => {
                setVideoAsset(data)
                setIsLoading(false)
            })
            .catch(err => alert(err.message))
        } else {
            setIsLoading(false)
            setInvalidFileType(true)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handlePost = async() => {
        if(Object.entries(form).some(([key,value]) => value === '') || videoAsset === null) {
            return alert(`Please fullfill ${Object.keys(form).find((key) => form[key] === '')}`)
        }

        setSavingPost(true)
        const doc = {
            _type: 'post',
            caption: form.caption,
            topic: form.category,
            video: {
                _type: 'file',
                asset: {
                    _type: 'reference',
                    _ref: videoAsset._id
                }
            },
            userId: userProfile._id,
            postedBy: {
                _type: 'postedBy',
                _ref: userProfile._id,
            }
        }

        try {
            const { data } = await axios.post('http://localhost:3000/api/post' , doc)
            console.log(data)
            router.push('/')
        } catch (error) {
            Promise.reject(error)
        }

    }

  return (
    <div className="flex h-full w-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center  ">
        {savingPost ? (
            <div className='h-full w-full grid place-items-center' >
                <p className='text-xl text-green-700 text-center' >Saving the post ...</p>
            </div>
        ) : (
            <div className="bg-white rounded-lg xl:min-h-[90vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6 w-[80%] " >
            <div>
                <div>
                    <p className="text-2xl font-bold">Upload Video</p>
                    <p className="text-base text-gray-400 mt-1" >Post a video to your account</p>
                </div>
                <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 
                    w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 duration-300" 
                >
                    {isLoading ? (
                        <p>Uploading...</p>
                    ) : (
                        <div>
                            {videoAsset ? (
                                <div>
                                    <video src={videoAsset?.url} loop controls className="rounded-xl h-[450px] mt-16 bg-black"></video>
                                </div>
                            ) : (
                                <label className="cursor-pointer" >
                                    <div className="flex flex-col items-center justify-center h-full" >
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="font-bold text-xl" >
                                                <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                                            </p>
                                            <p className="text-sm font-semibold text-center">
                                                Select a video and share with your friends
                                            </p>
                                        </div>
                                        <p className="text-sm mt-5 text-gray-400 text-center leading-10" >
                                            MP4 or WebM or ogg <br />
                                            720x1280 or higher <br />
                                            Up to 10 minutes <br />
                                            Less than 2gb
                                        </p>
                                        <p className="bg-[#f51997] text-center mt-10 rounded text-white text-base font-medium p-2 w-52 outline-none">
                                            Select File
                                        </p>
                                    </div>
                                    <input 
                                        type="file"
                                        name="upload_video"
                                        className="w-0 h-0"
                                        onChange={uploadVideo}
                                    />
                                </label>
                            )}
                        </div>
                    )}
                    {invalidFileType && (
                        <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]' >Please select a video file</p>
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-3 pb-10' >
                    <label className='text-base font-medium'>Caption</label>
                    <input type="text" name='caption' value={form.caption} onChange={handleChange} className='rounded outline-none text-base border-2 border-gray-200 p-2' />
                    
                    <label className='text-base font-medium'>Choose a Catergory</label>
                    <select 
                        name="category" 
                        className='outline-none border-2 border-gray-200 text-base capitalize lg:p-4 p-2 rounded cursor-pointer' 
                        onChange={handleChange}
                    >
                        {topics.map((topic) => (
                            <option  
                                className='outline-none capitalize bg-white text-gray-700 text-base p-2 hover:bg-slate-300 duration-300' 
                                key={topic.name} 
                                value={topic.name}
                            >
                                {topic.name}
                            </option>
                        ))}
                    </select>
                    <div className='flex gap-6 mt-10'>
                            <button type='button' onClick={() => {}} 
                                className='border-gray-300 border-2 text-base font-medium p-2 rounded w-28 lg:w-44 outline-none ' 
                            >
                                Discard
                            </button>
                            <button type='button' onClick={handlePost} 
                                className='bg-[#f51997] text-white text-base font-medium p-2 rounded w-28 lg:w-44 outline-none ' 
                            >
                                Post
                            </button>
                    </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default Upload