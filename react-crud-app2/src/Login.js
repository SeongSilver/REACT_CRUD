import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from './slices/loginSlice';
import axios from 'axios';
import './Login.css';
import { useRevalidator } from 'react-router';

function Login() {
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    // let user = useSelector((state) => { return state.user });

    useEffect(() => {

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
                <button type="submit">로그인</button>
                <br />
                {msg}
            </form>
        </div>
    )
}

export default Login;