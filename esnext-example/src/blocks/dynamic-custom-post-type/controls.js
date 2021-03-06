/**
 * External Dependencies
 */
import { controls } from '@blockhandbook/controls';
const { PostsControls } = controls;
// import { PostsControls } from '../../../../packages/controls/src';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */

const Controls = ( props ) => {
	const {
		setAttributes,
		attributes,
		taxonomies,
		attributes: {
			// put attribute key names here to use them
			postType,
		},
	} = props;

	return (
		<>
			<BlockControls></BlockControls>
			<InspectorControls></InspectorControls>
			<PostsControls
				titleToggle={ false }
				dateToggle={ false }
				authorToggle={ false }
				excerptToggle={ false }
				featuredImageToggle={ false }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
		</>
	);
}

export default Controls;
