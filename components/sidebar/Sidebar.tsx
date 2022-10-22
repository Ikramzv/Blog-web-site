import { AnimatePresence, motion } from 'framer-motion'
import Link from "next/link"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import { AiFillHome } from 'react-icons/ai'
import Footer from "../Footer"
import SidebarIcon from '../utilComponents/SidebarIcon'
import Discover from "./Discover"
import SuggestedAccounts from "./SuggestedAccounts"

const sidebarAnimation = {
    initial: {x:-100,opacity:0},
    animate: {x:0,opacity:1, transitionDuration: '50ms'},
    exit: {x:-100,opacity:0}
}

const Sidebar = () => {
    const [showSidebar , setShowSidebar] = useState(true)
    const router = useRouter()

    window.addEventListener('resize', () => {
        if(window.innerWidth > 1280) setShowSidebar(true)
        else setShowSidebar(false)
    })

    useEffect(() => {
      if(window.innerWidth < 1280 && Object.keys(router.query).length > 0) {
        setShowSidebar(false)
      }
    }, [Object.keys(router.query).length])
    
    
  return (
    <div>
        <div
            className="block xl:hidden m-2 ml-4 mt-3 text-xl cursor-pointer"
            onClick={() => setShowSidebar(prev => !prev)}
        >
            <SidebarIcon show={showSidebar} />
        </div>
        <AnimatePresence>
            {showSidebar && (
                <motion.div 
                    key={'sidebar_anm'}
                    {...sidebarAnimation}
                    className="xl:w-400 md:w-[200px] flex flex-col justify-start bg-white h-[92vh]
                    pb-8 border-r-2 border-gray-100 xl:border-r-0 p-3 duration-300 overflow-y-auto"
                >
                    <div className="xl:border-b-2 border-gray-200 xl:pb-4" >
                        <Link href={'/'} >
                            <div className={'normal_link'} >
                                <p className="text-2xl"><AiFillHome /></p>
                                <span className="text-lg md:text-xl">Home</span>
                            </div>
                        </Link>
                    </div>
                    <Discover />
                    <SuggestedAccounts />
                    <Footer />
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  )
}

export default Sidebar