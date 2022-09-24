import React from 'react';
import {Link} from 'react-router-dom'
import BoardList from './Sections/BoardList';

function BoardPage(){
    return(
        <div>
            <div>
                <h1>Board Title</h1>
            </div>
            <div>
                <Link to='/register'>
                    <button>New Post</button>
                </Link>
            </div>
            <div>
            <BoardList/>
            </div>
        </div>
    )
}

export default BoardPage;