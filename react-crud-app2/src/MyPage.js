import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from './slices/userSlice';

function MyPage() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const LogoutFunc = () => {
        console.log("로그아웃");
        dispatch(clearUser());
    }
    return (
        <div>
            <h1>마이페이지</h1>
            <p>{user.name}님 안녕하세요!</p>
            <button onClick={() => LogoutFunc()}>로그아웃</button>
        </div>
    )
}

export default MyPage