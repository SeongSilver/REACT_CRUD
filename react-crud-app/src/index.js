import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import { Router} from 'react-router';
import  history  from './utils/history';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router history={history} location={history.location}>
      <App/>
    </Router>
  </Provider>
);

//https://binaryjourney.tistory.com/15?category=982542