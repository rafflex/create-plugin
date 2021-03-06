const path = require( 'path' );
const webpack = require( 'webpack' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

/* Plugins */

// Compile block frontend and editor scss files into css files.
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const extractStyles = new ExtractTextPlugin( './style.css' );
const extractEditorStyles = new ExtractTextPlugin( './editor.css' );

// Hot Module Replacement
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

// Remove LiveReloadPlugin if in development mode
const defaultPlugins = defaultConfig.plugins
	.map( ( plugin ) => {
		if ( plugin.constructor.name.includes( 'LiveReloadPlugin' ) ) {
			return false;
		}
		return plugin;
	} )
	.filter( ( plugin ) => plugin );

const config = {
	...defaultConfig,
	mode: 'development',
	devtool: 'source-map',
	entry: {
		index: [
			path.resolve( process.cwd(), `./src/index.js` ),
			'webpack-hot-middleware/client?name=index&timeout=20000&reload=true&overlay=true',
		],
		frontend: [
			path.resolve( process.cwd(), `./src/frontend.js` ),
			'webpack-hot-middleware/client?name=frontend&timeout=20000&reload=true&overlay=true',
		],
		variations: [
			path.resolve( process.cwd(), `./src/variations.js` ),
			'webpack-hot-middleware/client?name=frontend&timeout=20000&reload=true&overlay=true',
		],
	},
	output: {
		publicPath: `/build/`,
		path: path.resolve( process.cwd(), `./build` ),
		filename: '[name].js',
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /editor\.(sa|sc|c)ss$/,
				use: extractEditorStyles.extract( {
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
							},
						},
					],
				} ),
			},
			{
				test: /style\.(sa|sc|c)ss$/,
				use: extractStyles.extract( {
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
								prependData:
									'@import "./src/assets/scss/common.scss";\n',
							},
						},
					],
				} ),
			},
		],
	},
	plugins: [
		...defaultPlugins,
		extractStyles,
		extractEditorStyles,
		hotModuleReplacementPlugin,
	],
};

module.exports = config;
