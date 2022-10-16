import { NextApiRequest, NextApiResponse } from "next";
import client from "../../utils/client";
import { allPostsQuery } from "../../utils/queries";


export default async function (
    req: NextApiRequest,
    res: NextApiResponse
) { 
    if(req.method === 'GET') {
        const postsQuery = allPostsQuery()
        const posts = await client.fetch(postsQuery)
        return res.status(200).json(posts)
    }
    if(req.method === 'POST') {
        const doc = req.body
        const post = await client.create(doc)
        return res.status(201).json(post)
    }
}