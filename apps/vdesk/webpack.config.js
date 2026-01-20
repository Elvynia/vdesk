const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const isProd = process.env.NODE_ENV === 'production';

module.exports = [{
	devtool: isProd ? false : 'source-map',
	mode: isProd ? 'production' : 'development',
	name: 'vdesk-nest',
	output: {
		path: join(__dirname, '../../dist/apps/vdesk'),
		clean: true,
		...(process.env.NODE_ENV !== 'production' && {
			devtoolModuleFilenameTemplate: '[absolute-resource-path]',
		}),
	},
	plugins: [
		new NxAppWebpackPlugin({
			target: 'node',
			compiler: 'tsc',
			main: './src/main.ts',
			tsConfig: './tsconfig.app.json',
			assets: [
				'./src/assets',
				'./src/templates'
			],
			optimization: isProd,
			outputHashing: 'none',
			generatePackageJson: true,
		}),
	],
}, {
	name: 'vdesk-hbs',
	dependencies: ['vdesk-nest'],
	entry: {
		"indexFake": join(__dirname, './styles/index.js'),
		"index": join(__dirname, './styles/index.css'),
		"invoice-print": join(__dirname, './styles/invoice-print.css')
	},
	output: {
		path: join(__dirname, '../../dist/apps/vdesk/styles')
	},
	module: {
		rules: [{
			test: /\.css$/i,
			// include: join(__dirname, './src/styles'),
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			],
		}]
	},
	plugins: [
		new FixStyleOnlyEntriesPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
	],
}];
