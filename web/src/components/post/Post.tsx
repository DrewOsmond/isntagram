import React, { FC } from "react";
import "./index.css";

interface Props {
  post: {
    id: number;
    user: {
      username: string;
      profile_picture: string | null;
    };
    content: string;
    image: string;
    likes: [];
    comments: [];
  };
}

const Post: FC<Props> = ({ post }) => {
  const { image, content, user, likes, comments } = post;
  return (
    <div className="post__container">
      <div className="post__user">
        {user.profile_picture ? (
          <img
            src={user.profile_picture}
            alt="profile pic"
            className="post__user__picture"
          />
        ) : (
          <div className="post__user__picture__default">
            <i className="fas fa-user"></i>
          </div>
        )}
        <div>{user.username}</div>
      </div>
      <img src={image} alt="users post" className="post__image" />
      <div>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Post;

// heart icon <i class="far fa-heart"></i>
//heart icon for when liked <i class="fas fa-heart"></i>
