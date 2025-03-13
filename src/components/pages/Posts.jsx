import { useEffect, useRef, useState } from "react";
import useGetApi from "../../hooks/useGetApi";
import Loader from "../elements/loader/Loader";
import Post from "../elements/post/Post";
import "./pages.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  // const [isFirst, setIsFirst] = useState(true);
  const [data, loading, error] = useGetApi(`/posts?limit=3&page=${page}`);

  // useEffect(() => {
  //   // data && setPosts((prev) => [...prev, ...data.data]);
  //   data && isFirst && handleLoad();
  // }, [data]);

  // useEffect(() => {
  //   data && setPosts((prev) => [...prev, ...data.data]);
  // }, [page]);

  // ---------------------------------------
  useEffect(() => {
    if (data) {
      setPosts((prev) => {
        const newPosts = data.data.filter(
          (post) => !prev.some((prevPost) => prevPost.id === post.id)
        );
        return [...prev, ...newPosts];
      });
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 50 &&
        !loading
      ) {
        // handleLoad();
        setPage((e) => e + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);
  // ---------------------------------------

  // const handleLoad = () => {
  //   // setIsFirst(false);
  // };

  return (
    <div className="posts-page">
      <Loader state={loading} />
      <div className="my-container">
        <h1 className="page-header">All Posts</h1>

        <div className="posts-container">
          {posts && posts.map((post) => <Post key={post.id} post={post} />)}
        </div>
        {/* <button style={{ margin: "2rem" }} onClick={handleLoad}>
          load
        </button> */}
      </div>
    </div>
  );
};

export default Posts;
