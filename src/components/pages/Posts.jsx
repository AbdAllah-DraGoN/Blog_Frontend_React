import useGetApi from "../../hooks/useGetApi";
import Loader from "../elements/loader/Loader";
import Post from "../elements/post/Post";
import "./pages.css";

const Posts = () => {
  const [data, loading, error] = useGetApi("/posts?limit=20");
  return (
    <div className="posts-page">
      <Loader state={loading} />
      <div className="my-container">
        <h1 className="page-header">All Posts</h1>

        <div className="posts-container">
          {data && data.data.map((post) => <Post key={post.id} post={post} />)}
        </div>
        <div>{error && console.log(error)}</div>
      </div>
    </div>
  );
};

export default Posts;
