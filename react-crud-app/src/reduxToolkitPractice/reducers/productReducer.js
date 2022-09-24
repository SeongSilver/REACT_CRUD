import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    productList: [],
    seletedItem: null,
};

// //해당 리듀서를 리덕스 툴킷으로 바꾸는 예제
// function productReducer(state = initialState, action) {
//     let { type, payload } = action;
//     switch (type) {
//         case "GET_PRODUCT_SUCCESS":
//             return { ...state, productList: payload.data };
//         case "GET_SINGLE_PRODUCT_SUCCESS":
//             return { ...state, selectedItem: payload.data };
//         default:
//             return { ...state };
//     }
// }

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getAllProduct(state, action) {
            state.productList = action.payload.data;
        },
        getSingleProduct(state, action) {
            state.selectedItem = action.payload.date;
        },
    },
});

console.log(productSlice);

export const productActions = productSlice.actions
export default productSlice.reducer

