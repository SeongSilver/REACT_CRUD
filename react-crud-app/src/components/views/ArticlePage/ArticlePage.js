import React from 'react'
// import { useParams } from 'react-router-dom'

const ArticlePage = ({ match, location }) => {

    const { articleId } = useParams();
    console.log({ articleId } + "articlePage 확인")
    console.dir({ articleId });
    return (
        <div>
            ArticlePage-{articleId}
        </div>
    )
}

export default ArticlePage;