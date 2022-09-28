import { createSlice } from "@reduxjs/toolkit";

const name = "board";

//initialState는 object형태로 되어있어서 안에 내가 받고 싶은 
//자료의 이름을 key로 value에는 자료형까지도 미리 선언할 수 있다
const initialState = {
    boardList: []
};

const reducers = {
    getBoardList: (state, action) => { },  //view에서 호출
    getBoardListSuccess: (state, action) => { },  //saga에서 api연결 성공시 return값적용
    getBoardListFail: (state, action) => { },  //api연결 실패시 리턴값 ㅈ거용
};

const boardSlice = createSlice({
    name,
    initialState,
    reducers
})

export const boardReducer = boardSlice.reducer;
export const boardActions = boardSlice.actions;