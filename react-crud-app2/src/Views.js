import React from 'react'
import Board from './views/Board'
import ChangeURL from './changeURL/ChangeURL'
import './Views.css';
import { useNavigate } from 'react-router';

function Views() {
    /**
     * useHistory()는 리액트에서 URL 주소를 변경할 때 사용하는 Hook 이다
     * 예를 들어, 로그인 버튼 또는 여러 목록 중 하나를 선택하여 클릭했을 때
     * URL주소를 변경시켜 URL주소와 일치하는 Route의 컴포넌트를 렌더링하기위해 ㅅ사용한다
     * 
     * 리액트가 v6가 되면서 useNavigate()가 기존의 useHistory()긴으을 전부 대체
     * useHistory의 history는 객체였지만 useNavigate의 navigate는 함수다
     */
    const navigate = useNavigate();

    function onClickNewPostButton() {
        navigate("/insert");
    }

    function onClickControlButton() {
        navigate("/control");
    }
    return (
        <div>
            <div id="header" className="header">
                <div>
                    <h3>Board CRUD</h3>
                </div>
                <div>
                    <div>
                        <button onClick={onClickNewPostButton}>새글</button>
                    </div>
                </div>
            </div>
            <div id="sidebar" className="sidebar">
                <Board />
            </div>
            <div id="content" className="content">
                <ChangeURL />
            </div>
        </div>
    );
}

export default Views;