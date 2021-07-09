/*
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @file: Step3.Success
 * @time: 2020/7/4 17:19
*/

import React from 'react';
import { Result } from 'antd';

function Step3Success() {
    return (
        <div className="step-common">
            <Result
                status="success"
                title="Successfully Registered NeverMore's Site!"
                subTitle="You can click the Done button to back to the home page!"
            />
        </div>

    );
}

export default Step3Success;
