import { Link } from "react-router-dom";
import "./Post.css";
import { handleDates } from "../../../functions/handleDates";
import { BASE_URL } from "../../../data";
import { useState } from "react";
import axiosApiRequest from "../../../functions/axiosApiRequest";

const Post = ({ post = {} }) => {
  const [userIsLike, setUserIsLike] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.liked_users);

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
    <div className="post-card" id={post.id}>
      <img
        // src={`${post.image}`}
        src={`${BASE_URL}/${post.image}`}
        alt="Post"
        className="post-image"
      />
      <Link to={`/posts/${post.id}`}>
        <h2 className="post-title">{post.title}</h2>
        {/* <p className="post-body">{truncateText(post.body)}</p> */}
      </Link>
      <div className="post-footer">
        <div className="row row-1">
          <Link to={`/users/profile/${post.user.id}`}>
            <div className="author">
              <img src={`${BASE_URL}/${post.user.image}`} alt="User" />
              <p className="author-name">{post.user.name}</p>
            </div>
          </Link>
          <small>{likesCount} Likes</small>
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
        </div>
        <div className="row row-2">
          <p className="post-category">{post.category.name}</p>
          <small>{handleDates(post.created_at)}</small>
        </div>
      </div>
    </div>
  );
};

export default Post;
