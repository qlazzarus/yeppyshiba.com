import path from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default <Configuration>{
    entry: {
        app: './src/app.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src/')
        }
    },    
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
        chunkFilename: '[id].js'
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new DefinePlugin({
            CANVAS_RENDERER: true,
            GAME_WIDTH: 640,
            GAME_HEIGHT: 360,
            WEBGL_RENDERER: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./assets",
                    to: "./assets",
                    force: true
                }
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './template.html',
            minify: {
                collapseWhitespace: true
            }
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    devServer: {
        open: true,
        hot: true,
        devMiddleware: {
            publicPath: '/'
        },
        static: {
            directory: path.resolve(__dirname, 'dist')
        }
    }
}