import { GoogleLogin, googleLogout } from '@react-oauth/google'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'
import useAuthStore from '../store/authStore'
import { createOrGetUser } from '../utils'
import Button from './utilComponents/Button'

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

  const handleLogout = () => {
    const promp = prompt('Are you sure to log out ? If it is then type "yes" .')
    if(promp !== "yes") return
    googleLogout()
    logout()
    router.replace('/')
  }

  return (
    <div className='w-full flex justify-between items-center border-b-2 py-2 px-4 flex-wrap z-50 gap-y-2'>
        <Link href={'/'} passHref={true} >
            <a>
              <div className='w-[100px] md:w-[130px] ml-10 md:ml-20 flex items-center gap-2' >
                  <img 
                      src={'/logo.png'}
                      width={10}
                      height={10}
                      alt='Blog'
                      className='cursor-pointer w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14'
                  />
                  <span className='font-medium text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-main'>Blog</span>
              </div>
            </a>
        </Link>
        <form className='w-40 sm:w-44 md:w-64 lg:w-96 ' onSubmit={handleSubmit} >
          <input 
            type="text" 
            className='w-full px-2 py-1 md:px-4 md:py-2 rounded outline-none border-2 border-gray-300 focus:border-gray-400 duration-300' 
            placeholder='Search by caption or topic' value={search} onChange={(e) => setSearch(e.target.value)} 
          />
        </form>
        <div id='navbar_actions' >
          {userProfile ? (
            <div className='flex gap-10 mt-2 sm:m-0 sm:gap-5 md:gap-10 items-center'>
              <Link href={'/upload'} passHref={true} >
                  <a>
                    <Button 
                      icon={<IoMdAdd className='text-xl' />} 
                      text={'Upload'} 
                      classNames={'border-black text-black hover:bg-black'}
                    />
                  </a>
              </Link>
              {userProfile.image && (
                <Link href={'/'} passHref={true} >
                    <a>
                      <Image
                        src={userProfile.image}
                        width={42}
                        height={42}
                        alt={'user image'}
                        layout='intrinsic'
                        className='rounded-full  '
                      />
                    </a>
                </Link>
              )}
              <Button  
                  handleClick={handleLogout} 
                  classNames='px-2 border-red-500 text-red-500 hover:bg-red-500 ' 
                  icon={<AiOutlineLogout className='text-xl' />}
                  text={'Log out'}
                />
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