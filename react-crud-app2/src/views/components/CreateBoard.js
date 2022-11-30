import React, { useEffect, useState } from 'react';
import { createDispatchHook, useDispatch, useSelector } from 'react-redux';
import { boardActions } from '../../slices/boardSlice';
import { codeActions } from '../../slices/codeSlice';

function CreateBoard({ setShowCreateBoard }) {
    /**
     * codeReducer의 status, statusText는 CreateBoard 컴포넌트에서 
     * codeStatus, codeStatusText 변수에 담겨 사용된다
     */
    const { codeList, codeStatus, codeStatusText } = useSelector((state) => ({
        codeList: state.codeReducer.codeList,
        codeStatus: state.codeReducer.status,
        codeStatusText: state.codeReducer.statusText
    }));

    const [board, setBoard] = useState({});
    const dispatch = useDispatch();

    function onChangeArticle(e) {
        setBoard({
            ...board,
            [e.currentTatrget.name]: e.currentTarget.value
        });
    }

    function onClickSubmitButton() {
        if (board?.name) {
            dispatch(boardActions.postBoard({
                board,
                setShowCreateBoard
            }));
        } else {
            alert("게시판 이름은 필수값입니다");
        }
    }

    useEffect(() => {
        //코드리스트를 목록에서 다시 부르는 이유는 설정부분에서 코드가 실시간으로 수정되거나
        //신규로 등록되거나 삭제될 수 있기 때문에 이를 반영하고자 함이다
        dispatch(codeActions.getCodeList());
    }, [dispatch])

    return (
        <>
            {
                codeStatus === 200 ?
                    codeList.length > 0 ?
                        <div>
                            <div>
                                <span>게시판 명 : </span>
                                <input name="name" onChange={onChangeArticle} />
                            </div>
                            <div>
                                <span>사용 코드 : </span>
                                <select name="code" onChange={onChangeArticle}>
                                    <option value="">선택</option>
                                    {
                                        codeList.map((code) => (
                                            <option value={code?.value}>{code?.desc ?? ""}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <button onClick={onClickSubmitButton}>등록</button>
                            </div>
                        </div>
                        :
                        <div>
                            코드 등록이 필요합니다.
                        </div>
                    :
                    <div>
                        <div>
                            <span>{codeStatus}</span>
                        </div>
                        <div>
                            <span>{codeStatusText}</span>
                        </div>
                    </div>
            }
        </>
    );
}

export default CreateBoard;