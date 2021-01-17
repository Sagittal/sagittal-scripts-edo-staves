import {Io, Sentence} from "@sagittal/general"
import * as fs from "fs"
import {computeInputSentenceUnicode} from "staff-code"
// @ts-ignore
import TextToSVG from "staff-code-text-to-svg"

const inputSentence = `
ston Gcl ;
c4 nt ; /| ; nt ;
d4 \\! ; nt ; nt ; /| ; nt ;
f4 \\! ; nt ; nt ; /| ; nt ;
g4 \\! ; nt ; nt ; /| ; nt ;
a4 \\! ; nt ; nt ; /| ; nt ;
c5 \\! ; nt ; nt ;
`
const unicode = computeInputSentenceUnicode(inputSentence as Io & Sentence)

const textToSVG = TextToSVG.loadSync("./node_modules/staff-code/dist/package/assets/fonts/BravuraTextBB.otf")
const options = {x: 0, y: 50, fontSize: 72, anchor: "top" as "top", attributes: {fill: "black", stroke: "black"}, features: {liga: true}}
const svgString = textToSVG.getSVG(unicode, options)

// TODO: For whatever reason, this svgString's height is just = 72, which is dumb. That's just the font size.
//  But it extends beyond that. The solution is to set y to 50 so the "top" baseline is low enough that stuff that
//  Sticks out the top is still visible. Then, to fix the stuff sticking off the edge the bottom, manually, it's a quick
//  Fix. You just open the file and modify the SVG's height to be bigger. But programmatically, you'd need to write a
//  Method here that would go into the SVG string and modify the height.

fs.writeFileSync("dist/edoStaves.svg", svgString)
