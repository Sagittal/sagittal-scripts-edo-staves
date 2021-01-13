import {FontName, Io, Px, Sentence, vectorizeText} from "@sagittal/general"
import {createCanvas, registerFont} from "canvas"
import fs from "fs"
import {computeInputSentenceUnicode} from "staff-code"

const inputSentence = `
st tbcf ;
c4 nt ; /| ; nt ;
d4 \\! ; nt ; nt ; /| ; nt ;
f4 \\! ; nt ; nt ; /| ; nt ;
g4 \\! ; nt ; nt ; /| ; nt ;
a4 \\! ; nt ; nt ; /| ; nt ;
c5 \\! ; nt ; nt ;
`
const unicode = computeInputSentenceUnicode(inputSentence as Io & Sentence)

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

// TODO: STAFFCODE PACKAGE WILL NEED TO OFFER CJS MODULES FOR NODE TO CONSUME IT
//  Otherwise we can't even import it here
//  We can either do it like @sagittal/general does and export both
//  Or just go back to not using ESM, since no web app currently uses it
//  But I think we should do it the dual way, and add that to its README, that it can be used in either Node or browser

// TODO: VECTORIZATION OF TEXT TO SVG IN NODE
//  This doesn't work yet. Waiting on Dave's investigations into what's up with the ligatures table
//  From the very bottom of this post: http://forum.sagittal.org/viewtopic.php?p=3146#p3146
//  Okay, now he's done that: http://forum.sagittal.org/viewtopic.php?p=3193#p3193
//  I do have some more stuff I could try. I was debugging opentype.js but it spits out all code points in decimal,
//  Not hexadecimal, so I can't figure out what the hell ranges and glyphs it's talking about.
//  I'll have to inject some helper methods into their code to do some heavier duty debugging.

fs.writeFileSync("dist/edoStaves.svg", svgString)
