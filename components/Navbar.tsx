import { GoogleLogin, googleLogout } from '@react-oauth/google'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'
import useAuthStore from '../store/authStore'
import { createOrGetUser } from '../utils'
import Logo from '../utils/tiktik-logo.png'

const Navbar = () => {
  const { userProfile , addUser , logout } = useAuthStore()
  const [search , setSearch] = useState('')
  const router = useRouter()

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(search === '') return
    try {
      router.push(`/?search=${search}`)
      setSearch('')
      return
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <div className='w-full flex justify-between items-center border-b-2 py-2 px-4 flex-wrap' >
        <Link href={'/'} >
            <div className='w-[100px] md:w-[130px]' >
                <Image 
                    className='cursor-pointer'
                    src={Logo}
                    alt='Tiktik'
                    layout='responsive'
                />
            </div>
        </Link>
        <form className='w-40 sm:w-44 md:w-64 lg:w-96 ' onSubmit={handleSubmit} >
          <input 
            type="text" 
            className='w-full px-4 py-2 rounded outline-none border-2 border-gray-300 focus:border-gray-400 duration-300' 
            placeholder='Search by caption or topic' value={search} onChange={(e) => setSearch(e.target.value)} 
          />
        </form>
        <div>
          {userProfile ? (
            <div className='flex gap-10 mt-2 sm:m-0 sm:gap-5 md:gap-10 items-center'>
              <Link href={'/upload'}>
                <button className='border-2 px-2 md:px-4 text-base font-semibold flex items-center gap-2'>
                  <IoMdAdd className='text-xl' />
                  <span className='hidden md:block' >Upload</span>
                </button>
              </Link>
              {userProfile.image && (
                <Link href={'/'} >
                  <>
                    <Image
                      src={userProfile.image}
                      width={42}
                      height={42}
                      alt={'user image'}
                      layout='fixed'
                      className='rounded-full'
                    />
                  </>
                </Link>
              )}
              <button type="button" onClick={() => {
                googleLogout()
                logout()
                router.replace('/')
              }} className='px-2' >
                <AiOutlineLogout color='red' fontSize={24} />
              </button>
            </div>
          ) : (
            <GoogleLogin 
              onSuccess={(response) => {
                createOrGetUser(response , addUser)
              }}
              onError={() => {
                console.log(new Error('error'))
              }}
            />
          )}
        </div>
    </div>
  )
}

export default Navbar