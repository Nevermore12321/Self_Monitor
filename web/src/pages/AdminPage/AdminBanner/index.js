/*
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @file: index
 * @time: 2020/6/19 22:43
*/

import React from 'react';
import 'rc-banner-anim/assets/index.css';
import RcQueueAnim from 'rc-queue-anim';
import RcBannerAnim, { Element } from 'rc-banner-anim';
import './index.less';
import { Button } from 'antd';
import BannerImage2 from '@/assets/background/AdminPageBanner1.svg';
import BannerImage1 from '@/assets/background/AdminPageBanner2.svg';
import BannerData from './banner.config.data';

const ImageList = [ BannerImage1, BannerImage2 ];
const { BgElement } = Element;
 
//  进出场动画：  'rc-queue-anim'
//  页面滚动动画： 'rc-scroll-anim '
//  Banner动画：  'rc-banner-anim'
//  单元素动画：   'rc-tween-one'
function AdminBanner() {
    //  把配置文件的 所有 内容都渲染成 组件
    const BannerList = BannerData.map((item, index) => {
        //  slide 内部 的一些 button 和 文本 tag, 如果 tag 没有定义，就为 p 标签
        const BannerChildren = item.children.map((childItem, childIndex) => {
            //  初始化需要创建什么样的tag 标签，需要区别 button 和其他文本标签
            const tag = childItem.tag === 'button' ? 'div' : childItem.tag || 'p';

            //  tagRenderComp 为 tag 实际被渲染成的组件
            const tagRenderComp = childItem.tag === 'button'
                ? <Button><a href={ childItem.link } target="_blank" rel="noopener noreferrer">{ childItem.content }</a></Button>
                : childItem.content;

            //  使用 React.createElement  来创建 React 组件
            return React.createElement(tag, {
                key: childIndex.toString(),
                className: childItem.className,
                style: childItem.style || {},
            }, tagRenderComp);
        });

        //  返回 根据  BannerData 返回的所有组件
        //  RcBannerAnim 是所有 banner 组件的 大框架
        //  Element 是每一张 幻灯片的框架： 通过 data 定义 其他 组件
        //  BgElement、RcQueueAnim、RcTweenOne、

        return (
            <Element key={ index.toString() }>
                <BgElement
                    key="bgPic"
                    className="banner-bgPic"
                    style={ {
                        // backgroundImage: `url(${ item.img })`,
                        backgroundImage: `url(${ ImageList[ index ] })`,
                        backgroundRepeat: 'no-repeat',
                    } }
                />
                <RcQueueAnim
                    key="text"
                    className={ item.className }
                    ease={ [ 'easeOutCubic', 'easeInQuad' ] }
                    type={ item.queueAnim || 'bottom' }
                >
                    { BannerChildren }
                </RcQueueAnim>
            </Element>
        );
    });

    //  RcBannerAnim 包裹了一整个幻灯片效果
    //  Element 每页幻灯片效果， 每个Element有唯一的key， prefixCls 表示自定义样式， followParallax 表示跟随鼠标上下或左右晃动效果
    //  followParallax 是一个对象：可以添加属性
    return (
        <div className="banner page-wrapper">
            <div className="page">
                <div className="logo" />
                <RcBannerAnim type="across" duration={ 550 } ease="easeInOutQuint">
                    { BannerList }
                </RcBannerAnim>
            </div>
        </div>
    );
}

export default AdminBanner;
