import React, { FC } from "react";

interface Props {
  post: {
    id: number;
    user: {
      username: string;
      profile_picture: string;
    };
    content: string;
    image: string;
    likes: [];
    comments: [];
  };
}

const Post: FC<Props> = ({ post }) => {
  return <div className="post__container"></div>;
};

export default Post;

// heart icon <i class="far fa-heart"></i>
//heart icon for when liked <i class="fas fa-heart"></i>
