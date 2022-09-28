import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: "https://localhost:4000",
    timeout: 3000,
});

export default axiosInstance;

//axios 모듈 호출을 한곳에서만 관리하기 위해 axios.js파일을 따로 만든 것