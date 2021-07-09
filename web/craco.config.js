/*
* - whenDev - process.env.NODE_ENV === 'development'
* - whenTest - process.env.NODE_ENV === 'test'
* - whenProd - process.env.NODE_ENV === 'production'
*/
const {
    when, whenDev, whenProd
} = require('@craco/craco')

// 判断编译环境是否为生产
const isBuildAnalyzer = process.env.BUILD_ANALYZER === 'true'

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CracoLessPlugin = require("craco-less")
const WebpackBar = require('webpackbar')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')

const path = require('path')
const pathResolve = pathUrl => path.join(__dirname, pathUrl)



module.exports = {
    webpack: {
        alias: {
            '@@': pathResolve('.'),
            '@': pathResolve('src'),
            '@assets': pathResolve('src/assets'),
            '@common': pathResolve('src/common'),
            '@components': pathResolve('src/components'),
            '@hooks': pathResolve('src/hooks'),
            '@pages': pathResolve('src/pages'),
            '@store': pathResolve('src/store'),
            '@utils': pathResolve('src/utils')
            // 此处是一个示例，实际可根据各自需求配置
        },
        plugins: [
            // // webpack构建进度条
            // new WebpackBar({
            //     profile: true
            // }),
            // // 查看打包的进度
            // new SimpleProgressWebpackPlugin(),
            // 新增模块循环依赖检测插件
            ...whenDev(
                () => [
                    new CircularDependencyPlugin({
                        exclude: /node_modules/,
                        include: /src/,
                        failOnError: true,
                        allowAsyncCycles: false,
                        cwd: process.cwd()
                    }),
                ], []
            ),
            // 打包产物分析插件
            ...when(
                isBuildAnalyzer, () => [
                    new BundleAnalyzerPlugin({
                        analyzerMode: 'static', // html 文件方式输出编译分析
                        openAnalyzer: false,
                        reportFilename: path.resolve(__dirname, `analyzer/index.html`)
                    })
                ], []
            ),
            ...whenProd(
                () => [
                    new CompressionWebpackPlugin({
                        algorithm: 'gzip',
                        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
                        threshold: 1024,
                        minRatio: 0.8
                    })
                ], []
            ),

        ]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#1DA57A',
                            // '@primary-color': '#1890ff', // 全局主色
                            '@link-color': '#1890ff', // 链'接色
                            '@success-color': '#52c41a', // 成功色
                            '@warning-color': '#faad14', // 警告色
                            '@error-color': '#f5222d', // 错误色
                            '@font-size-base': '14px', // 主字号
                            '@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
                            '@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
                            '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
                            '@disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
                            '@border-radius-base': '2px', // 组件/浮层圆角
                            '@border-color-base': '#d9d9d9', // 边框色
                            '@box-shadow-base': '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)', // 浮层阴影
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        }
    ],
    babel: {
        plugins: [
            // 添加装饰器语法
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            // antd 按需加载
            [
                "import",
                {
                    "libraryName": "antd",
                    "libraryDirectory": "es",
                    "style": true //设置为true即是less
                }
            ]
        ],
        loaderOptions: {},
        loaderOptions: (babelLoaderOptions, {
            env, paths
        }) => {
            return babelLoaderOptions
        }
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://baidu.com",
                //target: 'http://192.168.9.19:8080',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}