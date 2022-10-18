import React from 'react'
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi'

type Props = {
    playing: React.SetStateAction<boolean>
    muted: React.SetStateAction<boolean>
    videoRef: React.MutableRefObject<HTMLVideoElement>
    onVideoPress: React.MouseEventHandler<HTMLButtonElement>
    setMuted: (value: React.SetStateAction<boolean>) => void
}

function ControlButtons({playing , muted , videoRef , onVideoPress , setMuted}: Props) {
  return (
    <>
        {playing ? (
            <button onClick={onVideoPress} >
                <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
            </button>
        ) : (
            <button onClick={onVideoPress} >
                <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
            </button>
        )}
        {muted ? (
            <button onClick={() => {
                videoRef.current.muted = false
                setMuted(false)
            }} >
                <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
            </button>
        ) : (
            <button onClick={() => {
                videoRef.current.muted = true
                setMuted(true)
            }} >
                <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
            </button>
        )}
    </>
  )
}

export default ControlButtons