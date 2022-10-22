import axios from 'axios';
import decode from 'jwt-decode';
import { GoogleDecodedCredentialType, PostedBy, PostType } from '../types/Post';

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
    if(likes.length === 0) return '0 like'
    if(likes.length === 1 && userLikedPost) return 'Liked by you'
    if(likes.length > 1 && userLikedPost) return `Liked by you and ${likes.length - 1} other${likes.length - 1 === 1 ? '' : 's'}`
    else if(likes.length >= 1 && !userLikedPost) return `${likes.length} likes`
}

export const convertDateToString = (date: string): string => {
    const currentDate = new Date()
    const postDate = new Date(date)
    const since = Math.floor((currentDate.getTime() - postDate.getTime()) / 1000)
    if(since < 0) return postDate.toLocaleDateString()
    if(since < 60) return `${since}s ago`
    if(since < 60 * 60) return `${Math.floor(since / 60)}m ago`
    if(since < 60 * 60 * 24) return `${Math.floor(since / 60 / 60)}h ago`
    if(since < 60 * 60 * 24 * 7) return `${Math.floor(since / 60 / 60 / 24)}d ago`
    if(since < 60 * 60 * 24 * 30) return `${Math.floor(since / 60 / 60 / 24 / 7)}w ago`
    if(since < 60 * 60 * 24 * 30 * 12) return `${Math.floor(since / 60 / 60 / 24 / 30)}m ago`
    
    return postDate.toLocaleString()
}

// export const filterPosts = (posts: PostType[] , router: NextRouter): PostType[] => {
//     const filterKeys = Object.keys(router.query)
//     const filtered: PostType[] = posts.filter((post) => {
//         let matches : boolean = false
//         for(let key of filterKeys) {
//             if(key === 'search') {
//                 const postKey = ['topic' , 'caption' , 'postedBy']
//                 matches = postKey.some(pk => {
//                     if(typeof post[pk] === 'object' && !Array.isArray(post[pk])) {
//                         return filterData(post[pk] , key , router)
//                     }
//                     const regex = makeRegex(`${post[pk]}` , 'ig')
//                     console.log(regex , router.query[key])
//                     return regex.test(router.query[key] as string)
//                 })
//             } else {
//                 matches = post[key] === router.query[key]
//             }
//             if(matches) break
//         }
        
//         return matches
//     })
    
//     return filtered
// }

// const makeRegex = (pattern: any , modifiers: string) => {
//     return new RegExp(pattern , modifiers)
// }

// const filterData = (data: string , key: string , router: NextRouter) => {
//     const keys = Object.keys(data)
//     return keys.some((nestedEntitiesKey) => {
//         const regex = makeRegex(`[${data[nestedEntitiesKey]}]` , 'ig')
//         return regex.test(router.query[key] as string)
//     })
// }

export const findChanged = (lastFiltered: PostType[] , all: PostType[]): PostType[] => {
    const result = all.reduce((initial , item) => {
        if(lastFiltered.some((post) => post._id === item._id)) initial.push(item)
        return initial
    } , [])
    return result
}