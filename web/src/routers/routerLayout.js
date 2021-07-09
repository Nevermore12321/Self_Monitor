/**
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @date: 2021/6/23 22:22
 * @file：routerLayout.js
 * @update: 2021/6/23 22:22
 */

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminPage from '@/pages/AdminPage/Layout';
import LoginPage from '@/pages/LoginPage/Layout';
import RegisterPage from '@/pages/RegisterPage/Layout';
import BlogHomePage from '@/pages/BlogHomePage/Layout';
import { GlobalProvider } from '@/store/GlobalObjects';
import App from '@/test';
import RouteGuard from '@/routers/RouteGuard';

export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <GlobalProvider>
                    <Route exact path="/" component={ AdminPage } />
                    <Route exact path="/test" component={ App } />
                    <Route path="/login" component={ LoginPage } />
                    <Route path="/register" component={ RegisterPage } />
                    <RouteGuard path="/blog" component={ BlogHomePage } />
                </GlobalProvider>
            </Switch>
        </BrowserRouter>
    );
}