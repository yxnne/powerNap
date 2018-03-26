import axios from 'axios';
import { Toast } from 'antd-mobile';

const TEXT_LOADING = 'Loading';
const TIME_LOADING_DELAY = 500;

// axios设置拦截器 : 请求前拦截
axios.interceptors.request.use(config=>{
  // console.log('START RQUEST');
  Toast.loading(TEXT_LOADING, 0);
  return config;
});

// 请求后拦截
axios.interceptors.response.use(config=>{
  setTimeout(Toast.hide(), TIME_LOADING_DELAY);
  return config;
});
