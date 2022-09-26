import { call, put } from 'redux-saga/effects';
import Axios from 'axios';
import { articleActions } from '../slice/articleSlice';
import history from '../utils/history'

export function* registerArticleAsync(action) {
    //data라는 객체애 action.payload를 보관하여
    //registerArticleAsync 액션함수를 호출하면서 
    //해당 registerArticleAsync의 payload로 data를 다시 보내준다
    const data = action.payload;
    //Axios의 post method로 data 객체를 http://localhost:4000/board
    //url로 요청을 보내주는 것이다
    //axios에서는 get으로 객체를 보낼수는 없게 되어있다
    const response = yield Axios.post(`http://localhost:4000/board/`, data);
    yield alert("저장되었습니다.");
    console.log(response.data.id);

    //history(url)과 history(url, object)는 url페이지로 이동하는 것을 둘다 같으나
    //history(url, object)일 경우 objectd는 state로 보내진다
    
    // history.push(`/article/${response.data.id}`);
    history.push(`/article/${response.data.id}`, response.data.id);

    // put은 redux-saga 버전의 dispatch라고 생각하면 된다
    // yield put(articleActions.registerArticleAsync(data));
}