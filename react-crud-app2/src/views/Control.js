import React, { useState } from 'react'
import CreateBoard from './components/CreateBoard';
import CreateCode from './components/CreateCode';
import UpdateBoardList from './components/UpdateBoardList';
import UpdateCodeList from './components/UpdateCodeList';

function Control() {
    //버튼을 누를 때마다 화면에서 입력폼이 show / hide 반복될 기능이다
    const [showCreateCode, setShowCreateCode] = useState(false);
    const [showCreateBoard, setShowCreateBoard] = useState(false);
    const [showUpdateCodeList, setShowUpdateCodeList] = useState(false);
    const [showUpdateBoardList, setShowUpdateBoardList] = useState(false);

    function onClickCreateCodeButton() {
        (showCreateCode) ? setShowCreateCode(false) : setShowCreateCode(true);
    }

    function onClickCreateBoardButton() {
        (showCreateBoard) ? setShowCreateBoard(false) : setShowCreateBoard(true);
    }

    function onClickUpdateCodeList() {
        (showUpdateCodeList) ? setShowUpdateCodeList(false) : setShowUpdateCodeList(true);
    }

    function onClickUpdateBoardList() {
        (showUpdateBoardList) ? setShowUpdateBoardList(false) : setShowUpdateBoardList(true);
    }

    return (
        <div>
            <div>
                <span>설정</span>
            </div>
            <div>
                <div>
                    <div>
                        <div>
                            <button onClick={onClickCreateCodeButton}>새코드</button>
                        </div>
                        <div>
                            {
                                showCreateCode && <CreateCode setShowCreateCode={setShowCreateCode} />
                            }
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div>
                            <button onCClick={onClickUpdateCodeList}>코드 목록 수정</button>
                        </div>
                        <div>
                            {
                                showUpdateCodeList && <UpdateCodeList setUpdateCodeList={setShowUpdateCodeList} />
                            }
                        </div>
                    </div>
                </div>
                <hr />
                <div>
                    <div>
                        <div>
                            <button onClick={onClickCreateBoardButton}>새 게시판</button>
                        </div>
                        <div>
                            {
                                showCreateBoard && <CreateBoard setShowCreateBoard={setShowCreateBoard} />
                            }
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div>
                            <button onClick={onClickUpdateBoardList}>게시판 목록 수정</button>
                        </div>
                        <div>
                            {
                                showUpdateBoardList && <UpdateBoardList setUpdateBoardList={setShowUpdateBoardList} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Control;