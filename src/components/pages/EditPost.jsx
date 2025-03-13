import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostForm from "../elements/post/PostForm";
import useGetApi from "../../hooks/useGetApi";
import Loader from "../elements/loader/Loader";

const EditPost = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [postData, postLoading] = useGetApi(`/posts/${id}`);

  useEffect(() => {
    postData && setPost(postData.post);
  }, [postData]);

  return (
    <div>
      <h1 className="page-header">Edit Post</h1>
      <Loader state={postLoading} />
      <PostForm post={post} />
    </div>
  );
};

export default EditPost;
