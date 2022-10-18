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
    _createdAt
  }`;

  return query;
};

export const filterPostsByQuery = (filter: string | string[]) => {
  const query = `
    *[_type == "post" && ${filter}] | order(_createdAt desc) {
      _id,
      caption,
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
      _createdAt
    }
  `

  return query
}

export const postDetailQuery = (postId: string | string[]) => {
  const query = `
    *[_type == "post" && _id == "${postId}"] {
      _id,
      caption,
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
      _createdAt
    }
    `
  return query;
};

export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']`;

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
       video{
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
    _createdAt
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
    _createdAt
  }`;

  return query;
};