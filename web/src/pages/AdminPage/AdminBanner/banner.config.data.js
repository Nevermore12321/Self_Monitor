/*
 * @author: Shaohe Guo
 * @contact: 842125706@qq.com
 * @site: www.guoshaohe.com
 * @file: banner.config.data
 * @time: 2020/6/20 20:14
*/

//   配置 banner 里面的幻灯片数量，以及每张幻灯片上的 内容（children），tag表示创建的是什么元素（div、h、button等）
//  tag 特殊处理，也就是button或者其他（p h 等文本标签）
export default [
    {
        img: 'AdminPageBanner2.svg',
        className: 'slider-wrap',
        children: [
            {
                content: 'Keep Going. Keep Knwoing.',
                className: 'slider-description',
                tag: 'p',
            },
            {
                content: '郭先生的成长之路',
                className: 'slider-title',
                tag: 'h1',
            },
            {
                content: 'Welcome to my Web.',
                className: 'slider-greet',
                tag: 'p',
            },
            {
                content: '进入系统',
                className: 'banner-button',
                tag: 'button',
                link: '/home',
            },
            {
                content: 'Last Change: 2020-6-20  Location: Nanjing China',
                className: 'slider-time-location',
                tag: 'p',
            },
        ],
    },
    {
        img: 'AdminPageBanner2.svg',
        className: 'slider-wrap',
        children: [
            {
                content: 'Keep Going. Keep Knwoing.',
                className: 'slider-description',
                tag: 'p',
            },
            {
                content: '章老师的逗逼之旅',
                className: 'slider-title',
                tag: 'h1',
            },
            {
                content: 'Welcome to my Web.',
                className: 'slider-greet',
                tag: 'p',
            },
            {
                content: '进入系统',
                className: 'banner-button',
                tag: 'button',
                link: '/home',
            },
            {
                content: 'Last Change: 2020-6-20  Location: Nanjing China',
                className: 'slider-time-location',
                tag: 'p',
            },
        ],
    },
];
