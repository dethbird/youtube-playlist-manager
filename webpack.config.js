var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var isProd = (process.env.NODE_ENV === 'production');

function getPlugins() {
    var plugins = [];

    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    }));

    plugins.push(new webpack.LoaderOptionsPlugin({
        debug: true
    }))

    // Conditionally add plugins for Production builds.
    if (isProd) {
        plugins.push(new UglifyJSPlugin({
            uglifyOptions: {
                compress: true
            }
        }));
    } else {
        // ...
    }

    return plugins;
}

module.exports = {
    entry: {
        index: './src/frontend/js/pages/index.js'
    },
    mode: isProd ? 'production' : 'development',
    output: {
        path: process.cwd() + '/public/js/pages',
        filename: "[name].js"
    },
    resolve: {
        extensions: [".js", ".json", ".css"],
        modules: [
            './node_modules',
            './src/frontend/js',
            './configs'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                options: {
                    presets: [
                        ["es2015", { modules: false }],
                        "stage-2",
                        "react"
                    ],
                    plugins: [
                        "transform-node-env-inline"
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: "[name]--[local]--[hash:base64:8]"
                        }
                    },
                    "postcss-loader" // has separate config, see postcss.config.js nearby
                ]
            },
        ]
    },
    plugins: getPlugins()
}
