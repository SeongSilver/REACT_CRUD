import React from 'react';
import './CSS/Main.css';
import { RiComputerLine } from 'react-icons/ri'

function Main() {
    return (
        <div className='mainContainer'>
            <div>
                <RiComputerLine className='mainTitle' />&nbsp;&nbsp;CRUD 프로젝트
            </div>
        </div>
    )
}

export default Main