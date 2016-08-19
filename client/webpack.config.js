var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: {
        app: ["./src/main.js"],
        vendor: ['react', 'react-dom', 'react-router']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: 'dist',
        filename: "main.js"
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: 'node_moudles'
            }, {
                test: /\.css$/,
                loader: "css-loader!style-loader"
            }, {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js"
        })
    ]
}