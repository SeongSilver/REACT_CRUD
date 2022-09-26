import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardPage from './views/BoardPage/BoardPage'
import ArticlePage from './views/ArticlePage/ArticlePage';
import RegisterPage from './views/RegisterPage/RegisterPage';

import "../App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BoardPage />} />
        <Route path="/article/:articleId/" element={<ArticlePage />} component={<ArticlePage/>} />
        <Route path="/register/" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
