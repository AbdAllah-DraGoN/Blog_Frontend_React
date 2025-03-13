import { Link } from "react-router-dom";
import { BASE_URL } from "../../data";
import { handleDates } from "../../functions/handleDates";

const Comment = ({ comment }) => {
  return (
    <div id={comment.id} className="comment-box">
      <Link to={`/users/profile/${comment.user.id}`}>
        <div className="comment-author">
          <img src={`${BASE_URL}/${comment.user.image}`} alt="User" />
          <p className="comment-author-name">{comment.user.name}</p>
        </div>
      </Link>
      <div className="comment-body">
        <p className="comment-content">{comment.body}</p>
        <p className="comment-date">{handleDates(comment.updated_at)}</p>
      </div>
    </div>
  );
};

export default Comment;
