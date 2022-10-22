import { NextComponentType } from "next"

interface NSInterface {
    text: string
}

const NoResults: NextComponentType<any,any,NSInterface> = ({text}) => {
  return (
    <div className="fixed top-1/2 left-1/2 text-2xl md:text-4xl text-red-700">{text}</div>
  )
}

export default NoResults