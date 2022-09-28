import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// import Main from '../views/Main';
// import Article from '../views/Article';
// import ArticleList from '../views/ArticleList';
// import Post from '../views/Post';
// import Control from '../views/Control';

//url주소를 바꿔주는 기능을 하는 곳
function ChangeURL() {
    /**
     * React에서 컴포넌트 파일을 코드의 최상단에 import로 정의하고 동적으로 불러오기를 사용하면 에러가 발생한다
     * 따라서 컴포넌트를 동적으로 불러오기 위해서는 React의 lazy()를 사용해야 한다.
     * React.lazy() 메서드를 사용하면 동적 가져오기를 사용하여 구성 요소 수준에서
     * React 애플리케이션을 쉽게 코드 분할할 수 있다
     * 
     * 규모가 큰 React 애플리케이션은 많은 요소, 라이브러리 등으로 구성되는데 필요할 때만 애플리케이션의
     * 다른 부분을 로드하려고 노력하지 않으면 사용자가 첫 페이지를 로드하는 즉시 대규모 단일 Javascript번들이 
     * 사용자에게 전송된다. 이는 페이지 성능에 상당한 영향을 줄 수 있다. React.lazy 메서드 요소들을 손쉽게 개별 Javascript청크로 
     * 분리하는 기본 제공 방법을 제공한다
     * 
     * 아래의 코드처럼
     * const 컴포넌트이름 = lazy(() => import('경로/컴포넌트이름'));
     * 처럼 사용하면 된다
     */
    const Main = lazy(() => import('../views/Main'));
    const ArticleList = lazy(() => import('../views/ArticleList'));
    const Article = lazy(() => import('../views/Article'));
    const Post = lazy(() => import('../views/Post'));
    const Control = lazy(() => import('../views/Control'));

    return (
        <div>
            {/**
             *Suspense를 사용하면 컴포넌트의 렌더링을 어떤 작업이 끝날 때까지 잠시
            중단시키고 다른 컴포넌트를 먼저 랜덜이할 수 있다. 이 작업이 꼭 어떠한 작업이
            되어야 한다는 특별한 제약사항은 없지만 아무래도 REST API라 GraphQL을 호출하여
            네트워크를 통해 비동기로 데이터를 가져오는 작업을 가장먼저 떠오르게 된다

            Suspense는 어떤 컴포넌트가 읽어야 하는 데이터가 아직 
            준비가 되지 않았다고 리액트에게 알려주는 매커니즘이다

            fallback props는 컴포넌트가 로드될 때까지 기다리는 동안 렌더링하는 React 엘리먼트를 받아들인다.
            Suspense 컴포넌트는 lazy컴포넌트를 감싼다. 하나의 Suspense 컴포넌트로 여러 lazy컴포넌트를 감쌀 수도있다
            lazy컴포넌트는 Suspense 컴포넌트 하위에서 렌더링되어야 하며, Suspense는 lazy 컴포넌트가 로드되길 기다리는 동안
            로딩 화면과 같은 예비 콘텐츠를 보여줄 수 있게 해준다
             */}
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path={"/"} exact element={<Main />} />
                    <Route path={"/board/:boardId"} exact element={<ArticleList />} />
                    <Route path={"/article/:articleId"} exact element={<Article />} />
                    <Route path={"/insert"} exact element={<Post />} />
                    <Route path={"/update/:articleId"} exact element={<Post />} />
                    <Route path={"/control"} exact element={<Control />} />
                    <Route path={"*"} element={<Main />} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default ChangeURL;