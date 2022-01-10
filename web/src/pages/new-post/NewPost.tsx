import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return <div></div>;
};

export default NewPost;
