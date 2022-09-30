import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { articleActions } from '../slices/articleSlice';

function ArticleList() {
    /**
     * useParams는 url중 parameter로 보낸 것만 받아주는 훅이다
    url에서 /숫자? 숫자를 보통 parameter(param)으로 칭하고 ?key=value&key=value이것을
    query로 칭하는데 useParam은 딱 parm까지만 가져와준다.
    다른 정보까지 얻고 싶을 때는 react-router 패키지의 훅 useRouterMatch, useLocation을 사용할 수 있다
    */

    //useParam으로 articleId를 가지고 와서 
    const params = useParams();
    const { articleList, status, statusText } = useSelector((state) =>
        state.articleReducer
    );
    const boardList = useSelector((state) =>
        state.boardReducer.boardList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(articleActions.getArticleList(params?.boardId ?? 0));
    }, [dispatch, params?.boardId]);
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
                                    boardList.find((board) => board.id === parseInt(params?.boardId))?.name
                                }
                            </span>
                        </div>
                        {articleList.length > 0 ?
                            <div>
                                <div>
                                    {
                                        articleList.map((article, index) =>
                                            <div key={article?.id ?? index}>
                                                <Link to={{ pathname: `/article/${article?.id ?? 0}` }}>
                                                    <span>{article?.title ?? ""}</span>
                                                </Link>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            :
                            <div>게시글이 없습니다.</div>
                        }
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
    )
}

export default ArticleList