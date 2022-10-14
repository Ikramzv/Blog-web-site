import axios from 'axios';
import decode from 'jwt-decode';
import { GoogleDecodedCredentialType } from '../types/Post';

export const createOrGetUser = async(response: any) => {
    const decoded: GoogleDecodedCredentialType = decode(response.credential)

    const { name, picture , sub } = decoded
    const user = {
        _id: sub,
        _type: 'user',
        username: name,
        image: picture
    }
    await axios.post('http://localhost:3000/api/auth' , user)
}