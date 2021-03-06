/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, ButtonGroup, Dropdown, MenuGroup, MenuItem, PanelBody, RangeControl, SelectControl, ToggleControl, ToolbarGroup } from '@wordpress/components';
import { BlockControls, ColorPalette, InspectorControls } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import icons from './icons';

const BorderControls = ( props ) => {
	const {
		setAttributes,
		slug,
		initialOpen = false,
		attributes: {
			borderColor,
			borderStyle,
			borderRadius,
			borderWidth,
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
		<>
			<BlockControls>
			{
				<ToolbarGroup>
				{
					borderRadius.toolbar &&
					<Dropdown
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Button
								icon={ icons.borderRadius }
								label={ __( 'Border Radius', 'esnext-example' ) }
								onClick={ onToggle }
								aria-haspopup="true"
								aria-expanded={ isOpen }
								showTooltip
							/>
						) }
						renderContent={ () => {
							return(
								<div className="block-editor-block-settings-menu__popover">
									<div className="components-dropdown-menu__menu esnext-example">
								{
									borderRadius.usePreset &&
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
												className={ borderRadius.preset === item.value ? 'is-active components-dropdown-menu__menu-item' : 'components-dropdown-menu__menu-item' }
												key={ item.label }
												onClick={ () => setAttributes( {
													borderRadius: {
														...borderRadius,
														preset: item.value,
													} }
												) }
											>
												{ item.label }
											</MenuItem>
										)
									})
								}
									</MenuGroup>
								}
								{
									! borderRadius.usePreset && ! borderRadius.sync &&
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
												value={ borderRadius[ side.value ] }
													beforeIcon={ syncButton( 'borderRadius', borderRadius, 'unlock' )
												}
												onChange={
													( value ) => {
														setAttributes( {
															borderRadius:
														{
															...borderRadius,
															[ side.value ]: value
														}
													} )
													}
												}
												initialPosition={ borderRadius.topLeft }
												min={ 0 }
												max={ 200 }
												step={ 1 }
											/>
										)
									} )
								}
								{
									! borderRadius.usePreset && borderRadius.sync &&
									<RangeControl
										label={ __( 'Border radius', 'esnext-example' ) }
										value={ borderRadius.topLeft }
										beforeIcon={ syncButton( 'borderRadius', borderRadius, 'lock' ) }
										onChange={
											( value ) => {
												setAttributes( {
													borderRadius:
												{
													...borderRadius,
													"topLeft": value,
													"bottomLeft": value,
													"topRight": value,
													"bottomRight": value
												}
											} )
											}
										}
										initialPosition={ borderRadius.topLeft }
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
										checked={ ! borderRadius.usePreset }
										onChange={ ( ) => setAttributes( {
											borderRadius: {
												...borderRadius,
												usePreset : ! borderRadius.usePreset
											} }
										) }
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
					borderWidth.toolbar &&
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
									borderWidth.usePreset && borderWidth.toolbar &&
									<MenuGroup>
									{
										[
											{
												label: __( 'None', 'esnext-example' ), icon: icons.borderWidthNone, value: 'border-0'
											},
											{
												label: __( 'Small', 'esnext-example' ), icon: icons.borderWidthSmall, value: 'border'
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
													className={ borderWidth.preset === item.value ? 'is-active components-dropdown-menu__menu-item' : 'components-dropdown-menu__menu-item' }
													key={ item.label }
													onClick={ () => setAttributes( {
														borderWidth: {
															...borderWidth,
															preset: item.value
														}
													} ) }
												>
													{ item.label }
												</MenuItem>
											)
										})
									}
								</MenuGroup>
								}
								{
									! borderWidth.usePreset && ! borderWidth.sync &&borderWidth.toolbar &&
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
												value={ borderWidth[ side.value ] }
													beforeIcon={ syncButton( 'borderWidth', borderWidth, 'unlock' )
												}
												onChange={
													( value ) => {
														setAttributes( {
															borderWidth:
														{
															...borderWidth,
															[ side.value ]: value
														}
													} )
													}
												}
												initialPosition={ borderWidth[ side.value ] }
												min={ 0 }
												max={ 200 }
												step={ 1 }
											/>
										)
									} )
								}
								{
									! borderWidth.usePreset && borderWidth.sync && borderWidth.toolbar &&
									<RangeControl
										label={ __( 'Border width', 'esnext-example' ) }
										value={ borderWidth.top }
										beforeIcon={ syncButton( 'borderWidth', borderWidth, 'lock' ) }
										onChange={
											( value ) => {
												setAttributes( {
													borderWidth:
												{
													...borderWidth,
													"top": value,
													"bottom": value,
													"left": value,
													"right": value
												}
											} )
											}
										}
										initialPosition={ borderWidth.top }
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
										checked={ ! borderWidth.usePreset }
										onChange={ ( ) => setAttributes( {
											borderWidth: {
												...borderWidth,
												usePreset: ! borderWidth.usePreset
											} } ) }
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
					title={ __( 'Border settings', 'esnext-example' ) }
					initialOpen={ initialOpen }
				>
					{
						borderRadius.sidebar &&
							<BaseControl
							id="border-radius"
							className={ slug }
							label={ __( 'Border Radius', 'esnext-example' ) }
						>
						<Button
							className="float-right mb-3"
							isTertiary
							isSmall
							onClick={ () => setAttributes( {
								borderRadius: {
									...borderRadius,
									usePreset: ! borderRadius.usePreset,
								} }
							) }
							>
							{ ! borderRadius.usePreset ? 'Defaults' : 'Custom' }
						</Button>
						{
							! borderRadius.usePreset && ! borderRadius.sync &&
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
										value={ borderRadius[ side.value ] }
											beforeIcon={ syncButton( 'borderRadius', borderRadius, 'unlock' )
										}
										onChange={
											( value ) => {
												setAttributes( {
													borderRadius:
												{
													...borderRadius,
													[ side.value ]: value
												}
											} )
											}
										}
										initialPosition={ borderRadius.topLeft }
										min={ 0 }
										max={ 200 }
										step={ 1 }
									/>
								)
							} )
						}
						{
							! borderRadius.usePreset && borderRadius.sync &&
							<RangeControl
								value={ borderRadius.topLeft }
								beforeIcon={ syncButton( 'borderRadius', borderRadius, 'lock' ) }
								onChange={
									( value ) => {
										setAttributes( {
											borderRadius:
										{
											...borderRadius,
											"topLeft": value,
											"bottomLeft": value,
											"topRight": value,
											"bottomRight": value
										}
									} )
									}
								}
								initialPosition={ borderRadius.topLeft }
								min={ 0 }
								max={ 200 }
								step={ 1 }
							/>
						}
						{
							borderRadius.usePreset &&
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
													isPrimary={ borderRadius.preset === item.value }
													isSecondary={ borderRadius.preset !== item.value }
													onClick={ ( ) => setAttributes( {
														borderRadius: {
															...borderRadius,
															preset: item.value,
														} }
													) }
												>{ item.label }</Button>
											);
										} )
									}
								</ButtonGroup>
							</div>
						}
						</BaseControl>
					}
					{
						borderWidth.sidebar &&
						<BaseControl
							id="border-width"
							className={ slug }
							label={ __( 'Border Width', 'esnext-example' ) }
						>
						<Button
							className="float-right mb-3"
							isTertiary
							isSmall
							onClick={ () => setAttributes( {
								borderWidth: {
									...borderWidth,
									usePreset: ! borderWidth.usePreset,
								}
							} ) }
							>
							{ ! borderWidth.usePreset ? __( 'Defaults', 'esnext-example' ) : __( 'Custom', 'esnext-example' ) }
						</Button>
						{
							! borderWidth.usePreset && ! borderWidth.sync &&
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
										value={ borderWidth[ side.value ] }
											beforeIcon={ syncButton( 'borderWidth', borderWidth, 'unlock' )
										}
										onChange={
											( value ) => {
												setAttributes( {
													borderWidth:
												{
													...borderWidth,
													[ side.value ]: value,
												}
											} )
											}
										}
										initialPosition={ borderWidth[ side.value ] }
										min={ 0 }
										max={ 200 }
										step={ 1 }
									/>
								)
							} )
						}
						{
							! borderWidth.usePreset && borderWidth.sync &&
							<RangeControl
								value={ borderWidth.top }
								beforeIcon={ syncButton( 'borderWidth', borderWidth, 'lock' ) }
								onChange={
									( value ) => {
										setAttributes( {
											borderWidth:
										{
											...borderWidth,
											"top": value,
											"bottom": value,
											"left": value,
											"right": value
										}
									} )
									}
								}
								initialPosition={ borderWidth.top }
								min={ 0 }
								max={ 200 }
								step={ 1 }
							/>
						}
						{
							borderWidth.usePreset &&
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
													isPrimary={ borderWidth.preset === item.value }
													isSecondary={ borderWidth.preset !== item.value }
													onClick={ ( ) => setAttributes( {
														borderWidth: {
															...borderWidth,
															preset: item.value
														}
													} ) }
												>{ item.label }</Button>
											);
										} )
									}
								</ButtonGroup>
							</div>
						}
						</BaseControl>
					}
					{
						borderStyle.sidebar &&
						<SelectControl
							label={ __( 'Border Style', 'esnext-example' ) }
							value={ borderStyle.style }
							options={
								[
									{ label: __( 'None', 'esnext-example' ), value: 'border-none' },
									{ label: __( 'Solid', 'esnext-example' ), value: 'border-solid' },
									{ label: __( 'Dashed', 'esnext-example' ), value: 'border-dashed' },
									{ label: __( 'Dotted', 'esnext-example' ), value: 'border-dotted' },
									{ label: __( 'Double', 'esnext-example' ), value: 'border-double' },
								]
							}
							onChange={ ( value ) => setAttributes( {
								borderStyle: {
									...borderStyle,
									"style": value,
								} }
							) }
						/>
					}
					{
						borderColor.sidebar &&
						<BaseControl
							id="border-color"
							label={ __( 'Border Color', 'esnext-example' ) }
						>
							<ColorPalette
								id="border-color"
								value={ borderColor }
								onChange={ ( color ) => setAttributes( {
									borderColor: {
										...borderColor,
										"color": color,
									} }
								)	}
							/>
						</BaseControl>
					}
				</PanelBody>
			</InspectorControls>
		</>
	);
}

export default BorderControls;
