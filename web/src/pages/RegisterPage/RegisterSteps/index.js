/*
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @file: index
 * @time: 2020/7/3 23:23
*/

import React, { useState } from 'react';
import { Steps, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './index.less';

const { Step } = Steps;

function RegisterSteps(props) {
    const [ current, setCurrent ] = useState(0);
    //  第一步 的邮箱验证是否正确
    const [ captchaStatus, setCaptchaStatus ] = useState(false);
    //  第二步 的 后台注册有没有成功
    const [ registerStatus, setRegisterStatus ] = useState(false);
    const { children, history } = props;
    console.log('history: ', history);
    //  steps 的长度
    const stepsLength = 3;
    //  Next 按钮的操作
    const next = () => {
        setCurrent(current + 1);
    };

    //  用于修改  captchaStatus 状态的 函数
    const handleChangeCaptchaStatus = (value) => {
        setCaptchaStatus(value);
    };

    //  用于修改  registerStatus 状态的 函数
    const handleChangeRegisterStatus = (value) => {
        setRegisterStatus(value);
    };

    //  Previous 按钮的操作
    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <div className="register-steps">
            <Steps current={ current }>
                <Step title="Verify" description="Verify your email." />
                <Step title="Information" description="Improve information." />
                <Step title="Success" description="Complete registration." />
            </Steps>
            <div className="steps-content">
                { children
                && React.cloneElement(children, {
                    current,
                    captchaStatus,
                    handleChangeCaptchaStatus,
                    registerStatus,
                    handleChangeRegisterStatus,
                }) }
            </div>
            <div className="steps-action">
                { current < stepsLength - 1 && (
                    <Button
                        type="primary"
                        onClick={ () => next() }
                        disabled={
                            current === 0
                            ? !captchaStatus
                            : !registerStatus
                        }
                    >
                        Next
                    </Button>
                ) }
                { current === stepsLength - 1 && (
                    <Button type="primary" onClick={ () => history.push({ pathname: '/' }) }>
                        Done
                    </Button>
                ) }
                {current === 1 && (
                    <Button style={ { margin: '0 8px' } } onClick={ () => prev() }>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
}

RegisterSteps.propTypes = {
    children: PropTypes.object,
    history: PropTypes.object,
};

export default withRouter(RegisterSteps);
