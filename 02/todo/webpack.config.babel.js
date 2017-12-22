import path from 'path';
import webpack from 'webpack';

export default {
    entry: [
        'react-hot-loader/patch',
        './src/index.js',
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        inline: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(disposables)/,
                loader: 'babel-loader',
            },
        ],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
