import { createSlice } from '@reduxjs/toolkit';

//createSlice는 자동으로 액션 타입과 생성함수를 만들어준다
export const articleSlice = createSlice({
    //slice의 이름
    name: 'article',
    initialState: {
        id: 0,
        title: "",
        content: "",
        views: 0,
        date: new Date(Date.now()),
        editDate: new Date(Date.now())
    },
    //reducers는 registerArticle, registerArticleAsync 2가지 reducer함수가 있는 객체
    reducers: {
        //saga에서 감시할 액션
        registerArticle: (state, { payload: article }) => {
            console.log(article);
        },
        //상태변경은 registerArticleAsync 함수는 서버 저장 후 게시물을 불러오는 데까지 이어쓴다
        registerArticleAsync: (state, { payload }) => {
            //payload값으로 articleSaga에서 보냈던 data가 들어와있음을 알 수 있다.
            console.log(payload + "이거는 articleSlice");
            debugger;
            return {
                ...state,
                id: payload.id,
            };
        },
    },
});

export const articleReducers = articleSlice.reducer;
export const articleActions = articleSlice.actions;