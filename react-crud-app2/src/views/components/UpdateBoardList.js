import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../../slices/boardSlice';
import { codeActions } from '../../slices/codeSlice';

function UpdateBoardList({ setShowUpdateBoardList }) {
    const { boardList, boardStatus, boardStatusText } = useSelector(
        (state) => ({
            boardList: state.boardReducer.boardList,
            boardStatus: state.boardReducer.status,
            boardStatusText: state.boardReducer.statusText
        }));

    const { codeList, codeStatus, codeStatusText } = useSelector(
        (state) => ({
            codeList: state.codeReducer.codeList,
            codeStatus: state.codeReducer.status,
            codeStatus: state.codeReducer.statusText
        }));

    const [updatedBoardList, setUpdatedBoardList] = useState(boardList ?? []);
    const dispatch = useDispatch();

    function onChangeBoard(e) {
        const copiedBoardList = [...updatedBoardList];
        copiedBoardList[e.target?.dataset?.index] = {
            ...copiedBoardList[e.target?.datset?.index],
            [e.target?.name]: e.target?.value
        };
        setUpdatedBoardList(copiedBoardList);
    }

    function onClickSubmitButton(updatedBoard) {
        if (!updatedBoard?.name || !updatedBoard.code || updatedBoard?.name === "" || updatedBoard.code === "") {
            alert("빠짐없이 입력해주세요.");
        } else {
            dispatch(boardActions.putBoard(updatedBoard));
        }
    }

    function onClickDeleteButton(boardId) {
        if (!window.confirm("삭제하시겠습니까?")) return false;
        dispatch(boardActions.deleteBoard(boardId));
    }

    useEffect(() => {
        //게시판 수정 전 가장 최신 상태값을 들고온다
        //가져온 최신 게시판과 코드 리스트들은 useSelector 의 구독기능으로 state에도 업데이트 된다
        dispatch(boardActions.getBoardList());
        dispatch(codeActions.getCodeList());
    }, [dispatch]);

    useEffect(() => {
        //boardList의 값이 바뀔 때마다 화면에서 쓸 state인 UpdatedBoardList에 boardList을 리셋해준다
        setUpdatedBoardList(boardList);
    }, [boardList]);
    return (
        <div>
            {
                boardStatus === 200 ?
                    updatedBoardList.length > 0 ?
                        // {/**들어온 updatedBoard(board와 같은 것) 값을 map을 이용하여 화면에 뿌려줌 */ }
                        updatedBoardList.map((updatedBoard, index) =>
                            <>
                                <div>
                                    <span>게시판 이름 : </span>
                                    <input
                                        name="name"
                                        value={updatedBoard?.name ?? ""}
                                        data-index={index}
                                        onChange={onChangeBoard}
                                    />
                                </div>
                                <div>
                                    <span>게시판 코드값 : </span>
                                    {
                                        codeStatus === 200 ?
                                            codeList.length > 0 ?
                                                <select
                                                    name="code"
                                                    value={updatedBoard?.code ?? ""}
                                                    data-index={index}
                                                    onChange={onChangeBoard}
                                                >
                                                    <option value={""}>선택</option>
                                                    {
                                                        codeList.length > 0 &&
                                                        //codeList도 게시판 안의 코드 값 설정 부분의 option에 뿌려줌
                                                        codeList.map((code) => (
                                                            <option value={code?.value}>{code?.desc ?? ""}</option>
                                                        ))
                                                    }
                                                </select>
                                                :
                                                <div>
                                                    코드 등록이 필요합니다
                                                </div>
                                            :
                                            <>
                                                <div>
                                                    <div>
                                                        <span>{codeStatus}</span>
                                                    </div>
                                                    <div>
                                                        <span>{codeStatusText}</span>
                                                    </div>
                                                </div>
                                            </>
                                    }
                                </div>
                                <div>
                                    <button onClick={() => onClickSubmitButton(updatedBoard)}>저장</button>
                                </div>
                                <div>
                                    <button onClick={() => onClickDeleteButton(updatedBoard?.id ?? 0)}>삭제</button>
                                </div>
                            </>
                        )
                        :
                        <div>
                            수정할 게시판이 없습니다.
                        </div>
                    :
                    <div>
                        <div>
                            <span>{boardStatus}</span>
                        </div>
                        <div>
                            <span>{boardStatusText}</span>
                        </div>
                    </div>
            }
        </div>
    );
}

export default UpdateBoardList;