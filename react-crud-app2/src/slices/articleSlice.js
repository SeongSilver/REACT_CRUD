import { createSlice } from "@reduxjs/toolkit";

const name = "article";

const initialState = {
    articleList: [],
    status: 0,
    statusText: "Loading",
};

const reducers = {
    getArticleList: (state, action) => { },
    getArticleListSuccess: (state, action) => {
        state.articleList = action.payload?.data ?? [];
        state.status = action.payload?.status;
        state.statusText = action.payload?.statusText ?? "Success";
    },
    getArticleListFail: (state, action) => {
        state.articleList = action.payload?.data ?? [];
        state.status = action.payload?.status ?? 500;
        state.statusText = action.payload?.statusText ?? "Network Error";
    },
};

const articleSlice = createSlice({
    name,
    initialState,
    reducers
})

export const articleReducer = articleSlice.reducer;
export const articleActions = articleSlice.actions;