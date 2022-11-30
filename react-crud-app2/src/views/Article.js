import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { articleActions } from '../slices/articleSlice';
import Comment from './Comments';
import './CSS/Article.css';
// import { articleReducer } from '../slices/articleSlice';
// import { boardReducer } from '../slices/boardSlice';

function Article() {
    const params = useParams();
    //store에서 값이 바뀐 것을 뿌려줄 view단의 데이터
    const { article, status, statusText } = useSelector((state) =>
        state.articleReducer
    );
    const boardList = useSelector((state) =>
        state.boardReducer.boardList
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //#8 게시글 수정에서 추가
    function onClickUpdateButton() {
        navigate(`/update/${params?.articleId ?? 0}`);
    }

    //#9 게시글 삭제에서 추가
    function onClickDeleteButton() {
        dispatch(articleActions.deleteArticle());
    }

    useEffect(() => {
        dispatch(articleActions.getArticle(params?.articleId ?? 0));
    }, [dispatch, params?.articleId]);

    return (
        <>
            {
                status === 200 ?
                    <>
                        <div className='article'>
                            <span>게시판.&nbsp;
                                {
                                    boardList.length > 0 &&
                                    //url파라미터 특성답게 param은 String으로 오기 때문에 형변환 해줘야 한다
                                    boardList.find((board) => board.id === parseInt(article?.boardId))?.name
                                }
                            </span>&emsp;
                            <span>
                                <button onClick={onClickUpdateButton}>수정</button>&nbsp;
                                <button onClick={onClickDeleteButton}>삭제</button>
                            </span>
                        </div>
                        <hr className='articleHr' />

                        <div className='articleContent'>
                            <div className='articleContentTitle'>
                                <div>
                                    <span>제목 : </span>
                                    <span>{article?.title ?? ""}</span>
                                </div>
                                <div>
                                    <span>조회수 : </span>
                                    <span>{article?.views ?? ""}</span>
                                </div>
                                <div>
                                    <span>작성일시 : </span>

                                    <span>{(article.insertDate) ? new Date(article?.insertDate).toLocaleString() : ""}</span>
                                </div>
                            </div>
                            <div className='articleContentText'>
                                <span>{article?.content?.split("\n")?.map(line => <span>{line}<br /></span>)}</span>
                            </div>
                            <hr />
                        </div>
                        <div className="comment">
                            <Comment articleId={params?.articleId ?? 0} />
                        </div>
                    </>
                    :
                    <div>
                        <div>
                            <span>{status}</span>
                        </div>
                        <div>
                            <span>{statusText}</span>
                        </div>
                    </div>
            }
        </>
        // <>
        //     <div>
        //         게시판 상세
        //     </div>
        //     <div>
        //         <Comment />
        //     </div>
        // </>
    )
}

export default Article