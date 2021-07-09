/*
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @file: index.js
 * @time: 2020/6/28 10:58
*/

import React from 'react';
import { Layout } from 'antd';
import LogoImageSvg from '@/assets/logo/logo.svg';
import LoginForm from '../LoginForm';
import './index.less';

export default function () {
    return (
        <Layout className="my-login">
            <div className="my-login-form-wrapper">
                <div className="my-login-form-wrapper-brand">
                    <img src={ LogoImageSvg } alt="logo" />
                </div>
                <div className="my-login-form-wrapper-card">
                    <h2>Login</h2>
                    <LoginForm />
                </div>
                <div className="my-login-form-wrapper-footer">
                    Copyright &copy; 2020 &mdash; Shaohe Guo
                </div>
            </div>
        </Layout>
    );
}
