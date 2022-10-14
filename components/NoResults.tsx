import { NextComponentType } from "next"

interface NSInterface {
    text: string
}

const NoResults: NextComponentType<any,any,NSInterface> = ({text}) => {
  return (
    <div>{text}</div>
  )
}

export default NoResults