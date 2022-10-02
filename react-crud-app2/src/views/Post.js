import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { SELECT } from '../utils/event';

function Post() {
    const { boardList, status, statusText } = useSelector((state) => state.boardReducer)
    const [article, setArticle] = useState({});

    function onChangeArticle(e) {
        setArticle({
            ...article,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }
    return (
        <div>
            {status === 200 && boardList.length > 0 ?
                (
                    <>
                        <div>
                            <span>게시판 : </span>
                            <select
                                name="boardId"
                                onChange={onChangeArticle}
                                value={article?.boardId ?? 0}
                            >
                                <option value={SELECT.id}>{SELECT.name}</option>
                                {
                                    boardList.map((board) => (
                                        <option value={board?.id}>{board?.name ?? ""}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <span>제목 : </span>
                            <input
                                name="title"
                                onChange={onChangeArticle}
                                value={article?.title ?? ""}
                            />
                        </div>
                        <div>
                            <span>내용 : </span>
                            <textarea
                                name="content"
                                onChange={onChangeArticle}
                                value={article?.content ?? ""}
                            />
                        </div>
                        <button>등록</button>
                    </>
                ) : status === 200 && boardList.length === 0 ?
                    (
                        <div>
                            게시판 등록이 필요합니다.
                        </div>
                    ) : (
                        <div>
                            <div>
                                <span>{status}</span>
                            </div>
                            <div>
                                <span>{statusText}</span>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default Post