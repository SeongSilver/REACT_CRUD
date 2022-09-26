import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import history from './utils/history';
import store from './store';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router history={history} location={history.location}>
      <App />
    </Router>
  </Provider>
);

//https://binaryjourney.tistory.com/15?category=982542