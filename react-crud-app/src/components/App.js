import React from 'react';
import {Route, Routes} from 'react-router-dom';
import BoardPage from './views/BoardPage/BoardPage'
import ArticlePage from './views/ArticlePage/ArticlePage';
import RegisterPage from './views/RegisterPage/RegisterPage';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<BoardPage/>}/>
        <Route exact path="/article/:articleId" element={<ArticlePage/>}/>
        <Route exact path="/register" element={<RegisterPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
