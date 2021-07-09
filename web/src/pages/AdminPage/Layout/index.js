/*
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @file: index.js
 * @time: 2020/6/18 15:07
*/

import React from 'react';
import { Layout } from 'antd';
import AdminHeader from '../AdminHeader';
import AdminBanner from '../AdminBanner';
import AdminHomePage from '../AdminPage';
import AdminFooter from '../AdminFooter';

export default function () {
    return (
        <Layout>
            <AdminHeader />
            <AdminBanner />
            <AdminHomePage />
            <AdminFooter />
        </Layout>
    );
}
