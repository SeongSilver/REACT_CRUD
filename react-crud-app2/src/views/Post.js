import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { articleActions } from '../slices/articleSlice';
import { SELECT } from '../utils/event';
import { boardActions } from '../slices/boardSlice';
import './CSS/Post.css'

function Post() {
    const { boardList, boardStatus, boardStatusText } = useSelector(
        (state) => ({
            boardList: state.boardReducer.boardList,
            boardStatus: state.boardReducer.status,
            boardStatusText: state.boardReducer.statusText
        }));
    const { articleStatus, articleStatusText } = useSelector(
        (state) => ({
            articleStatus: state.articleReducer.status,
            articleStatusText: state.articleReducer.statusText
        }));
    const [article, setArticle] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    function onChangeArticle(e) {
        setArticle({
            ...article,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    function onClickSubmitButton() {
        if (article?.boardId > 0 && article?.title) {
            if (article?.id > 0) {
                dispatch(articleActions.putArticle(article));
            } else {
                dispatch(articleActions.postArticle(article));
            }
        } else {
            alert("게시판과 제목은 필수값입니다.");
        }
    }

    function onClickMoveToControlButton() {
        navigate("/control");
    }

    useEffect(() => {
        //게시판명 combo box부분은 나중에 설정에서 새로 등록된 게시판 혹은 이름이 수정된 게시판,
        //삭제된 게시판을 반영시켜 나타나야 하기 때문에 게시글 등록/수정하는 Post컴포넌트가
        //렌더링 될 때마다 게시판 목록을 조회해줘야된다
        dispatch(boardActions.getBoardList());
        if (params?.articleId) {
            dispatch(articleActions.setArticle({
                //useState로 마든 setArticle함수를 action.payload로 바로 넘겨주는것
                articleId: params?.articleId, setArticle
            }));
        } else {
            setArticle({}); //새글 쓰기 염두
        }
    }, dispatch, params?.articleId)

    return (
        <div>
            {boardStatus === 200 && boardList.length > 0 ?
                (
                    <div className="postConatiners">
                        <div className="postContent postTitle">
                            <span>제목&emsp;&emsp;</span>
                            <input
                                name="title"
                                onChange={onChangeArticle}
                                value={article?.title ?? ""}
                            />
                        </div>
                        <div className="postContent postSelect">
                            <span>게시판&emsp;&emsp;</span>
                            <select
                                className="postSelectBox"
                                name="boardId"
                                onChange={onChangeArticle}
                                value={article?.boardId ?? 0}
                            >
                                <option value={SELECT.id} key={SELECT.id}>{SELECT.name}</option>
                                {
                                    boardList.map((board, index) => (
                                        <option value={board?.id} key={board?.id}>{board?.name ?? ""}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="postContent postTextarea">
                            <textarea
                                name="content"
                                onChange={onChangeArticle}
                                value={article?.content ?? ""}
                            />
                            <br />
                            <button onClick={onClickSubmitButton}>등록</button>
                        </div>
                    </div>
                ) : boardStatus === 200 && boardList.length === 0 ?
                    (
                        <div>
                            <div>
                                게시판 등록이 필요합니다.
                            </div>
                            <div>
                                <button onClick={onClickMoveToControlButton}>설정 이동</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <span>{boardStatus}</span>
                            </div>
                            <div>
                                <span>{boardStatusText}</span>
                            </div>
                        </div>
                    )
            }
            {articleStatus !== 200 && articleStatus !== 0 && (
                <div>
                    <div>
                        <span>{articleStatus}</span>
                    </div>
                    <div>
                        <span>{articleStatusText}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Post