import React, { useState } from 'react'
//saga를 타도록 할 액션함수를 RegisterPage에서 dispatch해야 한다
import { useDispatch, useSelector } from 'react-redux';
import RegisterOrEdit from './Sections/RegisterOrEdit'
import { articleActions } from '../../../slice/articleSlice';
import Title from 'antd/lib/skeleton/Title';

const RegisterPage = () => {
    const dispatch = useDispatch();
    //date, editDate가 화면에서는 나타날 일이 없기 떄문에 렌더링 될 때매다
    //새로운 객체가 생겨나도 상관이 없어 하나의 useSelector에 한꺼번에 써줘도 된다
    const { views, date, editDate } = useSelector((state) => ({
        views: state.articleReducers.views,
        date: state.articleReducers.date,
        editDate: "",
    }));

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

        if (TitleValue === "" || TitleValue === null || TitleValue === undefined) {
            alert("제목을 입력하십시요.")
            return false;
        }
        if (ContentValue === "" || ContentValue === null || ContentValue === undefined) {
            alert("내용을 입력하십시요.")
            return false;
        }


        const article = {
            title: TitleValue,
            content: ContentValue,
            views: views,
            date: date,
            editDate: editDate,
        };
        //dispatch 액션에 따라 스토어에 전달 -> 리듀서에서 액션타입에따른
        //다른 payload 전달 -> 상태변경
        //이 흐름은 동기적으로 일어나므로 API같은 외부 리소스를 가져오는 경우
        //동기적인 리덕스 흐름만으로 해결할 수 없다
        //디스패치에서 리듀스를 타기 전이나 액션에서 스토어 상태 변경 전에
        //비동기 로직을 끼워넣을 수 있는데 이를 미들웨어라고 한다(redux-saga)
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