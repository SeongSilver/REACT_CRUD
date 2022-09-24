import {createSlice} from '@reduxjs/toolkit';

export const articleSlice = createSlice({
    name:'article',
    initialState: {id: 0, title:"", content:"", views:0},
    reducer: {
        registerArticle:(state, article) => {
            console.log(article);
            return{
                ...article,
                id:state.id,
            };
        },
        registerArticleAsync: (state, {payload}) => {
            console.log(payload);
            debugger;
            return{
                ...state,
                id:payload.id,
            };
        },
    },
});

export const articleReducer = articleSlice.reducer;
export const articleAction = articleSlice.actions;