export const allPostsQuery = () => {
  const query = `*[_type == "post" && !(_id match "drafts*") ] | order(_createdAt desc){
    _id,
    caption,
    topic,
    video{
      asset->{
        _id,
        url
      }
    },
    image{
      asset->{
        _id,
        url
      }
    },
    userId,
    postedBy->{
      _id,
      username,
      image
    },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        username,
        image
      },
    },
    _createdAt,
    _updatedAt
  }`;

  return query;
};

export const filterPostsByQuery = (filter: string | string[]) => {
  const query = `
    *[_type == "post" && ${filter}] | order(_createdAt desc) {
      _id,
      caption,
      topic,
      video {
        asset-> {
          _id,
          url
        }
      },
      image{
        asset->{
          _id,
          url
        }
      },
      userId,
      postedBy->{
        _id,
        username,
        image
      },
      likes,
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          username,
          image
        }
      },
      _createdAt,
      _updatedAt
    }
  `

  return query
}

export const postDetailQuery = (postId: string | string[]) => {
  const query = `
    *[_type == "post" && _id == "${postId}"] {
      _id,
      caption,
      topic,
      video {
        asset-> {
          _id,
          url
        }
      },
      image{
        asset->{
          _id,
          url
        }
      },
      userId,
      postedBy->{
        _id,
        username,
        image
      },
      likes,
      _createdAt,
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          username,
          image
        }
      },
      _createdAt,
      _updatedAt
    }
    `
  return query;
};

export const singleUserQuery = (userId: string | string[]) => {
  const query = 
  `
  *[_type == "user" && _id == "${userId}"]{
    ... ,
    "posts": *[_type == "post" && userId == ^._id]{
      _id,
      caption,
      topic,
      video {
        asset-> {
          _id,
          url
        }
      },
      image{
        asset->{
          _id,
          url
        }
      },
      userId,
      postedBy->{
        _id,
        username,
        image
      },
      likes,
      _createdAt,
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          username,
          image
        }
      },
      _createdAt,
      _updatedAt
    },
  } {
    ...,
    "totalPosts": count(posts),
    "totalLikes": length(posts[].likes[]),
    "totalComments": length(posts[].comments[])
  }[0]
  `;

  return query;
};

export const allUsersQuery = () => {
  const query = `*[_type == "user"]`;

  return query;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    _id,
    caption,
    topic,
    video{
      asset->{
        _id,
        url
      }
    },
    image{
      asset->{
        _id,
        url
      }
    },
    userId,
    postedBy->{
      _id,
      username,
      image
    },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        username,
        image
      },
    },
    _createdAt,
    _updatedAt
  }`;

  return query;
};

export const userLikedPostsQuery = (userId: string | string[]) => {
  const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
    _id,
    caption,
      video{
      asset->{
        _id,
        url
      }
    },
    image{
      asset->{
        _id,
        url
      }
    },
    userId,
    postedBy->{
      _id,
      username,
      image
    },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        username,
        image
      },
    },
    _createdAt,
    _updatedAt
  }`;

  return query;
};

export const usersOfMostCommentedAndLikedPost = () => {
  const query = 
  `
  *[_type == "user"] {
    image,
    _id,
    "posts": *[_type == "post" && userId == ^._id] {
      "commentsLength": length(comments),
      "likesLength": length(likes)
    },
    username,
  }[
    math::sum([...posts[].commentsLength,...posts[].likesLength]) > 0
  ] | order(math::sum([...posts[].commentsLength,...posts[].likesLength]) desc)[0...5]

  `
  return query
}

