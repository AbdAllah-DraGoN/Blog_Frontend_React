import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./single-post.css";
import useGetApi from "../../../hooks/useGetApi";
import Loader from "../../elements/loader/Loader";
import NotFound from "../NotFound";
import { handleDates } from "../../../functions/handleDates";
import { BASE_URL } from "../../../data";
import axiosApiRequest from "../../../functions/axiosApiRequest";
import Comments from "../../comments/Comments";
import { getCurrentUser } from "../../../functions/handleUserData";

const SinglePost = () => {
  const currentUser = getCurrentUser();

  const { id } = useParams();
  // console.log(id);

  const [post, setPost] = useState(null);
  const [userIsLike, setUserIsLike] = useState(null);
  const [likesCount, setLikesCount] = useState(0);

  const [postData, postLoading, postError] = useGetApi(`/posts/${id}`);

  useEffect(() => {
    postData && setPost(postData.post);
    postData && setUserIsLike(postData.liked);
    postData && setLikesCount(postData.liked_users);
    // console.log(postData);
  }, [postData]);

  if (postLoading) return <Loader state={true} />;

  // console.log(post);
  const handleFavBtn = (state) => {
    if (state) {
      // console.log("Remove From Favs");

      axiosApiRequest(
        "delete",
        `/posts/${post.id}/favorite`, // url
        {}, // body Parameters
        {}, // additionals headeres
        (d) => {
          setUserIsLike(false);
          setLikesCount(() => {
            return likesCount - 1;
          });
        } // function run in "then()"
      );
    } else {
      // console.log("Add To Favs");
      axiosApiRequest(
        "post",
        `/posts/${post.id}/favorite`, // url
        {}, // body Parameters
        {}, // additionals headeres
        (d) => {
          setUserIsLike(true);
          setLikesCount(() => {
            return likesCount + 1;
          });
        } // function run in "then()"
      );
    }
  };

  return (
    <div className="single-post-page">
      {postError && <NotFound message={postError.response.data.message} />}
      <div className="my-container">
        {post && (
          <>
            <div className="post-content">
              <img
                src={`${post.image}`}
                // src={`${BASE_URL}/${post.image}`}
                alt="Post"
                className="post-image"
              />
              <h1 className="post-title">{post.title}</h1>
              <p className="post-category">Category: {post.category.name}</p>
              <p className="post-body">{post.body}</p>
              <small>{handleDates(post.created_at)}</small>
              <small style={{ margin: " 0 1rem 0 10rem" }}>
                {likesCount} Likes
              </small>
              {userIsLike ? (
                <button
                  onClick={() => {
                    handleFavBtn(userIsLike);
                  }}
                >
                  Remove From Favs
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleFavBtn(userIsLike);
                  }}
                >
                  Add To Fav
                </button>
              )}

              {currentUser && currentUser.id == post.user.id && (
                <div style={{ margin: " 2rem" }}>
                  <Link to={`/posts/${post.id}/edit`}>
                    <button>Edit Post</button>
                  </Link>
                </div>
              )}

              <Link to={`/users/profile/${post.user.id}`}>
                <div className="post-author">
                  <img src={`${BASE_URL}/${post.user.image}`} alt="User" />
                  <div className="post-author-info">
                    <p className="post-author-name">{post.user.name}</p>
                    <p className="post-author-email">{post.user.email}</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="comments-section">
              <Comments postId={id} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
