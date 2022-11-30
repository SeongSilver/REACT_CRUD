import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './slices/userSlice';
import axios from 'axios';
import './Login.css';
import { useRevalidator } from 'react-router';

function Login() {
    //axios통신 시 로그인이 성공했을 때 액션함수 파라미터로 전송한 유저 정보를 받아
    //reducer함수에서 state값을 변경
    //이렇게 저장된 state의 값은 MyPage.jsx에서 useSelector를 통해 접근하여
    //유저이름 user.name을 출력할 수 있다.
    let user = useSelector((state) => { return state.user });
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");


    useEffect(() => {
        if (msg) {
            setTimeout(() => {
                setMsg("");
                //버튼 disabled의 초기값을 false로 두고 통신을 하는 동안 메세지가
                //출력되어있는동안 에는 로그인 버튼을 다시 클릭할 수 없으므로
                //axios 통신이 이루어지는 동안에는 값을 true로 변경하고
                //1.5초 후에는 다시 false로 변경하여 버튼을 클릭할 수 있도록 한다
                setLoading(false);
            }, 1500);
        }
    }, [msg])

    const LoginFunc = (e) => {
        e.preventDefault();
        if (!id) {
            return alert("ID를 입력하세요");
        } else if (!password) {
            return alert("Password를 입력하세요");
        } else {
            let body = {
                id,
                password
            };

            axios.post(`logins`, body)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.code === 200) {
                        console.log("로그인");
                        dispatch(loginUser(res.data.userInfo));
                        setMsg("");
                    } else if (res.data.code === 400) {
                        setMsg("ID, Password가 비어있습니다");
                    } else if (res.data.code === 401) {
                        setMsg("존재하지 않는 ID입니다");
                    } else if (res.data.code === 402) {
                        setMsg("Password가 틀립니다");
                    }
                });
            setLoading(true);
        }
    }


    return (
        <div class="loginContainer" >
            <h1>로그인 구현해 봅자</h1>
            <form onSubmit={LoginFunc}>
                <div class="loginBox">
                    <span><label htmlFor="id">ID : </label></span>
                    <span><input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} /></span>
                </div>
                <br />
                <div class="loginBox">
                    <span><label htmlFor="password">Password : </label></span>
                    <span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></span>
                </div>
                <br />
                <button type="submit" disabled={loading}>로그인</button>
                <br />
                {msg}
            </form>
        </div>
    )
}

export default Login;