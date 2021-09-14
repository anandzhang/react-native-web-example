const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

module.exports = {
    mode: 'development',
    entry: resolvePath('../index.js'),
    output: {
        filename: '[name].[contenthash:8].js',
        path: resolvePath('build'),
        publicPath: '/',
    },
    // 也可以用 source-map，但是在启动时如果项目很大会比较耗时，好处是显示的错误信息更加充分
    // 可以参考：https://webpack.js.org/configuration/devtool/
    devtool: 'cheap-module-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: resolvePath('index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
        }),
    ],
    module: {
        rules: [
            // 解析 js 文件
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['module:metro-react-native-babel-preset'],
                        // 如果项目用到了装饰器等语法糖，可能需要添加相应的插件进行解析
                        plugins: ['react-native-web'],
                        configFile: false,
                    },
                },
            },
            // 解析项目用到的音频等素材
            {
                test: /\.(mp3|mp4)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'sounds',
                        esModule: false,
                    },
                },
            },
            // 解析项目使用的图片资源
            {
                test: /\.(png|jpe?g|gif)$/,
                options: {
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'images',
                    scalings: { '@2x': 2, '@3x': 3 },
                    esModule: false,
                },
                loader: 'react-native-web-image-loader',
            },
            // 解析项目用到的css样式
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            'react-native$': 'react-native-web',
            'react-native-sound': resolvePath('polyfills/Empty.js')
        },
        // 优先使用 .web.js 后缀的文件
        extensions: ['.web.js', '.js'],
    },
};
