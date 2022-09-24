import React, { useState } from 'react'
import RegisterOrEdit from './Sections/RegisterOrEdit'

const RegisterPage = () => {
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
        console.log(article)
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