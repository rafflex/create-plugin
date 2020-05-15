/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, ButtonGroup, Dropdown, MenuGroup, MenuItem, PanelBody, RangeControl, SelectControl, ToggleControl, ToolbarGroup } from '@wordpress/components';
import { BlockControls, ColorPalette, InspectorControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import icons from './icons';

const BorderControls = ( props ) => {
	const {
		setAttributes,
		slug,
		borderWidthToolbar = true,
		borderRadiusToolbar = true,
		initialOpen = false,
		attributes: {
			borderColor,
			borderRadius,
			borderStyle,
			borderWidth,
			customBorderRadius,
			customBorderWidth,
			useCustomBorderRadius,
			useCustomBorderWidth,
		},
	} = props;

	const syncButton = ( property, object, icon ) => <Button 
		onClick={ () => setAttributes( {
			[ property ]: {
				...object,
				"sync": ! object.sync,
			}
		} )
		} 
		icon={ icon } 
	/>;

	return (
		<Fragment>
			<BlockControls>
			{
				( borderWidthToolbar || borderRadiusToolbar ) &&
				<ToolbarGroup>
				{
					borderRadiusToolbar &&
					<Dropdown						
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Button
								icon={ icons.borderRadius }
								label={ __( 'Border Radius', 'esnext-example' ) }
								onClick={ onToggle }
							/>
						) }
						renderContent={ () => {
							return(
								<div className="block-editor-block-settings-menu__popover">
									<div className="components-dropdown-menu__menu esnext-example">	
								{
									!	useCustomBorderRadius &&
									<MenuGroup>
									{
									[
										{ 
											label: __( 'None', 'esnext-example' ), icon: icons.borderRadiusNone, value: 'rounded-none' 
										},
										{ 
											label: __( 'Small', 'esnext-example' ), icon: icons.borderRadiusSmall, value: 'rounded-sm' 
										},
										{ 
											label: __( 'Medium', 'esnext-example' ), icon: icons.borderRadiusMedium, value: 'rounded' 
										},
										{ 
											label: __( 'Large', 'esnext-example' ), icon: icons.borderRadiusLarge, value: 'rounded-md' 
										},
										{ 
											label: __( 'X-Large', 'esnext-example' ), icon: icons.borderRadiusXLarge, value: 'rounded-lg' 
										},
									].map( ( item ) => {
										return(
											<MenuItem
												icon={ item.icon }
												className={ borderRadius === item.value ? 'is-active components-dropdown-menu__menu-item' : 'components-dropdown-menu__menu-item' }
												key={ item.label } 
												onClick={ () => setAttributes( { borderRadius: item.value } ) }
											>
												{ item.label }
											</MenuItem>
										)
									})
								}
									</MenuGroup>
								}
								{
									useCustomBorderRadius && ! customBorderRadius.sync &&
									[
										{ label: __( 'Top Left' ), value: "topLeft" },
										{ label: __( 'Top Right' ), value: "topRight" },
										{ label: __( 'Bottom Right' ), value: "bottomRight" },
										{ label: __( 'Bottom Left' ), value: "bottomLeft" },							
									].map( ( side ) => {
										return(
											<RangeControl
												key={ side.value }
												label={ side.label }
												value={ customBorderRadius[ side.value ] }
													beforeIcon={ syncButton( 'customBorderRadius', customBorderRadius, 'unlock' ) 
												}
												onChange={
													( value ) => {
														setAttributes( { 
														customBorderRadius: 
														{ 
															...customBorderRadius,
															[ side.value ]: value
														}
													} )
													}
												}
												initialPosition={ customBorderRadius.topLeft }
												min={ 0 }
												max={ 200 }
												step={ 1 }
											/>
										)
									} )
								}
								{
									useCustomBorderRadius && customBorderRadius.sync &&
									<RangeControl
										label={ __( 'Border radius', 'esnext-example' ) }
										value={ customBorderRadius.topLeft }
										beforeIcon={ syncButton( 'customBorderRadius', customBorderRadius, 'lock' ) }
										onChange={
											( value ) => {
												setAttributes( { 
												customBorderRadius: 
												{ 
													...customBorderRadius,
													"topLeft": value,
													"bottomLeft": value,
													"topRight": value,
													"bottomRight": value
												}
											} )
											}
										}
										initialPosition={ customBorderRadius.topLeft }
										min={ 0 }
										max={ 200 }
										step={ 1 }
									/>
								}		
								<MenuGroup>				
								<div className={ slug }	>
									<ToggleControl
										className="px-3 pt-3"
										label={ __( 'Custom', 'esnext-example' ) }
										checked={ useCustomBorderRadius }
										onChange={ ( ) => setAttributes( { useCustomBorderRadius: ! useCustomBorderRadius } ) }
									/>
								</div>
								</MenuGroup>	
							</div>
								</div>
							) } 
						}
					/>
				}
				{
					borderWidthToolbar &&
					<Dropdown						
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Button
								icon={ icons.borderWidthXLarge }
								label={ __( 'Border Width', 'esnext-example' ) }
								onClick={ onToggle }
							/>
						) }
						renderContent={ () => {
							return(
								<div className="block-editor-block-settings-menu__popover">
									<div className="components-dropdown-menu__menu esnext-example">	
								{
									!	useCustomBorderWidth &&
									<MenuGroup>
									{
										[
											{ 
												label: __( 'None', 'esnext-example' ), icon: icons.borderWidthNone, value: 'border-0' 
											},
											{ 
												label: __( 'Smalls', 'esnext-example' ), icon: icons.borderWidthSmall, value: 'border' 
											},
											{ 
												label: __( 'Medium', 'esnext-example' ), icon: icons.borderWidthMedium, value: 'border-2' 
											},
											{ 
												label: __( 'Large', 'esnext-example' ), icon: icons.borderWidthLarge, value: 'border-4' 
											},
											{ 
												label: __( 'X-Large', 'esnext-example' ), icon: icons.borderWidthXLarge, value: 'border-8' 
											},
										].map( ( item ) => {
											return(
												<MenuItem
													icon={ item.icon }
													className={ borderWidth === item.value ? 'is-active components-dropdown-menu__menu-item' : 'components-dropdown-menu__menu-item' }
													key={ item.label } 
													onClick={ () => setAttributes( { borderWidth: item.value } ) }
												>
													{ item.label }
												</MenuItem>
											)
										})
									}
								</MenuGroup>
								}
								{
									useCustomBorderWidth && ! customBorderWidth.sync &&
									[
										{ label: __( 'Top' ), value: "top" },
										{ label: __( 'Right' ), value: "right" },
										{ label: __( 'Bottom' ), value: "bottom" },
										{ label: __( 'Left' ), value: "left" },
									].map( ( side ) => {
										return(
											<RangeControl
												key={ side.value }
												label={ side.label }
												value={ customBorderWidth[ side.value ] }
													beforeIcon={ syncButton( 'customBorderWidth', customBorderWidth, 'unlock' ) 
												}
												onChange={
													( value ) => {
														setAttributes( { 
															customBorderWidth: 
														{ 
															...customBorderWidth,
															[ side.value ]: value
														}
													} )
													}
												}
												initialPosition={ customBorderWidth[ side.value ] }
												min={ 0 }
												max={ 200 }
												step={ 1 }
											/>
										)
									} )
								}
								{
									useCustomBorderWidth && customBorderWidth.sync &&
									<RangeControl
										label={ __( 'Border width', 'esnext-example' ) }
										value={ customBorderWidth.top }
										beforeIcon={ syncButton( 'customBorderWidth', customBorderWidth, 'lock' ) }
										onChange={
											( value ) => {
												setAttributes( { 
												customBorderWidth: 
												{ 
													...customBorderWidth,
													"top": value,
													"bottom": value,
													"left": value,
													"right": value
												}
											} )
											}
										}
										initialPosition={ customBorderWidth.top }
										min={ 0 }
										max={ 200 }
										step={ 1 }
									/>
								}
								<MenuGroup>				
								<div className={ slug }	>
									<ToggleControl
										className="px-3 pt-3"
										label={ __( 'Custom', 'esnext-example' ) }
										checked={ useCustomBorderWidth }
										onChange={ ( ) => setAttributes( { useCustomBorderWidth: ! useCustomBorderWidth } ) }
									/>
								</div>
								</MenuGroup>	
							</div>
								</div>
							) } 
						}
					/>
				}
				</ToolbarGroup>
			}
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Border Settings', 'esnext-example' ) }
					initialOpen={ initialOpen }
				>
					<BaseControl
						id="border-radius"
						className={ slug }
						label={ __( 'Border Radius', 'esnext-example' ) }
					>
					<Button 
						className="float-right mb-3"
						isTertiary
						isSmall
						onClick={ () => setAttributes( { useCustomBorderRadius: ! useCustomBorderRadius } ) }
						>
						{ useCustomBorderRadius ? 'Defaults' : 'Custom' }
					</Button>
					{
						useCustomBorderRadius && ! customBorderRadius.sync &&
						[
							{ label: __( 'Top Left' ), value: "topLeft" },
							{ label: __( 'Top Right' ), value: "topRight" },
							{ label: __( 'Bottom Right' ), value: "bottomRight" },
							{ label: __( 'Bottom Left' ), value: "bottomLeft" },							
						].map( ( side ) => {
							return(
								<RangeControl
									key={ side.value }
									label={ side.label }
									value={ customBorderRadius[ side.value ] }
										beforeIcon={ syncButton( 'customBorderRadius', customBorderRadius, 'unlock' ) 
									}
									onChange={
										( value ) => {
											setAttributes( { 
											customBorderRadius: 
											{ 
												...customBorderRadius,
												[ side.value ]: value
											}
										} )
										}
									}
									initialPosition={ customBorderRadius.topLeft }
									min={ 0 }
									max={ 200 }
									step={ 1 }
								/>
							)
						} )
					}
					{
						useCustomBorderRadius && customBorderRadius.sync &&
						<RangeControl
							value={ customBorderRadius.topLeft }
							beforeIcon={ syncButton( 'customBorderRadius', customBorderRadius, 'lock' ) }
							onChange={
								( value ) => {
									setAttributes( { 
									customBorderRadius: 
									{ 
										...customBorderRadius,
										"topLeft": value,
										"bottomLeft": value,
										"topRight": value,
										"bottomRight": value
									}
								} )
								}
							}
							initialPosition={ customBorderRadius.topLeft }
							min={ 0 }
							max={ 200 }
							step={ 1 }
						/>
					}
					{
						! useCustomBorderRadius &&
						<div className="flex justify-between">							
								<ButtonGroup
									id="border-radius"
								>
								{
									[
										{ label: __( 'None', 'esnext-example' ), value: 'rounded-none' },
										{ label: 'S', value: 'rounded-sm' },
										{ label: 'M', value: 'rounded' },
										{ label: 'L', value: 'rounded-md' },
										{ label: 'XL', value: 'rounded-lg' },
									].map( ( item ) => {
										return (
											<Button
												key={ item.label }
												isPrimary={ borderRadius === item.value }
												isSecondary={ borderRadius !== item.value }
												onClick={ ( ) => setAttributes( { borderRadius: item.value } ) }
											>{ item.label }</Button>
										);
									} )
								}
							</ButtonGroup>
						</div>
					}
					</BaseControl>
					<BaseControl
						id="border-width"
						className={ slug }
						label={ __( 'Border Width', 'esnext-example' ) }
					>
					<Button 
						className="float-right mb-3"
						isTertiary
						isSmall
						onClick={ () => setAttributes( { useCustomBorderWidth: ! useCustomBorderWidth } ) }
						>
						{ useCustomBorderWidth ? __( 'Defaults', 'esnext-example' ) : __( 'Custom', 'esnext-example' ) }
					</Button>
					{
						useCustomBorderWidth && ! customBorderWidth.sync &&
						[
							{ label: __( 'Top' ), value: "top" },
							{ label: __( 'Right' ), value: "right" },
							{ label: __( 'Bottom' ), value: "bottom" },
							{ label: __( 'Left' ), value: "left" },
						].map( ( side ) => {
							return(
								<RangeControl
									key={ side.value }
									label={ side.label }
									value={ customBorderWidth[ side.value ] }
										beforeIcon={ syncButton( 'customBorderWidth', customBorderWidth, 'unlock' ) 
									}
									onChange={
										( value ) => {
											setAttributes( { 
												customBorderWidth: 
											{ 
												...customBorderWidth,
												[ side.value ]: value
											}
										} )
										}
									}
									initialPosition={ customBorderWidth[ side.value ] }
									min={ 0 }
									max={ 200 }
									step={ 1 }
								/>
							)
						} )
					}
					{
						useCustomBorderWidth && customBorderWidth.sync &&
						<RangeControl
							value={ customBorderWidth.top }
							beforeIcon={ syncButton( 'customBorderWidth', customBorderWidth, 'lock' ) }
							onChange={
								( value ) => {
									setAttributes( { 
									customBorderWidth: 
									{ 
										...customBorderWidth,
										"top": value,
										"bottom": value,
										"left": value,
										"right": value
									}
								} )
								}
							}
							initialPosition={ customBorderWidth.top }
							min={ 0 }
							max={ 200 }
							step={ 1 }
						/>
					}
					{
						! useCustomBorderWidth &&
						<div className="flex justify-between">							
								<ButtonGroup
									id="border-width"
								>
								{
									[
										{ label: __( 'None', 'esnext-example' ), value: 'border-0' },
										{ label: 'S', value: 'border' },
										{ label: 'M', value: 'border-2' },
										{ label: 'L', value: 'border-4' },
										{ label: 'XL', value: 'border-8' },
									].map( ( item ) => {
										return (
											<Button
												key={ item.label }
												isPrimary={ borderWidth === item.value }
												isSecondary={ borderWidth !== item.value }
												onClick={ ( ) => setAttributes( { borderWidth: item.value } ) }
											>{ item.label }</Button>
										);
									} )
								}
							</ButtonGroup>
						</div>
					}
					</BaseControl>
					<SelectControl
						label={ __( 'Border Style', 'esnext-example' ) }
						value={ borderStyle }
						options={
							[
								{ label: __( 'None', 'esnext-example' ), value: 'border-none' },
								{ label: __( 'Solid', 'esnext-example' ), value: 'border-solid' },
								{ label: __( 'Dashed', 'esnext-example' ), value: 'border-dashed' },
								{ label: __( 'Dotted', 'esnext-example' ), value: 'border-dotted' },
								{ label: __( 'Double', 'esnext-example' ), value: 'border-double' },
							]
						}
						onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
					/>
					<BaseControl
						id="border-color"
						label={ __( 'Border Color', 'esnext-example' ) }
					>
						<ColorPalette
							id="border-color"
							value={ borderColor }
							onChange={ ( color ) => setAttributes( { borderColor: color } )	}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}

export default BorderControls;