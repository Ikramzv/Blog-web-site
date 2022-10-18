import { NextApiRequest, NextApiResponse } from "next";
import client from "../../utils/client";

export default async ( req: NextApiRequest,res: NextApiResponse) => {
    const { postId } = req.body
    try {
        await client.delete(postId , { returnDocuments: true })
        return res.status(200).json({message: 'Post has been deleted'})
    } catch (error) {
        return res.status(400).send(error.message)
    }
}