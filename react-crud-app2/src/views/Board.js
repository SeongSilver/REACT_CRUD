import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../slices/boardSlice';
import './CSS/Board.css';
function Board() {
    //boardReducer의 state를 구독할 useSelector -> 변화할 View단을 설정
    const { boardList, status, statusText } = useSelector((state) =>
        state.boardReducer);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(boardActions.getBoardList());
    }, [dispatch])
    console.log(boardList);
    return (
        <>
            {
                status === 200 ?
                    <div>
                        <ul>
                            <li key={0} className="menu">
                                <Link to="/">
                                    <span>Main</span>
                                </Link>
                            </li>
                            {
                                boardList.length > 0 ?
                                    boardList.map((board) => (
                                        <li key={board?.id} className="menu">
                                            <Link to={{ pathname: `/board/${board?.id}` }}>
                                                <span>{board?.name}</span>
                                            </Link>
                                        </li>
                                    ))
                                    : <div> 게시판이 없습니다. </div>
                            }
                        </ul>
                    </div>
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

export default Board