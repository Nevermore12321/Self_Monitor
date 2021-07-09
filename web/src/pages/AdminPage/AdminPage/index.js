/*
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @file: index.js
 * @time: 2020/6/23 10:38
*/

import React, { useState } from 'react';
import { Row, Col } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import RcQueueAnim from 'rc-queue-anim';
import { TweenOneGroup } from 'rc-tween-one';
import BlogIcon from '@/assets/icons/blog_admin_page.svg';
import ManagementIcon from '@/assets/icons/management_admin_page.svg';
import PlanIcon from '@/assets/icons/plan_admin_page.svg';
import Page1Data from './page1.config.data';
import './index.less';

const IconList = [
    BlogIcon,
    ManagementIcon,
    PlanIcon,
];

//  一共有7个旗袍产生 ， 他们的位置为：
const pointPos = [
    { x: -90, y: -20 },
    { x: 35, y: -25 },
    { x: -120, y: 125 },
    { x: -100, y: 165 },
    { x: 95, y: -5 },
    { x: 90, y: 160, opacity: 0.2 },
    { x: 110, y: 50 },
];

function AdminHomePage() {
    const [ hoverNum, setHoverNum ] = useState(null);

    //  鼠标 悬挂在图标上时，出现气泡
    const handleOnMouseOver = (i) => {
        setHoverNum(i);
    };

    //  鼠标 移开 操作
    const handleOnMouseOut = () => {
        setHoverNum(null);
    };

    //  鼠标 点击 操作
    const handleMouseGetEnter = (e) => {
        const i = e.index;
        const r = (Math.random() * 2) - 1;
        const y = (Math.random() * 10) + 5;
        const delay = Math.round(Math.random() * (i * 50));
        return [
            {
                delay, opacity: 0.4, ...pointPos[ e.index ], ease: 'easeOutBack', duration: 300,
            },
            {
                y: r > 0 ? `+=${ y }` : `-=${ y }`,
                duration: (Math.random() * 1000) + 2000,
                yoyo: true,
                repeat: -1,
            },
        ];
    };

    const children = Page1Data.children.map((item, index) => {
        const isHover = hoverNum === index;

        //  七种 气泡 的不同样式名称，在less文件中定义了
        const pointChild = [
            'point-ring left', 'point-ring point-ring-0 right',
            'point-0', 'point-2', 'point-1', 'point-3', 'point-2',
        ].map((className, classIndex) => (
            <i
                className={ className }
                key={ classIndex.toString() }
                style={ {
                    background: item.color,
                    borderColor: item.color,
                } }
            />
        ));
        return (
            <Col md={ 8 } xs={ 24 } key={ index.toString() } className="page1-item">
                <a
                    className="page1-item-link"
                    href={ item.link }
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={ () => { handleOnMouseOver(index); } }
                    onMouseLeave={ handleOnMouseOut }
                >
                    <TweenOneGroup
                        enter={ handleMouseGetEnter }
                        leave={ {
                            x: 0, y: 30, opacity: 0, duration: 300, ease: 'easeInBack',
                        } }
                        resetStyle={ false }
                        className="point-wrapper"
                    >
                        { isHover && pointChild }
                    </TweenOneGroup>
                    <div className="page1-item-img" style={ { boxShadow: `0 16px 32px ${ item.shadowColor }` } }>
                        <img src={ IconList[ index ] } alt="img" />
                    </div>
                    <div className="page1-item-title">{ item.title }</div>
                    <p>{ item.content }</p>
                </a>
            </Col>
        );
    });

    return (
        <div className="page-wrapper page1">
            <div className="page">
                <h1>{ Page1Data.title }</h1>
                <i />
                <OverPack>
                    <RcQueueAnim key="queue" type="bottom" leaveReverse component={ Row }>
                        { children }
                    </RcQueueAnim>
                </OverPack>
            </div>
        </div>
    );
}

export default AdminHomePage;
