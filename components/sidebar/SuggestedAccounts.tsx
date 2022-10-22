import Image from "next/image"
import Link from "next/link"
import { useSuggestedUsersStore } from "../../store/suggestedUsers"

const SuggestedAccounts = () => {
  const { suggestedUsers } = useSuggestedUsersStore()
  
  return (
    <div className="flex flex-col gap-3 mt-2" >
      
      {suggestedUsers.length > 0 && (
        <>
          <h4 className="border-b border-gray-300 pb-3 inline-flex items-center justify-between" >
            <span>Suggested Users</span>
          </h4>
          {suggestedUsers.map((user) => (
              <Link key={user._id} href={`/profile/${user._id}`} passHref={true} >
                <a>
                  <div className="flex items-center gap-2" >
                    <Image
                      src={user.image}
                      width={32}
                      height={32}
                      className='rounded-full'
                    />
                    <span className="font-semibold text-base" >{user.username}</span>
                  </div> 
                </a>
              </Link> 
           ))}
        </>
      )}
    </div>
  )
}

export default SuggestedAccounts