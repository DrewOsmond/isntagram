import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import "./index.css";

import Post from "../../components/post/Post";

const Home = () => {
  const dispatch = useAppDispatch();
  const { posts, loaded } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.session);
  const [likes, setLikes] = useState<Set<Number>>(new Set());

  return (
    <div className="home__page">
      {loaded && posts.length > 0 ? (
        posts.map((post, i) => (
          <Post post={post} liked={likes.has(post.id)} key={`posts-${i}`} />
        ))
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Home;
