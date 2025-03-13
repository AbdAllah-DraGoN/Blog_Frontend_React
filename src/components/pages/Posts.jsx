import { useEffect, useState } from "react";
import useGetApi from "../../hooks/useGetApi";
import Loader from "../elements/loader/Loader";
import Post from "../elements/post/Post";
import "./pages.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isFirst, setIsFirst] = useState(true);
  const [data, loading, error] = useGetApi(`/posts?limit=3&page=${page}`);

  useEffect(() => {
    // data && setPosts((prev) => [...prev, ...data.data]);
    data && isFirst && handelLoad();
  }, [data]);

  useEffect(() => {
    data && setPosts((prev) => [...prev, ...data.data]);
  }, [page]);

  const handelLoad = () => {
    setPage((e) => e + 1);
    setIsFirst(false);
  };

  return (
    <div className="posts-page">
      <Loader state={loading} />
      <div className="my-container">
        <h1 className="page-header">All Posts</h1>

        <div className="posts-container">
          {posts && posts.map((post) => <Post key={post.id} post={post} />)}
        </div>
        <button style={{ margin: "2rem" }} onClick={handelLoad}>
          load
        </button>
      </div>
    </div>
  );
};

export default Posts;
