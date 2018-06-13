const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'build');

const config = {
    entry: {
        main: path.join(SRC_PATH, '/main.jsx'),
        vendor: ['react', 'react-dom', 'redux', 'react-redux']
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].[hash].js',
        publicPath: '/',
        chunkFilename: '[name].[hash].js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'latest', 'stage-0'],
                    plugins: [
                        ['transform-runtime', {
                            polyfill: false,
                            regenerator: true
                        }],
                        ["import", { libraryName: "antd-mobile", style: "css" }]
                    ]
                },
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 40960,
                    name: 'images/[name].[hash:7].[ext]',

                }
            },
            {
                test: /\.(woff|svg|eot|ttf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 40960,
                    name: 'font/[name].[hash:7].[ext]',

                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
            },
            {
                test: /\.useable\.css$/,
                loaders: ['style-loader/useable', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.useable\.less$/,
                loaders: ['style-loader/useable', 'css-loader', 'postcss-loader', 'less-loader']
            }
        ],
    },
    resolve: {
       extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
        new HtmlWebpackPlugin({
            title: '巴巴汇金服',
            filename: path.join(BUILD_PATH, '/index.html'),
            template: path.join(SRC_PATH, '/index.html'),
            inject: true,
            hash: false,
            chunks: ['vendor', 'main']
        }),

    ]
}
module.exports = config;