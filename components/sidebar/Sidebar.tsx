import { AnimatePresence, motion, usePresence } from 'framer-motion'
import Link from "next/link"
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
    const [isPresent , safeToRemove] = usePresence()

    useEffect(() => {
        if(!isPresent) {
            console.log(isPresent)
            setTimeout(safeToRemove , 1000)
        }
    } , [isPresent])
  return (
    <div className='fixed left-0 sm:static z-50' >
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
                    className="xl:w-400 w-20 flex flex-col justify-start bg-white shadow-xl h-[73.5vh]
                    mb-10 border-r-2 border-gray-100 xl:border-r-0 p-3 duration-300 overflow-y-auto"
                    onClick={() => setShowSidebar(false)}
                >
                    <div className="xl:border-b-2 border-gray-200 xl:pb-4" >
                        <Link href={'/'} >
                            <div className={'normal_link'} >
                                <p className="text-2xl"><AiFillHome /></p>
                                <span className="text-xl hidden xl:block">For You</span>
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