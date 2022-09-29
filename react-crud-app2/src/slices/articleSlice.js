import { createSlice } from "@reduxjs/toolkit";

const name = "article";

const initialState = {
    article: {},
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
        state.articleList = initialState.articleList;
        state.status = action.payload?.status ?? 500;
        state.statusText = action.payload?.statusText ?? "Network Error";
    },
    getArticle: (state, action) => { },
    getArticleSuccess: (state, action) => { },
    getArticleFail: (state, action) => {
        state.article = initialState.article;
        state.status = action.payload?.status ?? 500;
        state.statusText = action.payload?.statusText ?? "Network Error";
    },

    updateArticleViews: (state, action) => { },
    updateArticleViewsSuccess: (state, action) => {
        state.article = action.payload?.data ?? {};
        state.status = action.payload?.status ?? 500;
        state.statusText = action.payload?.statusText ?? "Network Error";
    },
    updateArticleViewsFail: (state, action) => {
        state.article = initialState.article;
        state.status = action.payload?.status ?? 500;
        state.statusText = action.payload?.statusText ?? "Network Error";
    }
};

const articleSlice = createSlice({
    name,
    initialState,
    reducers
})

export const articleReducer = articleSlice.reducer;
export const articleActions = articleSlice.actions;