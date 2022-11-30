import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './utils/store';
import history from './utils/history';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/**
     * 보통은 BrowserRouter를 Router로 import하여 App을 감싸기 떄문에 histroy도 필요없지만
     * redux-saga라는 외부 라이브러리에서도 history에 접근하기 위해 BrowserRouter가 아닌
     * Router를 사용하고 그 때문에 history를 Router의 props로 따로 넣어줘야 한다
     * 
     */}
    <Router history={history} location={history.location}>
      <App />
    </Router>
  </Provider>
);

