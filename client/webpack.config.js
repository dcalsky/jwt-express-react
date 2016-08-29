var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: {
        app: ['./src/main.js'],
        vendor: ['react', 'react-dom', 'react-router']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist',
        filename: 'main.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: 'node_moudles',
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                loader: 'css-loader!style-loader'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js'
        })
    ],
    devServer: {
        contentBase: './',
        hot: true
    }
}