import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./single-post.css";
import useGetApi from "../../../hooks/useGetApi";
import Loader from "../../elements/loader/Loader";
import { toast } from "react-toastify";
import NotFound from "../NotFound";

const SinglePost = () => {
  const { id } = useParams(); // استخراج postId من الرابط
  // console.log(id);

  const [data, loading, error] = useGetApi(`/posts/${id}`);
  console.log(data);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  if (loading) return <Loader state={true} />;

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newEntry = {
        id: comments.length + 1,
        author: "Guest",
        text: newComment,
        date: new Date().toISOString().split("T")[0],
      };
      setComments([...comments, newEntry]);
      setNewComment("");
    }
  };

  return (
    <div className="single-post-page">
      {error && console.log(error)}
      {error && <NotFound message={error.response.data.message} />}
      <div className="my-container">
        {data && (
          <>
            <div className="post-content">
              <img
                src={`http://localhost:8000/${data.data.image}`}
                alt="Post"
                className="post-image"
              />
              <h1 className="post-title">{data.data.title}</h1>
              <p className="post-category">Category: {data.data.category}</p>
              <p className="post-body">{data.data.body}</p>
            </div>
            <div className="comments-section">
              {comments && (
                <>
                  <h2>Comments ({comments.length})</h2>
                  {comments.map((comment) => (
                    <div key={comment.id} className="comment-box">
                      <p className="comment-author">{comment.author}</p>
                      <p className="comment-text">{comment.text}</p>
                      <p className="comment-date">{comment.date}</p>
                    </div>
                  ))}
                </>
              )}
              <div className="comment-form">
                <textarea
                  className="comment-input"
                  rows="3"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button className="comment-button" onClick={handleAddComment}>
                  Post Comment
                </button>
              </div>
            </div>
          </>
        )}
        {/* ============================= */}
      </div>
    </div>
  );
};

export default SinglePost;
