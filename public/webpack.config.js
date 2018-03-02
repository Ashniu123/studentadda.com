const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
	require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
	require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => ({
	entry: ['babel-polyfill', './src/app.js'],
	output: {
		path: path.join(__dirname, 'base', 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			loader: 'babel-loader',
			test: /\.js$/,
			exclude: /node_modules/
		}, {
			test: /\.s?css$/,
			use: ExtractTextPlugin.extract({
				use: [
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			})
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
			loader: 'url-loader?limit=10000&mimetype=application/font-woff'
		}, {
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
			loader: 'file-loader'
		}]
	},
	plugins: [
		new ExtractTextPlugin('styles.css')
	],
	devtool: env === 'production' ? 'source-map' : 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'base'),
		historyApiFallback: true,
		publicPath: '/dist/'
	}
});
