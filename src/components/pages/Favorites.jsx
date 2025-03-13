import { useEffect, useState } from "react";
import { getToken } from "../../functions/handleTokens";
import useGetApi from "../../hooks/useGetApi";
import Post from "../elements/post/Post";
import Loader from "../elements/loader/Loader";

const Favorites = () => {
  const [posts, setPosts] = useState(null);
  const [data, loading] = useGetApi(`/posts/favorites?limit=20`);
  useEffect(() => {
    data && setPosts(data.data);
    // console.log(data);
  }, [data]);

  return (
    <div>
      <h1 className="page-header">My Favorites</h1>
      <div className="my-container" style={{ textAlign: "center" }}>
        <Loader state={loading} />
        <div className="posts-container">
          {posts && posts.map((post) => <Post key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
