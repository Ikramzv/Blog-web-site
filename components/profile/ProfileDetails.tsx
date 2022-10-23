import { FaComment } from "react-icons/fa"
import { IoMdHeart } from "react-icons/io"
import { Details } from "../../pages/profile/[userId]"
import { PostedBy } from "../../types/Post"

interface Props {
    user: PostedBy & Details
    details: Omit<Details , 'posts'>
}

const detailData = [
  {
    key: 'totalPosts',
    text: 'Posts',
    icon: ''
  },
  {
    key: 'totalLikes',
    text: 'Total',
    icon: <span className="border-2 border-red-600 rounded-full p-1" ><IoMdHeart className="text-xl text-red-600 sm:text-base" /></span>
  },
  {
    key: 'totalComments',
    text: 'Total',
    icon: <span className="border-2 border-blue-600 rounded-full p-1" ><FaComment className="text-xl text-blue-600 sm:text-base" /> </span>
  },
]

const ProfileDetails = ({ user, details }: Props) => {
  return (
    <>
        <div className="col-span-full" >
          <p className="font-bold text-xl" >
            <span className="text-gray-600 mr-1">@</span>
            {user.username}
          </p>
        </div>
        <div className="col-span-full grid grid-cols-5 md:grid-cols-6" >
          <div className="col-span-2 md:col-span-3 flex justify-center items-center " >
            <img
              src={user.image}
              alt={'Profile image'}
              className={'rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-20 md:w-20 object-cover'}
            />
          </div>
          {detailData.map((data,i) => (
            <div className={`flex flex-col justify-center items-center col-span-1 border-0 ${i !== 1 && 'sm:border-2 sm:border-y-0'}`} >
              <span className="text-gray-700 font-semibold" >{details[data.key] || user[data.key]}</span>
              <p className="flex items-center gap-2" >
                <span className={`font-semibold text-lg ${data.text !== 'Posts' && 'hidden sm:block'}`}>{data.text}</span> 
                {data.icon}
              </p>
            </div>
          ))}
        </div>
    </>
  )
}

export default ProfileDetails