import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import BoardPage from './views/BoardPage/BoardPage'
import ArticlePage from './views/ArticlePage/ArticlePage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import { Redirect } from 'react-router';

import "../App.css";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<BoardPage />} />
        <Route path="/article/:articleId/" element={<ArticlePage />} />
        <Route path="/register/" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
