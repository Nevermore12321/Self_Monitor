/*
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @file: Step2.Information
 * @time: 2020/7/4 17:19
*/

import React from 'react';
import {
    Form, Input, Select, DatePicker, Checkbox, Button, message,
} from 'antd';
import PropTypes from 'prop-types';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 0,
        },
    },
};

function Step2UserInfo(props) {
    const [ form ] = Form.useForm();

    //  父组件 修改 registerStatus 的 函数
    const { handleChangeRegisterStatus } = props;

    const onhandleSubmitRegister = () => {
        // todo 像后端 注册用户，注册成功 注册失败的情况
        const myResponse = 'success';
        if (myResponse === 'success') {
            handleChangeRegisterStatus(true);
        } else {
            message.error('Register Failed!');
        }
    };

    return (
        <div className="step-common">
            <Form
                { ...formItemLayout }
                name="register"
                form={ form }
                onFinish={ onhandleSubmitRegister }
                scrollToFirstError
            >
                <Form.Item
                    name="userName"
                    label="Username"
                    rules={ [
                        {
                            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
                            message: 'Please input a 4-16 characters username!',
                        },
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ] }
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={ [
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,10}$/,
                            message: 'Password must have 6-10 characters and contain at least one uppercase letter, one lowercase letter and one number.',
                        },
                    ] }
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Pwd"
                    dependencies={ [ 'password' ] }
                    hasFeedback
                    rules={ [
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ] }
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={ [
                        {
                            required: true,
                            message: 'Please slect your gender.',
                        },
                    ] }
                >
                    <Select>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="birthday"
                    label="Birthday"
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={ [
                        { validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))) },
                    ] }
                >
                    <Checkbox>
                        I have read the <a href="/">agreement</a>
                    </Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
}

Step2UserInfo.propTypes = {
    handleChangeRegisterStatus: PropTypes.func,
};

export default Step2UserInfo;
