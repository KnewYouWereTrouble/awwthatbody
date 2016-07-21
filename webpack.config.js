var webpack = require('webpack');

module.exports = {
    entry : [
        './views/index.jsx',
    ],
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude : /node_modules/, loader: 'react-hot!babel'},
            {test: /\.css?$/, exclude : /node_modules/, loader: 'style!css'},
            {test: /\.json$/, exclude : /node_modules/, loader: 'json-loader' },
            { test: /\.jpe?g$/, loader: "url-loader?limit=10000&minetype=image/jpeg" }
        ]
    },
    resolve: {
            modulesDirectories : ['node_modules'],
            extensions: ['', '.css', '.js', '.jsx','.webpack.js', '.web.js']
    },
    output: {
        path: __dirname + "/dist",
        publicPath: "/",
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },

    plugins : [
        new webpack.HotModuleReplacementPlugin()
    ]
};
