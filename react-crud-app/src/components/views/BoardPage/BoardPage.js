import React from 'react';
import { Link } from 'react-router-dom'
import BoardList from './Sections/BoardList';
import { Button, Typography } from 'antd';

const { Title } = Typography;

function BoardPage() {
    return (
        <div className='registerOrEditBox'>
            <div>
                <Title>Board Title</Title>
            </div>
            <div>
                <Link to='/register'>
                    <Button type="primary">New Post</Button>
                </Link>
            </div>
            <div>
                <BoardList />
            </div>
        </div>
    )
}

export default BoardPage;