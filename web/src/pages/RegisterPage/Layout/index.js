/*
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @file: index.js
 * @time: 2020/7/3 15:56
*/

import React from 'react';
import { Layout } from 'antd';
import LogoImageSvg from '@/assets/logo/logo.svg';
import RegisterSteps from '../RegisterSteps';
import RegisterForm from '../RegisterForm';
import './index.less';

export default function () {
    return (
        <Layout className="register-form">
            <div className="register-form-wrapper-brand">
                <img src={ LogoImageSvg } alt="logo" />
            </div>
            <div className="register-form-wrapper-card">
                <h2>Register</h2>
                <RegisterSteps>
                    <RegisterForm />
                </RegisterSteps>
            </div>
            <div className="register-form-wrapper-footer">
                Copyright &copy; 2020 &mdash; Shaohe Guo
            </div>
        </Layout>

    );
}
