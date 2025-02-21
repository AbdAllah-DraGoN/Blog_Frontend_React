import { Link } from "react-router-dom";
import "./Post.css";

const Post = ({ post = {} }) => {
  return (
    <div className="post-card">
      <img
        src={`http://localhost:8000/${post.image}`} // استبدل بالرابط المناسب
        alt="Post"
        className="post-image"
      />
      <Link to={`/posts/${post.id}`}>
        <h2 className="post-title">{post.title}</h2>
        <p className="post-body">{post.body}</p>
        <p className="post-category">Category: {post.category}</p>
      </Link>
      <div className="post-footer">
        <small>Posted on: {new Date(post.created_at).toLocaleString()}</small>
      </div>
    </div>
  );
};

export default Post;
