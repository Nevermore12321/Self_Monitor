/*
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @file: RouteGuard.js
 * @time: 2020/6/28 15:02
*/

import React, { useContext } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import GContext from '@/store/GlobalObjects';
import PropTypes from 'prop-types';

function RouteGuard(props) {
    const { loginStatusState } = useContext(GContext);
    const location = useLocation();
    const { component: SrcComponent, ...otherProps } = props;

    return (
        <Route
            { ...otherProps }
            render={
                (newProps) => (
                    loginStatusState.isLogin
                        ? <SrcComponent { ...newProps } />
                        : (<Redirect to={ { pathname: '/login', state: { from: location.pathname } } } />)
                )
            }
        />
    );
}

RouteGuard.propTypes = {
    component: PropTypes.func,
    history: PropTypes.object,
    pathname: PropTypes.string,
};

// const RouteGuard = connect(
//     (state) => ({ isLogin: state.userInfoReducer }),
// )(PreRouteGuard);
//
export default RouteGuard;
