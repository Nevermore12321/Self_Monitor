/*
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @file: index.js
 * @time: 2020/6/18 15:06
*/

import React from 'react';
import { Row, Col } from 'antd';
import './index.less';
import FooterData from './footer.config.data';

export default function () {
    const footerList = FooterData.map((item, index) => {
        const childFooterList = item.children.map((childItem, childIndex) => (
            <div key={ childIndex.toString() }>
                <a href={ childItem.link } target="_blank" rel="noopener noreferrer">
                    {childItem.title}
                    {childItem.desc
                        ? (
                            <span style={ { color: 'rgba(255, 255, 255, 0.65)' } }>
                                - {childItem.desc}
                            </span>
                        )
                        : null}
                </a>
            </div>
        ));

        return (
            <Col key={ index.toString() } md={ 8 } xs={ 24 } className="footer-item-col">
                <div className="footer-item">
                    <h2>
                        {item.title}
                    </h2>
                    {childFooterList}
                </div>
            </Col>
        );
    });
    return (
        <footer className="footer page-wrapper">
            <div className="footer-wrap page">
                <Row>
                    {footerList}
                </Row>
            </div>
            <div className="footer-bottom">
                <div className="page">
                    <Row>
                        <Col md={ 4 } xs={ 24 } style={ { textAlign: 'left' } }>
                            <a
                                href="/"
                                rel="noopener noreferrer"
                                target="_blank"
                                style={ { color: 'rgba(256, 256, 256, 0.9)', textAlign: 'left' } }
                            >
                                提出建议
                            </a>
                        </Col>
                        <Col md={ 20 } xs={ 24 }>
                            <span style={ { lineHeight: '16px', paddingRight: 12, marginRight: 11 } }>
                                CopyRight
                            </span>
                            <span style={ { marginRight: 12 } }>
                                ©2020 Shaohe Guo. All rights reserved.
                            </span>
                        </Col>
                    </Row>
                </div>

            </div>
        </footer>
    );
}
