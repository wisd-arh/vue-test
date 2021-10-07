const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VueLoaderPlugin      = require('vue-loader/lib/plugin')
const SpriteLoaderPlugin   = require('svg-sprite-loader/plugin');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const Html                 = require('./Html');
const Entry                = require('./Entry');

const PUBLIC_PATH = path.join(__dirname, '../public', 'assets');
const IMG_PATH = path.join(PUBLIC_PATH, 'images');

module.exports = {
    entry: {
        ...Entry.create(),
    },
    output      : {
        path    : PUBLIC_PATH,
        filename: 'js/[name].js',
        chunkFilename:  'js/[name].js',
    },
    optimization: {
        noEmitOnErrors: true,
        splitChunks   : {
            chunks: 'all',
            name: false,
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin( { patterns: [
            {from: 'src/data', to: PUBLIC_PATH}
        ] }),
        /*new CopyWebpackPlugin([
            {from: 'src/images', to: IMG_PATH}
        ]),*/
        ...Html.create(),
        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
        new VueLoaderPlugin(),
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.pug$/,
                oneOf: [{
                    resourceQuery: /^\?vue/,
                    use: 'pug-plain-loader'
                }, {
                    use: {
                        loader: 'pug-loader',
                        options: {
                            pretty: true,
                        },
                    }
                }],
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /images[\\\/].+\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]',
                    }
                }
                ],
            },
            {
                test: /icons[\\\/].+\.svg$/i,
                use: [
                    {
                        loader: path.resolve(__dirname, './svgClean.js'),
                    },
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: 'icons/icons.svg',
                        }
                    },
                ]
            }
        ]
    }
};