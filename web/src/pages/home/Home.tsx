import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import "./index.css";

import Post from "../../components/post/Post";

const Home = () => {
  const { posts, loaded } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.session);
  const [likes, setLikes] = useState<Set<Number>>(new Set());

  useEffect(() => {
    const likedPostIds: Number[] = user!.Likes.map((like) => like.postId);
    setLikes(new Set(likedPostIds));
  }, [user]);

  return (
    <div className="home__page">
      {loaded && posts.length ? (
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
