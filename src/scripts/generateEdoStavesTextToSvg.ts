import * as fs from "fs"
import {computeInputSentenceUnicode} from "staff-code"
import TextToSVG from "text-to-svg"

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

const textToSVG = TextToSVG.loadSync("../../staffCode/assets/fonts/BravuraTextBB.otf")
const options = {x: 0, y: 0, fontSize: 72, anchor: "top" as "top", attributes: {fill: "black", stroke: "black"}}
const svgString = textToSVG.getSVG(unicode, options)

fs.writeFileSync("dist/edoStaves.svg", svgString)
