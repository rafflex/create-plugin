
# BoxShadowControls

Toolbar & InspectorControls for adding box shadow settings to blocks:
![BoxShadowControls in the WordPress block editor sidebar & toolbar](https://blockhandbook.com/wp-content/uploads/2020/05/BoxShadowControls-screenshot.png)

Add the following attributes to block.json:

```json
{
 "name": "plugin-name/dynamic-block",
 "attributes": {
  "boxShadow" : {
   "type": "string",
   "default": "shadow-xl"
  },
  "useCustomBoxShadow" : {
   "type": "boolean",
   "default": false
  },
  "customBoxShadow" : {
   "type": "object",
   "default": {
    "x": 6,
    "y": 6,
    "blur": 0,
    "spread": 0,
    "opacity": 20
   }
  },
  "boxShadowColor" : {
   "type": "string",
   "default": "#000000"
  }
 }
```

How to use it:

```javascript
import { BoxShadowControls } from '@blockhandbook/tailwindcss';

const Edit = ( props ) => {
 const {
  setAttributes,
  attributes,
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

 const rowClasses = classnames(
  `p-10 bg-white overflow-hidden`,
  {
   [ `${ boxShadow }` ]: ! useCustomBoxShadow,
  }
 );

 const containerStyle = {
  '--tw-box-shadow-color': boxShadowColor,
 }

 const rowStyle = {
  boxShadow: useCustomBoxShadow ? `${ customBoxShadow.x }px ${ customBoxShadow.y }px ${ customBoxShadow.blur }px ${ customBoxShadow.spread }px rgba( ${ boxShadowColor }, ${ customBoxShadow.opacity / 100 } )` : null
 };

 return (
  <div
    className={ containerClasses }
    style={ containerStyle }
  >
    <div className={ rowClasses } rowStyle={ rowStyle }>
      <BoxShadowControls
        slug={ slug }
        boxShadowToolbar={ false }
        initialOpen={ true }
        attributes={ attributes }
        setAttributes={ setAttributes }
      />
      <p className={ className }>
        { __(
        'BoxShadowControls example.',
        'plugin-name'
        ) }
      </p>
    </div>
  </div>
 );
}

export default Edit;
```

To get the default styles box-shadow color to work, you're going to have do a little work. I'm assuming your using the @blockhandbook/tailwindcss package.  Add the following settings to tailwind.config.js file:

```javascript
const nodeEnv = process.env.NODE_ENV;

const config = {
 theme: {
  boxShadow: {
   default: 'var( --tw-box-shadow )',
   md: 'var( --tw-box-shadow-md )',
   lg: 'var( --tw-box-shadow-lg )',
   xl: 'var( --tw-box-shadow-xl )',
  },
 },
 variants: {},
 purge: {
  enabled: nodeEnv === 'production' ? true : false,
  content: [
   './src/**/*.js',
  ],
 },
 plugins: [
  require( 'tailwindcss' ),
  require( 'autoprefixer' )
 ],
};

module.exports = config;

```

Finally, add the following styles to whatever file you're using as your global block css file. I'm using a common.scss file in this structure:

```text
plugin-name
├── build
├── src
│    ├── assets
│    │   └── scss
│    │       └── common.scss
│    ├── blocks
│    │   ├── block-1
│    │   │   └── index.js
│    │   ├── block-2
│    │   │   └── index.js
│    │   └── block-3
│    │       └── index.js
│    ├── index.js
│    └── index.js
├── tailwind.config.js
├── plugin-name.php
├── webpack.config.js
└── package.json

```

Finally, add the following to your global block css file ( common.scss ):

```scss
// Custom namespace
[class*="plugin-name"] {
  --tw-box-shadow-color: 0,0,0;

    /* Box Shadow */
 --tw-box-shadow: 0 1px 3px 0 rgba( var( --tw-box-shadow-color ), 0.1), 0 1px 2px 0 rgba( var( --tw-box-shadow-color ), 0.06);
 --tw-box-shadow-md:0 4px 6px -1px rgba( var( --tw-box-shadow-color ), 0.1), 0 2px 4px -1px rgba( var( --tw-box-shadow-color ), 0.06);
 --tw-box-shadow-lg:0 10px 15px -3px rgba( var( --tw-box-shadow-color ), 0.1), 0 4px 6px -2px rgba( var( --tw-box-shadow-color ), 0.05);
 --tw-box-shadow-xl:0 20px 25px -5px rgba( var( --tw-box-shadow-color ), 0.1), 0 10px 10px -5px rgba( var( --tw-box-shadow-color ), 0.04);
}
```

## props available

```text
boxShadowToolbar
```

Show boxShadow settings in the toolbar.  Defaults to true.

```test
initialOpen
```

Set border settings panel to initially open in sidebar.  Defaults to false.