import React from "react";
import { useParams } from "react-router-dom";
import PostForm from "../elements/post/PostForm";

const EditPost = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="page-header">Edit Post {id}</h1>
      <PostForm />
    </div>
  );
};

export default EditPost;
