import { NextApiRequest, NextApiResponse } from "next";
import client from "../../utils/client";

const handler = async function(req : NextApiRequest ,res: NextApiResponse) {
    if(req.method === 'POST') {
        try {
            const user = req.body
            await client.createIfNotExists(user)
            console.log(user)
            return res.status(200).send('Successfully logged in')
        } catch (error) {
            Promise.reject(error)
        }
    }
}

export default handler