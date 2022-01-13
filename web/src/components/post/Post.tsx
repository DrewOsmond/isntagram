import React, { FC } from "react";
import { Link } from "react-router-dom";
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
  liked: boolean;
}

const Post: FC<Props> = ({ post, liked }) => {
  const { image, content, user, likes, comments } = post;
  return (
    <div className="post">
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
        <div className="post__username">{user.username}</div>
      </div>
      <img src={image} alt="users post" className="post__image" />
      <div className="post__content">
        <div className="post__likes__comments">
          {liked ? (
            <i className="fas fa-heart post__liked"></i>
          ) : (
            <i className="far fa-heart post__unliked"></i>
          )}
        </div>
        <div className="post__description">
          <Link
            to={`${post.user.username}`}
            className="post__content__username"
          >
            {post.user.username}
          </Link>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Post;
