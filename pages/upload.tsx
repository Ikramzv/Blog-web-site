import { SanityAssetDocument } from '@sanity/client'
import axios from 'axios'
import { NextPage } from "next"
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import MediaForm from '../components/media/MediaForm'
import useAuthStore from '../store/authStore'
import client from '../utils/client'
import { topics } from '../utils/constants'

const Upload: NextPage = () => {
    const userProfile = useAuthStore(state => state.userProfile)
    const [mediaAsset , setMediaAsset] = useState<SanityAssetDocument | null>(null)
    const [activePill , setActivePill] = useState<string>('video')
    const  [loading , setLoading] = useState('')
    const [form , setForm] = useState({
        category: topics[0].name,
        caption: ''
    })
    const [savingPost , setSavingPost] = useState(false)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handlePost = async() => {
        if(Object.entries(form).some(([key,value]) => value === '') || mediaAsset === null) {
            return alert(`Please fullfill ${Object.keys(form).find((key) => form[key] === '')}`)
        }

        setSavingPost(true)
        const doc = {
            _type: 'post',
            caption: form.caption,
            topic: form.category,
            likes: [],
            comments: [],
            [`${activePill}`]: {  
                _type: activePill === 'video' ? 'file' : 'image',
                asset: {
                    _type: 'reference',
                    _ref: mediaAsset._id
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
            router.push('/')
            return data
        } catch (error) {
            Promise.reject(error)
        }

    }

    const clearUploaded = async() => {
        setLoading('Deleting...')
        try {
            await client.delete(mediaAsset._id)
            setMediaAsset(null)
        } catch (error) {
            Promise.reject(error)
        }
        setLoading('')
    }

  return (
    <div className="flex h-full w-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center  ">
        {savingPost ? (
            <div className='h-full w-full grid place-items-center' >
                <p className='text-xl text-green-700 text-center' >Saving the post ...</p>
            </div>
        ) : (
            <div className="bg-white rounded-lg xl:min-h-[90vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6 w-[80%] ">
                <div className='flex flex-col gap-2 pb-5'>
                    <div className='flex items-center gap-5'>
                        <button className={`pill ${activePill === 'video' && 'border-blue-600'}`} onClick={() => setActivePill('video')} >
                            Post a Video
                        </button>
                        <button className={`pill ${activePill === 'image' && 'border-blue-600'}`} onClick={() => setActivePill('image')} >
                            Post an Image
                        </button>
                    </div>
                    <MediaForm mediaAsset={mediaAsset} setMediaAsset={setMediaAsset} activePill={activePill} loading={loading} setLoading={setLoading} />
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
                            <button type='button' onClick={clearUploaded} 
                                className='border-gray-300 border-2 btn_upd active:scale-95 duration-300' 
                            >
                                Discard
                            </button>
                            <button type='button' onClick={handlePost} 
                                className='bg-[#f51997] text-white btn_upd active:scale-95 duration-300' 
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