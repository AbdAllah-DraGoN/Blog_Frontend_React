import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./single-post.css";
import useGetApi from "../../../hooks/useGetApi";
import Loader from "../../elements/loader/Loader";
import { toast } from "react-toastify";
import NotFound from "../NotFound";
import { handleDates } from "../../../functions/handleDates";
import { BASE_URL, MAIN_API_URL } from "../../../data";
import axios from "axios";
import { getToken } from "../../../functions/handleTokens";

const SinglePost = () => {
  const userToken = getToken();
  const { id } = useParams();
  // console.log(id);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");

  const [postData, postLoading, postError] = useGetApi(`/posts/${id}`);
  const [commentsData, commentsLoading, commentsError, reloadComments] =
    useGetApi(`/posts/${id}/comments`);

  useEffect(() => {
    postData && setPost(postData.post);
    // console.log(post);
  }, [postData]);

  useEffect(() => {
    commentsData && setComments(commentsData.data);
    // console.log(comments);
    commentsError && console.log(commentsError);
    commentsError && toast.error(commentsError.response.data.message);
  }, [commentsData, commentsError]);

  if (postLoading) return <Loader state={true} />;

  const handleAddComment = () => {
    if (newComment.length > 200) {
      return toast.error("Comment must be smaller than 200 characters long");
    }

    const body = {
      body: newComment,
    };
    const loading = toast.info("Loading...", {
      autoClose: false,
      closeOnClick: false,
    });

    axios
      .post(`${MAIN_API_URL}/posts/${id}/comments`, body, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.message) {
          toast.success(res.data.message);
        }
        reloadComments();
      })
      .catch((rej) => {
        console.log(rej);
        const error = rej.response.data.message;
        toast.error(error);
      })
      .finally(() => {
        toast.dismiss(loading);
      });
    setNewComment("");
  };

  return (
    <div className="single-post-page">
      {postError && console.log(postError)}
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
              {post.is_favorite && (
                <button
                  onClick={() => {
                    handleAddFavBtnClick(post.id, post.is_favorite);
                  }}
                >
                  {post.is_favorite === "yes"
                    ? "Remove From Favorites"
                    : "Add To Favorites"}
                </button>
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
              {comments && (
                <>
                  <h2>Comments ({comments.length})</h2>
                  <Loader state={commentsLoading} />
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      id={comment.id}
                      className="comment-box"
                    >
                      <Link to={`/users/profile/${comment.user.id}`}>
                        <div className="comment-author">
                          <img
                            src={`${BASE_URL}/${comment.user.image}`}
                            alt="User"
                          />
                          <p className="comment-author-name">
                            {comment.user.name}
                          </p>
                        </div>
                      </Link>
                      <div className="comment-body">
                        <p className="comment-content">{comment.body}</p>
                        <p className="comment-date">
                          {handleDates(comment.updated_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}
              {userToken && (
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
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
