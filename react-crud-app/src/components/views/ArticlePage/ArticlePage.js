import React from 'react'

const ArticlePage = ({ match, location }) => {
    console.log(match.params.articleId)
    return (
        <div>
            ArticlePage-{match.params.articleId}
        </div>
    )
}

export default ArticlePage;