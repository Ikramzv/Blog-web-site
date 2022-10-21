import { NextComponentType } from "next"

interface Props {
    show: boolean
}

const showAnimation = 'after:top-1/2 before:bottom-1/2 after:h-[2px] before:h-[2px] after:w-7 before:w-7 md:after:w-8 md:before:w-8 before:-rotate-45 after:rotate-45'
const main = 'h-[2px] w-[75%] bg-white after:duration-300 before:duration-300 ml-[2px]'
const after = 'after:absolute after:h-[2px] after:bg-inherit' 
const before = 'before:absolute before:h-[2px] before:bg-inherit'

const SidebarIcon: NextComponentType<any,any,Props> = ({ show }) => {
  return (
    <div className="relative rounded-full bg-gray-700 p-1 w-10 h-10 md:p-2 md:w-12 md:h-12 flex items-center -ml-2 -mt-2" >
        <div 
            className={`${main} ${before} ${after} ${show ? showAnimation : 'after:top-2 before:bottom-2 after:w-[70%] before:w-[120%]'} `}
            style={{position: show ? 'static' : 'relative',width: show && '0px',height: show && '0px'}}
        ></div>
    </div>
  )
}

export default SidebarIcon