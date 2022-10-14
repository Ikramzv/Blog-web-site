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
}