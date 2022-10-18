import useAuthStore from "../../store/authStore"

type Props = {
    classNames?: string
    text: string
    icon: React.ReactElement
    styles?: React.CSSProperties
    handleClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button = ({classNames, text , icon, handleClick , styles}: Props) => {
  const { userProfile } = useAuthStore()
  
  return (
    userProfile && (
      <button className={`post_buttons ${classNames}`} style={{...styles}} onClick={handleClick} 
      >
        <span className="hidden md:block" >{text}</span>
        {icon}
      </button>
    )
  )
}

export default Button