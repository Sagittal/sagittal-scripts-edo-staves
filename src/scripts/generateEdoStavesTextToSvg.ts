import {Io, Sentence, textToSvg} from "@sagittal/general"
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
const unicodeSentence = computeInputSentenceUnicode(inputSentence as Io & Sentence)

const doThing = async (): Promise<void> => {
    const svgString = await textToSvg(unicodeSentence, {font: "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextBB.otf"})

    // TODO: maybe standardize between the two methods whether they return an SVG or SVG string
    //  But probably just clean up vectorize text when it's done
    fs.writeFileSync("dist/edoStaves.svg", svgString)
}

doThing()

// TODO: For whatever reason, this svgString's height is just = 72, which is dumb. That's just the font size.
//  But it extends beyond that. The solution is to set y to 50 so the "top" baseline is low enough that stuff that
//  Sticks out the top is still visible. Then, to fix the stuff sticking off the edge the bottom, manually, it's a quick
//  Fix. You just open the file and modify the SVG's height to be bigger. But programmatically, you'd need to write a
//  Method here that would go into the SVG string and modify the height.

