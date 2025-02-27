import { Link } from "react-router-dom";
import "./Post.css";
import { handleDates } from "../../../functions/handleDates";

const Post = ({ post = {} }) => {
  function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) {
      return text; // لا حاجة للقص
    }

    // ابحث عن آخر مسافة قبل الحد الأقصى
    let trimmedText = text.substring(0, maxLength);
    let lastSpaceIndex = trimmedText.lastIndexOf(" ");

    if (lastSpaceIndex !== -1) {
      return trimmedText.substring(0, lastSpaceIndex) + "..."; // إضافة "..." كإشارة للاقتصاص
    } else {
      return trimmedText + "..."; // في حالة عدم وجود مسافات، سيتم الاقتصاص عند الحد
    }
  }

  return (
    <div className="post-card">
      <img
        src={`http://localhost:8000/${post.image}`} // استبدل بالرابط المناسب
        alt="Post"
        className="post-image"
      />
      <Link to={`/posts/${post.id}`}>
        <h2 className="post-title">{post.title}</h2>
        <p className="post-body">{truncateText(post.body)}</p>
      </Link>
      <div className="post-footer">
        <div className="author">
          <img src={`http://localhost:8000/${post.user.image}`} alt="User" />
          <p className="author-name">{post.user.name}</p>
        </div>
        <div className="post-info">
          <p className="post-category">{post.category}</p>
          <small>{handleDates(post.created_at)}</small>
        </div>
      </div>
    </div>
  );
};

export default Post;
