/*
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @file: Step1.VerifyEmail
 * @time: 2020/7/4 17:17
*/

import React, { useEffect, useState } from 'react';
import {
    Form, Input, Button, message,
} from 'antd';
import { MailOutlined, CheckCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

function SendEmailForm(props) {
    const [ form ] = Form.useForm();

    //  使用 forceUpdate 每次强制 更新 表单
    const [ , forceUpdate ] = useState();

    //  父组件 传递 的 修改 btnShowBool 值的函数
    const { emailState } = props;

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onHandleSendEmail = (values) => {
        let maxLoadingTime = emailState.loadingTime;

        //  TODO: ajax backend send email
        console.log(values);

        //  按钮 变灰
        emailState.handleChangeBtnShowBool(false);
        //  按钮开启倒计时
        const timer = setInterval(() => {
            if (maxLoadingTime <= 0) {
                emailState.handleChangeBtnShowBool(true);
                emailState.handleChangeLoadingTime(90);
                console.log(emailState.loadingTime);
                clearInterval(timer);
            } else {
                maxLoadingTime -= 1;
                emailState.handleChangeLoadingTime(maxLoadingTime);
            }
        }, 1000);
    };

    return (
        <Form
            form={ form }
            name="send_email"
            layout="inline"
            className="send-email-form"
            onFinish={ onHandleSendEmail }
        >
            <Form.Item
                name="email"
                rules={ [
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ] }
            >
                <Input prefix={ <MailOutlined className="site-form-item-icon" /> } placeholder="Email" />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={ !emailState.btnShowBool }
                    className="login-form-button"
                >
                    { emailState.btnShowBool ? 'send' : `Retrieve ${ emailState.loadingTime }s` }
                </Button>
            </Form.Item>
        </Form>
    );
}

SendEmailForm.propTypes = {
    emailState: PropTypes.object,
};

function VerifyCaptchaForm(props) {
    const [ form ] = Form.useForm();

    const [ , forceUpdate ] = useState();

    const { verifyCode, handleChangeCaptchaStatus } = props;

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onHandleVerifyCode = (value) => {
        // todo 验证码是否验证成功
        // if (value.verifyCode === verifyCode) {
        if (value.verifyCode === 'aaaaaa') {
            handleChangeCaptchaStatus(true);
        } else {
            message.error('Incorrect Verification Code');
        }
        console.log(value.verifyCode);
        console.log(verifyCode);
        console.log(value);
    };

    return (
        <Form
            form={ form }
            name="verify_captcha"
            layout="inline"
            className="send-email-form"
            onFinish={ onHandleVerifyCode }
        >
            <Form.Item
                name="verifyCode"
                rules={ [
                    {
                        required: true,
                        message: 'Please input your captcha from email!',
                    },
                    {
                        message: 'The format of the captcha is incorrect',
                        pattern: /^[0-9a-zA-Z]{6}$/,
                    },
                ] }
            >
                <Input prefix={ <CheckCircleOutlined className="site-form-item-icon" /> } placeholder="Captcha" />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >
                    Verify
                </Button>
            </Form.Item>
        </Form>
    );
}

VerifyCaptchaForm.propTypes = {
    verifyCode: PropTypes.string,
    handleChangeCaptchaStatus: PropTypes.func,
};

function Step1VerifyEmail(props) {
    //  使用 forceUpdate 每次强制 更新 表单
    const [ , forceUpdate ] = useState();
    //  用于 表示 按钮不可点击
    const [ btnShowBool, setBtnShowBool ] = useState(true);
    //  等待时间 90
    const [ loadingTime, setLoadingTime ] = useState(5);
    //  邮件中的验证码
    const [ verifyCode, setVerifyCode ] = useState('');

    //  从 父组件中拿到 修改验证码是否验证成功的 函数
    const { handleChangeCaptchaStatus } = props;

    useEffect(() => {
        forceUpdate({});
    }, []);

    //  父组件 传入子组件 修改 state 的函数用于调用
    const handleChangeLoadingTime = (value) => {
        setLoadingTime(value);
    };

    const handleChangeBtnShowBool = (value) => {
        setBtnShowBool(value);
    };

    const handleVerifyCode = (value) => {
        setVerifyCode(value);
    };

    const emailState = {
        btnShowBool,
        handleChangeBtnShowBool,
        loadingTime,
        handleChangeLoadingTime,
        verifyCode,
        handleVerifyCode,
    };

    return (
        <div className="step-common">
            <SendEmailForm
                loadingTime={ loadingTime }
                emailState={ { ...emailState } }
            />
            <VerifyCaptchaForm
                verifyCode={ verifyCode }
                handleChangeCaptchaStatus={ handleChangeCaptchaStatus }
            />
        </div>
    );
}

Step1VerifyEmail.propTypes = {
    handleChangeCaptchaStatus: PropTypes.func,
};

export default Step1VerifyEmail;
