// axios 请求工具类
import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router';
import { TOKEN_KEY } from './const_utils';



/**
 * 请求拦截器
 */
axios.interceptors.request.use(config => {
    // 如果存在 token，请求携带这个 token
    let token = window.sessionStorage.getItem(TOKEN_KEY)
    if (token) {
        config.headers['Authorization'] = token
    }
    return config
}, error => {
    console.log(error)
})

/**
 * 请求回调响应拦截器
 */
axios.interceptors.response.use(success => {
    // 业务逻辑错误
    if (success.status && 200 == success.status) {
        
        if (success.data.code > 0) {
            Message.error(success.data.msg);
            return;
        }
        // if (500 == success.data.code || 401 == success.data.code || 403 == success.data.code ) {
        //     Message.error(success.data.msg);
        //     return;
        // }
        if (success.data.message) {
            Message.success(success.data.message);
        }
    }
    return success.data;
}, error => {
    if (error.response.code == 504 || error.response.code == 404) {
        Message.error("服务器被吃了o(╯□╰)o");
    }
    else if (error.response.code == 403) {
        Message.error("权限不足，请联系管理员");
    }
    else if (error.response.code == 401) { 
        Message.error("尚未登录，请登录");
        router.replace("/");
    }
    else {
        if (error.response.data.message) {
            Message.error(error.response.data.message);
        }
        else {
            Message.error('未知错误');
        }
    }
    return;
});


// 基础路径
let basePath = ''
/**
 * POST 请求
 * 
 * @param {*} url 请求url
 * @param {*} params 请求参数
 * @returns 
 */
export const POST = (url, params) => {
    return axios({
        method: 'post',
        url: `${basePath}${url}`,
        data: params
    })
}

/**
 * GET 请求
 * 
 * @param {*} url 请求url
 * @param {*} params 请求参数
 * @returns 
 */
 export const GET = (url, params) => {
    return axios({
        method: "get",
        url: `${basePath}${url}`,
        data: params
    })
}