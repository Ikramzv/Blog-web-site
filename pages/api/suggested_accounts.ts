import { NextApiRequest, NextApiResponse } from "next";
import client from "../../utils/client";
import { usersOfMostCommentedAndLikedPost } from "../../utils/queries";

const handler = async(req: NextApiRequest,res: NextApiResponse) => {
    console.log('query' , req.query)
    try {
        const query = usersOfMostCommentedAndLikedPost()
        const users = await client.fetch(query)
        console.log(users)
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

export default handler