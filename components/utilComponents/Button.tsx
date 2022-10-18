import { useEffect } from 'react'
import useAuthStore from "../../store/authStore"

type Props = {
    color?: string
    colorVal?: string
    text: string
    icon: React.ReactElement
    styles?: React.CSSProperties
    handleClick: React.MouseEventHandler<HTMLButtonElement>
}

const Button = ({color , colorVal, text , icon, handleClick , styles}: Props) => {
  const { userProfile } = useAuthStore()
  useEffect(() => {
    console.log(color,colorVal)
  }, [])
  
  return (
    userProfile && (
      <button className={`post_buttons border-${color}-${colorVal} text-${color}-${colorVal} hover:bg-${color}-${colorVal} 
      ${color === 'black' && 'hover:bg-black border-black'} `} 
        style={styles} onClick={handleClick} 
      >
        <span className="hidden md:block" >{text}</span>
        {icon}
      </button>
    )
  )
}

export default Button