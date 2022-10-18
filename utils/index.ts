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