import { footerList1, footerList2, footerList3 } from '../utils/constants'

const List = ({items , mt}: Record<string, string[] | boolean> ) => {
  return (
      <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
        {(items as string[]).map(item => (
          <p className='text-gray-400 text-sm hover:underline cursor-pointer' key={item} >
            {item}
          </p>
        ))}
      </div>
    )
}

const Footer = () => {
  return (
    <div className='mt-6 hidden xl:block' >
      <List items={footerList1} mt={false} />
      <List items={footerList2} />
      <List items={footerList3} />
      <p className='text-gray-400 text-sm mt-5' >2022 Tiktik</p>
    </div>
  )
}

export default Footer