import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';
import { useParams } from 'react-router-dom'

const { TextArea } = Input;

const RegisterOrEdit = (props) => {
    const { articleId } = useParams();

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
                    <div className='registerOrEditBox'>
                        <Button type="danger" onClick={props.handleSubmit}>
                            {props.updateRequest ? "수정" : "등록"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterOrEdit;