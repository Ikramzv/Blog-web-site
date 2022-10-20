import React from "react"
import useAuthStore from "../../store/authStore"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    classNames?: string
    text: string
    icon: React.ReactElement
    styles?: React.CSSProperties
    handleClick?: React.MouseEventHandler<HTMLButtonElement>
}


const Button = ({classNames, text , icon, handleClick , styles , ...props}: Props) => {
  const { userProfile } = useAuthStore()
  
  return (
    userProfile && (
      <button {...props} className={`post_buttons ${classNames}`} style={{...styles}} onClick={handleClick} 
      >
        <span className="hidden md:block" >{text}</span>
        {icon}
      </button>
    )
  )
}

export default Button