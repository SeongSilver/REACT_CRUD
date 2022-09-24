import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Input } from 'antd';

const { TextArea } = Input;

const RegisterOrEdit = (props) => {
    return (
        <div>
            <div className='registerOrEditBox'>
                <Link to="/">
                    <Button>←</Button>
                </Link>
            </div>
            <form onSubmit={props.handleSubmit}>
                <br />
                <div className='registerOrEditBox'>
                    <label>Title :  </label>
                    <Input
                        onChange={props.handleTitleChange}
                        value={props.titleValue}
                        type="text"
                        name="title"
                    />
                    <hr></hr>
                    <TextArea
                        onChange={props.handleContentChange}
                        value={props.contentValue}
                        name="content"
                    />
                </div>
                <Button type="danger">
                    {props.updateRequest ? "수정" : "등록"}
                </Button>
            </form>
        </div>
    )
}

export default RegisterOrEdit;