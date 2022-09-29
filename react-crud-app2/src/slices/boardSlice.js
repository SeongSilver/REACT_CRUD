import { createSlice } from "@reduxjs/toolkit";

const name = "board";

//initialState는 object형태로 되어있어서 안에 내가 받고 싶은 
//자료의 이름을 key로 value에는 자료형까지도 미리 선언할 수 있다
const initialState = {
    boardList: [],
    status: 0,
    statusText: "Loading"
};

const reducers = {
    getBoardList: (state, action) => { },  //view에서 호출
    getBoardListSuccess: (state, action) => {
        {/**
        ?. : 옵셔널 체이닝
        프로퍼티가 없는 중첩 객체에 에러 없이 접근하기 위해 생긴 문법
        이전까지는 && 연산자를 사용해서 없으면 undefined를 반환하도록 했지만
        -> let user = {};
            altert(user && user.number && user.number.phhone);  //undefined
        '?.'는 왼쪽 평가대상의 값만을 평가하고 제 역할을 다한다 
        이 때 가장 왼쪽의 평가 대상 변수는 반드시 선언은 되어있어야 한다
        -> let user={};
            alert(user?.number?.phone)

        ?? : null병합 연산자
        null병합 연산자는 값이 확정되어 있는 
        */}
        state.boardList = action.payload?.data ?? [];
        state.status = action.payload?.status;
        state.statusText = action.payload?.statusText ?? "Success";
    },  //saga에서 api연결 성공시 return값적용
    getBoardListFail: (state, action) => {
        state.boardList = initialState.boardList
        state.status = action.payload?.status ?? 500;
        state.statusText = action.payload?.statusText ?? "Network Error";
    },  //api연결 실패시 리턴값 적용
};

const boardSlice = createSlice({
    name,
    initialState,
    reducers
})

//boardSlice의 boardReducer를 rootReducer에 집어넣기 - combineReducers
//위 작업 후 boardSaga만들기 - rootSaga에 boardSaga집어넣기 - Board에서 호출
export const boardReducer = boardSlice.reducer;
export const boardActions = boardSlice.actions;