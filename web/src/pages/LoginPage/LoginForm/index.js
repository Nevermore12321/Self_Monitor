/*
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @file: index.js
 * @time: 2020/6/29 15:23
*/

import React, { useCallback, useContext, useState } from 'react';
import {
    Form, Input, Button, Checkbox, Row, Col,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Captcha from 'react-captcha-code';
import GlobalContext from '@/store/GlobalObjects';
import { withRouter } from 'react-router-dom';
import './index.less';
import { axiosPost } from '@/utils/requests.axios';
import PropTypes from 'prop-types';

function LoginForm(props) {
    //  从全局 Context 中取出 LoginStatus 的 dispatch 函数
    const { loginStatusState, loginStatusDispatch } = useContext(GlobalContext);

    const onFinish = (values) => {
        console.log('login finish');
        // todo:
        //  1.设置 isLogin = true
        //  2. 发送请求并验证
        //  3. 获取到 jwt token 存入 localstorage
        const data = {
            'username': values.username,
            'password': values.password,
        };

        console.log(data);
        axiosPost('/user/login',data).then(res => {
            console.log('login success: ', res);
            console.log('jwt token: ', res.data.accessToken);
            window.localStorage.setItem('token', res.data.accessToken);
        }).catch(err => {
            console.log('login failed: ', err);
        });

        loginStatusDispatch({ type: 'LOGIN', payload: { userName: 'loginUser' } });

        // props.loginAction();
    };

     //  用于存放 验证码
    const [ captchaCode, setCaptchaCode ] = useState(null);

    const handleChangeCaptcha = useCallback((captcha) => {
        console.log('captcha:', captcha);
        setCaptchaCode(captcha);
    }, []);

    return (
        <div className="login_form">
            <Form
                name="normal_login"
                className="login-form-all-item"
                initialValues={ {
                    remember: true,
                } }
                onFinish={ onFinish }
            >
                <Form.Item
                    name="username"
                    rules={ [
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ] }
                >
                    <Input prefix={ <UserOutlined className="site-form-item-icon" /> } placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={ [
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ] }
                >
                    <Input
                        prefix={ <LockOutlined className="site-form-item-icon" /> }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item extra="We must make sure that your are a human.">
                    <Row gutter={ 8 }>
                        <Col span={ 12 }>
                            <Form.Item
                                name="captChaInput"
                                noStyle
                                hasFeedback
                                rules={ [
                                    {
                                        required: true,
                                        message: 'Please input the captcha you got!',
                                    },
                                    () => ({
                                        validator(rule, value) {
                                            if (!value || captchaCode === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('The captcha that you entered do not match!'));
                                        },
                                    }),
                                ] }
                            >
                                <Input placeholder="Captcha" />
                            </Form.Item>
                        </Col>
                        <Col span={ 12 }>
                            <Captcha
                                charNum={ 4 }
                                onChange={ handleChangeCaptcha }
                                height={ 45 }
                                width={ 160 }
                            />
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="/forget">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="/register">register now!</a>
                </Form.Item>
            </Form>
        </div>
    );
}

// PreLoginForm.propTypes = {
//     loginAction: PropTypes.func,
// };

// const LoginForm = withRouter(connect(
//     (state) => ({ isLogin: state.isLogin }),
//     { loginAction },
// )(PreLoginForm));

export default withRouter(LoginForm);
