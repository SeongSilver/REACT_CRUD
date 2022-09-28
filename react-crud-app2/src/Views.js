import React from 'react'
import Board from './views/Board'
import ChangeURL from './changeURL/ChangeURL'
import './Views.css';

function Views() {
    return (
        <div>
            <div id="header" className="header">
                <h3>Board CRUD</h3>
            </div>
            <div id="sidebar" className="sidebar">
                <Board />
            </div>
            <div id="content" className="content">
                <ChangeURL />
            </div>
        </div>
    );
}

export default Views;