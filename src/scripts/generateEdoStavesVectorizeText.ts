import {FontName, Px, vectorizeText} from "@sagittal/general"
import {createCanvas, registerFont} from "canvas"
import fs from "fs"
import {computeInputSentenceUnicode} from "staff-code"

const input = `
st tbcf ;
c4 nt ; /| ; nt ;
d4 \\! ; nt ; nt ; /| ; nt ;
f4 \\! ; nt ; nt ; /| ; nt ;
g4 \\! ; nt ; nt ; /| ; nt ;
a4 \\! ; nt ; nt ; /| ; nt ;
c5 \\! ; nt ; nt ;
`
const unicode = computeInputSentenceUnicode(input)

/*

I had to set the height at least this big or the line in `vectorize-text` `canvas.height = minHeight` wiped it out!
Then I would get this error:

(process:13176): Pango-WARNING **: 13:05:19.813: couldn't load font "Bravura-Text-BB Not-Rotated 256px",
falling back to "Sans Not-Rotated 256px", expect ugly output.

(process:13176): Pango-WARNING **: 13:05:19.819: couldn't load font "Bravura-Text-BB 256px",
falling back to "Sans 256px", expect ugly output.

 */
const width = 5000 as Px
const height = 832 as Px
registerFont("../../staffCode/assets/fonts/BravuraTextBB.otf", {family: "Bravura Text BB"})
const canvas = createCanvas(width, height)
const context = canvas.getContext("2d")
const pathString = vectorizeText(unicode, {font: "Bravura Text BB" as FontName, height, context})
const svgString = `<svg xmlns="http://www.w3.org/2000/svg" height="${height}" width="${width}">${pathString}</svg>`

fs.writeFileSync("dist/edoStaves.svg", svgString)
