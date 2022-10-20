import axios from 'axios';
import decode from 'jwt-decode';
import { GoogleDecodedCredentialType, PostedBy } from '../types/Post';

export const createOrGetUser = async(response: any , addUser: any) => {
    const decoded: GoogleDecodedCredentialType = decode(response.credential)

    const { name, picture , sub } = decoded
    const user = {
        _id: sub,
        _type: 'user',
        username: name,
        image: picture
    }
    try {
        await axios.post('http://localhost:3000/api/auth' , user)
        addUser(user)
    } catch (error) {
        Promise.reject(error)
    }
}

export const convertLikesToText = (likes: {_ref: string}[] , currentUser: PostedBy) => {
    const userLikedPost = likes.some(like => like._ref === currentUser?._id)
    if(likes.length === 0) return ''
    if(likes.length === 1 && userLikedPost) return 'You liked the post'
    if(likes.length > 1 && userLikedPost) return `You and ${likes.length - 1} liked the post`
    else if(likes.length >= 1 && !userLikedPost) return `${likes.length} liked the post`
}

export const convertDateToString = (date: string): string => {
    const currentDate = new Date().getTime()
    const postDate = new Date(date)
    const since = Math.floor((currentDate - postDate.getTime()) / 1000)
    if(since < 0) return postDate.toLocaleString()
    if(since < 60) return `${since} seconds ago`
    if(since < 60 * 60) return `${Math.floor(since / 60)} minute${since < 120 ? '' : 's'} ago`
    if(since < 60 * 60 * 24) return `${Math.floor(since / 60 / 60)} hour${since < 60 * 60 * 2 ? '' : 's'} ago`
    if(since < 60 * 60 * 24 * 7) return `${Math.floor(since / 60 / 60 / 24)} day${since < 60 * 60 * 24 * 2 ? '' : 's'} ago`
    if(since < 60 * 60 * 24 * 30) return `${Math.floor(since / 60 / 60 / 24 / 7)} week${since < 60 * 60 * 24 * 7 * 2 ? '' : 's'} ago`
    if(since < 60 * 60 * 24 * 30 * 12) return `${Math.floor(since / 60 / 60 / 24 / 30)} month${since < 60 * 60 * 24 * 30 * 2 ? '' : 's'} ago`
    
    return postDate.toLocaleString()
}