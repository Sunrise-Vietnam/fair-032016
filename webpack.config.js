require('es6-promise').polyfill();
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');


const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    modules : path.join(__dirname,'node_modules')
};

process.env.BABEL_ENV = TARGET;

var common = {
    entry : PATHS.app,
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output : {
        path : PATHS.build,
        publicPath : '/',
        filename : (!TARGET || TARGET !== 'build') ? 'bundle.js' : 'bundle.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ["style", "css"],
                include: PATHS.app
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel?cacheDirectory'],
                include: PATHS.app
            },
            {
                test   : /\.otf|.woff|\.woff2|\.svg|.eot|\.ttf/,
                loader : 'url-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=./photos/[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins : [
        new HtmlwebpackPlugin({
            template: 'html-webpack-template.html',
            title : 'Triển lãm thế giới du học tháng 03/2016 | Sunrise Vietnam Co. , Ltd',
            mobile : true,
            appMountId: 'app',
            ogImage : '/./photos/9f8474d4192fa108648293a162bc0d2.jpg',
            favicon : 'app/photos/favicon.ico',
            gaCodes : ['UA-67504902-1'],
            goConversions : [],
            fbPixels : ['782977391770286','1146167955411692']
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
}

if(TARGET === 'start' || !TARGET){
    module.exports = merge(common,{
        devtool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env so this is easy to customize.
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    })
}

if(TARGET === 'build') {
    console.log('begin build....');
    module.exports = merge(common, {
        plugins : [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    });
}