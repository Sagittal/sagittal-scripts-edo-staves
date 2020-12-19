# sagittal-scripts-edo-staves
generates examples on the staff for EDO notations

## development

In order to use `vectorizeText` from the `@sagittal/general` package in Node, it is necessary to set it up with a version of HTML5 canvas:
https://github.com/Automattic/node-canvas/wiki/Installation:-Windows, which the `vectorize-text` module relies on.

Unless the `text-to-svg` solution turns out to be the way to go. It uses `opentype.js` instead, which requires no such setup.
