const tailwindcss = require( 'tailwindcss' );
const autoprefixer = require( 'autoprefixer' );
const nodeEnv = process.env.NODE_ENV;

const postcssPrependSelector = require( 'postcss-prepend-selector' )( {
	selector: '[class*="esnext-example"] ',
} );

// postcss.config.js
const purgecss = require( '@fullhuman/postcss-purgecss' )( {
	// Specify the paths to all of the template files in your project
	content: [
		'./src/**/*.js',
		// etc.
	],

	// Include any special characters you're using in this regular expression
	defaultExtractor: ( content ) => content.match( /[\w-/:]+(?<!:)/g ) || [],
} );

module.exports = {
	plugins: [
		tailwindcss( './config/tailwind.config.js' ),
		postcssPrependSelector,
		autoprefixer,
		...( nodeEnv === 'production' ? [ purgecss ] : [] ),
	],
};
