import { NextApiRequest, NextApiResponse } from 'next'
import client from '../../utils/client'
import { filterPostsByQuery } from '../../utils/queries'

export default async (
    req: NextApiRequest ,res : NextApiResponse
) => {
    const filter = Object.keys(req.query).reduce((initial , key) => {
        let query: string;
        if(key === 'search') {
            initial = initial.filter(str => !str.includes('topic') || !str.includes('caption'))
            query = `topic match "${req.query[key]}*" || caption match "${req.query[key]}*"`
            initial.push(query)
        } else {
            if(initial.length > 0) {
                query = `|| ${key} == "${req.query[key]}"`
                initial.push(query)
            } else {
                query = `${key} == "${req.query[key]}"`
                initial.push(query)
            }
        }
        return initial
    } , [])
    console.log("posts" , filter.join(" "))
    try {
        const query = filterPostsByQuery(filter.join(" "))
        const posts = await client.fetch(query)
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}