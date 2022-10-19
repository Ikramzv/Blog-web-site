type Comments = {
    comment: string
    _key: string
    postedBy: PostedBy
}

type AssetType = {
    url: string
    _id: string
}

type MediaType = {
    asset: AssetType
}

type PostedBy = {
    username: string
    image: string
    _id: string
}

export type PostType = {
    caption: string
    comments: Comments[]
    likes: {_ref: string}[]
    topic: string
    userId: string
    video: MediaType
    image: MediaType
    _createdAt: string
    _id: string
    _updatedAt: string
    postedBy: PostedBy
}

export type GoogleDecodedCredentialType = {
    picture: string
    name: string
    sub: string
}