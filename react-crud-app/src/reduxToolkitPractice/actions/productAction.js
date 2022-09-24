import { productActions } from '../reducers/productReducer'

function getProducts(searchQuery) {
    return async (dispatch, getState) => {
        let url = `https://my-json-server/typicode.com/legobitna/hnm-react-router-product?q=${searchQuery}`
        let response = await fetch(url);
        let data = await response.json();
        // dispatch({ type: "GET_PRODUCT_SUCCESS", payload: { data } });
        //매개변수로 전달된 값은 알아서 payload라는 필드 아래로 들어감
        dispatch(productActions.getAllProduct({ data }));
    }
}

function getProductDetail(id) {
    return async (dispatch) => {
        let url = `https://my-json-server.typicode.com/legobitna/noona-hnm/products/${id}`;
        let response = await fetch(url);
        let data = await response.json();
        // dispatch({ type: "GET_SINGLE_PRODUCT_SUCCESS", payload: { data } });
        dispatch(productActions.getSingleProduct({ data }));
    }
}

export const productAction = { getProducts, getProductDetail };