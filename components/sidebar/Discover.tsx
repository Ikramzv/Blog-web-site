import Link from 'next/link'
import { useRouter } from 'next/router'
import { topics } from '../../utils/constants'


function Discover() {
    const router = useRouter()
    const { topic } = router.query
  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6 mt-2' >
        <p className='text-gray-500 font-semibold m-2 mt-4 hidden xl:block' >Popular Topics</p>
        <div className='flex gap-3 flex-wrap'>
            {topics.map(item => (
                <Link href={`/?topic=${item.name}`} key={item.name} >
                    <div className={topic === item.name ? 'active_topic_style' : 'topic_style'} >
                        <span className='font-bold text-2xl xl:text-base' >
                            {item.icon}
                        </span>
                        <span className='font-medium text-base capitalize' >
                            {item.name}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Discover