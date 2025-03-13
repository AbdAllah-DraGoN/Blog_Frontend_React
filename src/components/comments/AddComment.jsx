import { useState } from "react";
import axiosApiRequest from "../../functions/axiosApiRequest";
import { toast } from "react-toastify";

const AddComment = ({ postId, reloadComments }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    // Validation
    if (!newComment) {
      return toast.error("Can't Add Empty Comment");
    }
    if (newComment.length > 200) {
      return toast.error("Comment must be smaller than 200 characters long");
    }

    const body = {
      body: newComment,
    };

    axiosApiRequest(
      "post", // Request Type
      `/posts/${postId}/comments`, // url
      body, // body Parameters
      {}, // additionals headeres
      (d) => {
        reloadComments();
      } // function run in "then()"
    );

    setNewComment("");
  };
  return (
    <div className="comment-form">
      <textarea
        className="comment-input"
        rows="3"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <button className="comment-button" onClick={handleAddComment}>
        Add Comment
      </button>
    </div>
  );
};

export default AddComment;
