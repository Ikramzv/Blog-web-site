import axios from 'axios';
import decode from 'jwt-decode';
import { GoogleDecodedCredentialType } from '../types/Post';

export const createOrGetUser = async(response: any , addUser) => {
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