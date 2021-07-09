/**
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @date: 2021/6/23 22:35
 * @file：test.js
 * @update: 2021/6/23 22:35
 */

import React, { useContext } from 'react';
import GContext, { GlobalProvider } from '@/store/GlobalObjects';
import { Button } from 'antd';

function TestHooks() {
    const { loginStatusState, loginStatusDispatch } = useContext(GContext);
    return (
        <div>
            <h3>useReducer+useContext≈Redux</h3>
            <div>{JSON.stringify(loginStatusState)}</div>
            <Button onClick={ ()=>{loginStatusDispatch({ type: 'LOGIN', payload: { userName: 'gsh' } });} }>
                login
            </Button>
            <Button onClick={ ()=>{loginStatusDispatch({ type: 'LOGOUT', payload: { userName: 'zy' } });} }>
                logout
            </Button>
        </div>
    );
}

export default function () {
    return (
        <div>
            <h1>
                this is a test
            </h1>
            <TestHooks />
        </div>
    );
}