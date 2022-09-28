import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import store from './store';
import { Router } from 'react-router'

const custonHistory = createBrowserHistory({ forceRefresh: true })
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router history={custonHistory} location={custonHistory.location}>
      <App />
    </Router>
  </Provider>
);

//https://binaryjourney.tistory.com/15?category=982542