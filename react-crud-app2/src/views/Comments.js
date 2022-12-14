import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { commentActions } from '../slices/commentSlice';
import './CSS/Comment.css';

function Comments({ articleId }) {
    const [newComment, setNewComment] = useState("");
    const { commentList, status, statusText } = useSelector((state) => state.commentReducer);
    const dispatch = useDispatch();

    function onClickInsertCommentButton() {
        dispatch(commentActions.insertComment(newComment));
        setNewComment("");
    }

    function onClickDeleteCommentButton(commentId) {
        if (!window.confirm("삭제하시겠습니까?")) return false;
        dispatch(commentActions.deleteComment(commentId));
    }

    useEffect(() => {
        dispatch(commentActions.getCommentList(articleId));
    }, [dispatch, articleId]);

    return (
        <>
            <div className='commentTextarea'>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />&nbsp;&nbsp;
                <button onClick={onClickInsertCommentButton}>등록</button>
            </div>
            <div className="commentArea">
                {
                    status === 200 ?
                        commentList.length > 0 ?
                            commentList.map((comment, index) => (
                                <div key={comment?.id ?? index} className="commentContent">
                                    <div>
                                        <div>
                                            <span>{comment?.content ?? ""}</span>
                                        </div>
                                        <div className='commentDate'>
                                            <span>{(comment?.insertDate) ? new Date(comment?.insertDate).toLocaleString() : ""}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => onClickDeleteCommentButton(comment?.id ?? 0)}>댓글삭제</button>
                                    </div>
                                </div>
                            ))
                            : <div></div>
                        : <div>
                            <div>
                                <span>{status}</span>
                            </div>
                            <div>
                                <span>{statusText}</span>
                            </div>
                        </div>
                }
            </div>
        </>
    )

}

export default Comments