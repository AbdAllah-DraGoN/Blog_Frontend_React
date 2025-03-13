import { useEffect, useState } from "react";
import { getToken } from "../../functions/handleTokens";
import useGetApi from "../../hooks/useGetApi";
import Comment from "./Comment";
import AddComment from "./AddComment";
import Loader from "../elements/loader/Loader";

const Comments = ({ postId }) => {
  const userToken = getToken();

  const [comments, setComments] = useState(null);
  const [commentsCount, setCommentsCount] = useState(0);

  const [commentsData, commentsLoading, commentsError, reloadComments] =
    useGetApi(`/posts/${postId}/comments`);

  useEffect(() => {
    commentsData && setComments(commentsData.data);
    commentsData && setCommentsCount(commentsData.data.length);
    // console.log(comments);

    commentsError && toast.error(commentsError.response.data.message);
  }, [commentsData, commentsError]);

  return (
    <div className="comments-section">
      <h2>Comments ({commentsCount})</h2>
      {comments && (
        <>
          <Loader state={commentsLoading} />
          {comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
          {userToken && (
            <AddComment postId={postId} reloadComments={reloadComments} />
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
