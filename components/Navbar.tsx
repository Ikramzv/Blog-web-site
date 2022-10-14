import { GoogleLogin } from '@react-oauth/google'
import Image from 'next/image'
import Link from 'next/link'
import { createOrGetUser } from '../utils'
import Logo from '../utils/tiktik-logo.png'

const Navbar = () => {
  const user = false
  return (
    <div className='w-full flex justify-between items-center border-b-2 py-2 px-4' >
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
        <div>SEARCH</div>
        <div>
          {user ? (
            <div>Logged In</div>
          ) : (
            <GoogleLogin 
              onSuccess={(response) => {
                createOrGetUser(response)
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