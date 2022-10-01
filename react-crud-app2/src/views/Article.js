import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { articleActions } from '../slices/articleSlice';
import Comment from './Comments';
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
    const history = useNavigate();

    useEffect(() => {
        dispatch(articleActions.getArticle(params?.articleId ?? 0));
    }, [dispatch, params?.articleId]);

    return (
        <>
            {
                status === 200 ?
                    <>
                        <div>
                            <span>게시판 : </span>
                            <span>
                                {
                                    boardList.length > 0 &&
                                    //url파라미터 특성답게 param은 String으로 오기 때문에 형변환 해줘야 한다
                                    boardList.find((board) => board.id === parseInt(article?.boardId))?.name
                                }
                            </span>
                        </div>
                        <div>
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
                            <div>
                                <span>내용 : </span>
                                <span>{article?.content ?? ""}</span>
                            </div>
                            <div>
                                <Comment articleId={params?.articleId ?? 0} history={history} />
                            </div>
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