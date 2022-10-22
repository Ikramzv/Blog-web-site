import { FaComment, FaProductHunt } from "react-icons/fa"
import { IoMdHeart } from "react-icons/io"
import { Details } from "../../pages/profile/[userId]"
import { PostedBy } from "../../types/Post"

interface Props {
    user: PostedBy & Details
    details: Omit<Details , 'posts'>
}

const ProfileDetails = ({ user, details }: Props) => {
  return (
    <>
        <div>
          <p className="font-bold text-xl" >{user.username}</p>
        </div>
        <div>
            <p className="flex items-center gap-2" >
              <span className="font-semibold text-lg text-slate-500">Posts</span> 
              <FaProductHunt className="text-slate-500" /> : 
              <span className="text-gray-700 font-semibold" >{details.totalPosts || user.totalPosts}</span>
            </p>
        </div>
        <div>
            <p className="flex items-center gap-2" >
              <span className="font-semibold text-lg text-red-700 ">Total</span> 
              <IoMdHeart className="text-red-600" /> : 
              <span className="text-gray-700 font-semibold" >{details.totalLikes || user.totalLikes}</span>
            </p>
        </div>
        <div className="flex items-center" >
          <p className="flex items-center gap-2" >
            <span className="font-semibold text-lg text-blue-800 ">Total</span> 
            <FaComment className="text-blue-700" /> : 
            <span className="text-gray-700 font-semibold" >{details.totalComments || user.totalComments}</span>
          </p>
        </div>
    </>
  )
}

export default ProfileDetails