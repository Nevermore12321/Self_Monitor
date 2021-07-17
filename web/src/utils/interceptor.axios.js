/**
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @date: 2021/7/17 18:41
 * @file：interceptor.axios.js
 * @update: 2021/7/17 18:41
 */

import axios from 'axios';
import React from 'react';
import ReactDom from 'react-dom';
import { Spin } from 'antd';

//  服务器站点
axios.defaults.baseURL = '/api/v1';
//  是否跨站点
axios.defaults.withCredentials = true;
//  设置 请求头
axios.defaults.headers[ 'Content-Type' ] = 'application/json';

//  请求计数器，判断当前有多少个请求
let requestCounter = 0;

//  显示 loading 的函数，当 requestCounter 为 0 时， 显示 loading 组件Spin
//  如果 requestCounter 不为0 ，说明已经有 request 开启 loading 了
function showLoading() {
    if (requestCounter === 0) {
        // 创建一个 放 Spin 的 div
        const dom = document.createElement('div');
        dom.setAttribute('id', 'loading');
        document.body.appendChild(dom);
        ReactDom.render(<Spin tip="Loading ..." size="large"/>, dom);
    }
    requestCounter += 1;
}

//  隐藏 loading 的函数， 首先收到response后，首先要把这个请求去掉，然后判断 requestCounter 是否为0
//  如果 requestCounter 为0， 表示已经没有了请求，需要隐藏 loading
function hideLoading() {
    requestCounter -= 1;

    if (requestCounter === 0) {
        document.body.removeChild(document.getElementById('loading'));
    }
}

//  发送请求前，做一些预处理，添加token，加载 loading
axios.interceptors.request.use((reqConfig) => {
    //  从 localStorage 中拿到 token
    const { token } = window.localStorage;
    const newReqConfig = reqConfig;
    if (token) {
        newReqConfig.headers.Authorization = `token ${ token }`;
    }

    // 添加loading组件, 如果requestCounter 不是0，就 增加1
    showLoading();

    return newReqConfig;
}, (error) => {
    //  隐藏loading组件, 如果requestCounter 不是0，就 减去1
    hideLoading();

    return Promise.reject(error);
});

//  收到响应后，在处理前做一些预处理，无论是否出错，都取消 loading
axios.interceptors.response.use((resConfig) => {
    //  隐藏loading组件, 如果requestCounter 不是0，就 减去1
    hideLoading();
    console.log('before response');
    return resConfig;
}, (error) => {
    const newError = error;

    //  隐藏loading组件, 如果requestCounter 不是0，就 减去1
    hideLoading();

    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                newError.message = '错误请求';
                break;
            case 401:
                newError.message = '未授权，请重新登录';
                break;
            case 403:
                newError.message = '拒绝访问';
                break;
            case 404:
                newError.message = '请求错误,未找到该资源';
                break;
            case 405:
                newError.message = '请求方法未允许';
                break;
            case 408:
                newError.message = '请求超时';
                break;
            case 500:
                newError.message = '服务器端出错';
                break;
            case 501:
                newError.message = '网络未实现';
                break;
            case 502:
                newError.message = '网络错误';
                break;
            case 503:
                newError.message = '服务不可用';
                break;
            case 504:
                newError.message = '网络超时';
                break;
            case 505:
                newError.message = 'http版本不支持该请求';
                break;
            default:
                newError.message = `连接错误${ error.response.status }`;
        }
    } else {
        newError.message = '连接到服务器失败';
    }
    return Promise.reject(newError.message);
});

export default axios;