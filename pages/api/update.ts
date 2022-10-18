import { NextApiRequest, NextApiResponse } from "next";
import { PostType } from "../../types/Post";
import client from "../../utils/client";

export default async(req: NextApiRequest,res: NextApiResponse) => {
    // Like api
    if(req.body.type === 'like') {
        const { userId , postId } = req.body
        try {
            let userLikedPost = false
            const post: PostType = await client.getDocument(postId)
            if(post?.likes.some(like => like._ref === userId)) userLikedPost = true
            const transaction = await client.transaction([
                {
                    patch: {
                        id: postId,
                        unset: userLikedPost ? [`likes[_ref == "${userId}"]`] : [],
                        insert: {
                            after: 'likes[-1]',
                            items: !userLikedPost ? [{_ref: userId}] : [],
                        }
                    }
                }
            ]).commit({ returnDocuments: true , autoGenerateArrayKeys: true })
            return res.status(200).json(transaction)
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
    
    // Comment api
    if(req.body.type === 'comment') {
        const {commentData , postId} = req.body
        try {
            const data = await client.transaction([
                { patch: {
                        id: postId,
                        insert: {
                            after: "comments[-1]",
                            items: [commentData],
                        },
                    }
                }
            ]).commit({ returnDocuments: true, autoGenerateArrayKeys: true })
            return res.status(200).json(data)
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }


    if(req.body.type === 'edit') {
        const { caption, postId } = req.body
        try {
            const data = await client.transaction([
                {
                    patch: {
                        id: postId,
                        set: {
                            caption
                        }
                    }
                }
            ]).commit({ returnDocuments: true })
            return res.status(200).json(data)
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }

}   