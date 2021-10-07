const Webpack              = require('webpack');
const path                 = require('path');
const { merge } = require('webpack-merge');
const autoprefixer         = require('autoprefixer');
const ManifestPlugin       = require('webpack-manifest-plugin');
const AssetsPlugin         = require('assets-webpack-plugin');
const cssnano               = require('cssnano');
const common               = require('./webpack.common.js');

const PUBLIC_PATH = path.join(__dirname, '..','public', 'assets');

module.exports = merge(common, {
    mode       : 'production',
    devtool    : false,
    stats      : {
        colors      : true,
        hash        : true,
        timings     : true,
        assets      : true,
        chunks      : true,
        chunkModules: false,
        modules     : false,
        children    : false,
    },
    performance: {
        hints: "warning",
    },
    bail       : true,
    output     : {
        publicPath: '/',
        filename     : 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js'
    },
    plugins    : [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ManifestPlugin(),
        new AssetsPlugin({
            filename   : 'assets.json',
            path       : PUBLIC_PATH,
            prettyPrint: true,
            entrypoints: true
        }),
        new Webpack.optimize.ModuleConcatenationPlugin(),
    ],
    module     : {
        rules: [
            {
                test   : /\.js$/,
                exclude: /node_modules/,
                use    : 'babel-loader'
            },
            {
                test: /\.s?css/i,
                use : [
                    'css-loader',
                    {
                        loader : 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            autoprefixer,
                                            cssnano,
                                        },
                                    ],
                                ],
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
        ]
    }
});