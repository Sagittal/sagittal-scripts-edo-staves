import {FontName, Io, Sentence, textToSvg} from "@sagittal/general"
import * as fs from "fs"
import {computeInputSentenceUnicode} from "staff-code"

const font = "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextBB.otf" as FontName

// TODO: When it gets to the finesse stage, Dave says there should be ~7; between the notes.
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

const asyncGenerateEdoStaves = async (): Promise<void> => {
    const svgString = await textToSvg(unicodeSentence, {font})

    fs.writeFileSync("dist/edoStaves.svg", svgString)
}

asyncGenerateEdoStaves().then()
