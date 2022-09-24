import React, { useState } from 'react'
import RegisterOrEdit from './Sections/RegisterOrEdit'

//saga를 타도록 할 액션함수를 RegisterPage에서 dispatch해야 한다
import { useDispatch } from 'react-redux';
import { articleActions } from '../../../slice/articleSlice';

const RegisterPage = () => {
    const dispatch = useDispatch();

    const [TitleValue, setTitleValue] = useState("");
    const [ContentValue, setContentValue] = useState("");
    const [IsForUpdate, setIsForUpdate] = useState(false);

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value);
    };

    const onContentChange = (event) => {
        setContentValue(event.currentTarget.value);
    };

    const onSubmitArticle = (event) => {
        event.preventDefault();
        const article = { title: TitleValue, content: ContentValue };
        dispatch(articleActions.registerArticle(article));
    }



    return (
        <>
            <RegisterOrEdit
                titleValue={TitleValue}
                contentValue={ContentValue}
                handleTitleChange={onTitleChange}
                handleContentChange={onContentChange}
                handleSubmit={onSubmitArticle}
                updateRequest={IsForUpdate}
            />
        </>
    )
}

export default RegisterPage;