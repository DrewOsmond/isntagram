import React from "react";
import { useAppSelector } from "../../redux/hooks";
import "./index.css";

import Post from "../../components/post/Post";

const Home = () => {
  const { posts, loaded } = useAppSelector((state) => state.posts);
  console.log("dafuq");
  return (
    <div className="home__page">
      {loaded && posts.length ? (
        posts.map((post, i) => <Post post={post} key={`posts-${i}`} />)
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Home;
