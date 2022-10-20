import { NextComponentType } from "next"

interface Props {
    show: boolean
}

const showAnimation = 'after:top-1/2 before:bottom-1/2 after:h-[2.5px] before:h-[2.5px] after:w-8 before:w-8 before:-rotate-45 after:rotate-45'
const main = 'h-[2.5px] w-[90%] bg-white after:duration-300 before:duration-300'
const after = 'after:absolute after:h-[2.5px] after:bg-inherit' 
const before = 'before:absolute before:h-[2.5px] before:bg-inherit'

const SidebarIcon: NextComponentType<any,any,Props> = ({ show }) => {
  return (
    <div className="relative rounded-full bg-gray-700 p-2 w-12 h-12 flex items-center -ml-2 -mt-2" >
        <div 
            className={`${main} ${before} ${after} ${show ? showAnimation : 'after:top-2 before:bottom-2 after:w-[85%] before:w-[110%]'} `}
            style={{position: show ? 'static' : 'relative',width: show && '0px',height: show && '0px'}}
        ></div>
    </div>
  )
}

export default SidebarIcon