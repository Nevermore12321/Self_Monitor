/**
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @date: 2021/6/24 1:19
 * @file：GlobalObjects.js
 * @update: 2021/6/24 1:19
 */

import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

//  初始化  user info state
const LoginStatusInit = {
    isLogin: false,
    userName: '',
};

//  userInfoState 的 reducer 函数
const LoginStatusReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLogin: true,
                ...action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLogin: false,
                ...action.payload,
            };
        case 'ERR':
            return {
                ...state,
                isLogin: false,
                userName: '',
            };
        default:
            return state;
    }
};

// 创建全局的Context, 并且导出
const Context = createContext();
export default Context;

// 将全局useReducer返回的state和dispatch传递给全局Context.Provider的value中
function GlobalProvider (props)  {
    const { children } = props;
    const [ loginStatusState, loginStatusDispatch ] = useReducer(LoginStatusReducer, LoginStatusInit);
    return (
        <Context.Provider value={ { loginStatusState, loginStatusDispatch } }>{ children }</Context.Provider>
    );
}

GlobalProvider.propTypes = {
    children: PropTypes.any,
};

export {
    GlobalProvider,
};