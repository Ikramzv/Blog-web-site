import { createClient } from "next-sanity";
const client = createClient({
    projectId: 'hp58fg4f',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2022-10-11',
    token: process.env.NEXT_PUBLIC_TOKEN
})

export default client