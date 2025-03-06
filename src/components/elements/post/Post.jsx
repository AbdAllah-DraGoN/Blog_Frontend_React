import { Link } from "react-router-dom";
import "./Post.css";
import { handleDates } from "../../../functions/handleDates";
import { BASE_URL } from "../../../data";
import { truncateText } from "../../../functions/handleText";

const Post = ({ post = {} }) => {
  //
  return (
    <div className="post-card">
      <img
        src={`${post.image}`}
        // src={`${BASE_URL}/${post.image}`}
        alt="Post"
        className="post-image"
      />
      <Link to={`/posts/${post.id}`}>
        <h2 className="post-title">{post.title}</h2>
        <p className="post-body">{truncateText(post.body)}</p>
      </Link>
      <div className="post-footer">
        <Link to={`/users/profile/${post.user.id}`}>
          <div className="author">
            <img src={`${BASE_URL}/${post.user.image}`} alt="User" />
            <p className="author-name">{post.user.name}</p>
          </div>
        </Link>
        <div className="post-info">
          <p className="post-category">{post.category.name}</p>
          <small>{handleDates(post.created_at)}</small>
        </div>
      </div>
    </div>
  );
};

export default Post;
