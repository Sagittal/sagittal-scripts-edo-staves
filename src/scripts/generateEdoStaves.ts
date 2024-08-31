import { program } from "commander"
import { Filename, Io, Sentence, textToSvg } from "@sagittal/general"
import { Flavor } from "@sagittal/system"
import * as fs from "fs"
import { computeInputSentenceUnicode } from "staff-code"
import { computeStaffCodeInputSentence } from "../inputSentence"
import { Edo } from "../types"

const font = "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextSC.otf" as Filename

program
    .option("-e, --edo <number>", "edo")
    .option("-f, --flavor <string>", "flavor") // TODO: support case-insensitivity (e.g. currently "revo" works but "Revo" doesn't)

program.parse()
const { flavor, edo } = program.opts()
// const inputSentence = computeStaffCodeInputSentence(parseInt(edo) as Edo, flavor)
// console.log(inputSentence)
const inputSentence = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; ||) ;   ; nt ; 5; ||\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 5; /||| ;   ; nt ; 5; |||) ;   ; nt ; 
                9; en; bl 
                5; d4 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 
                9; en; bl 
                5; e4 5; !!!) ;   ; nt ; 5; \\!!! ;   ; nt ; 5; \\!!/ ;   ; nt ; 5; !!/ ;   ; nt ; 5; !!) ;   ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; f4 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; ||) ;   ; nt ; 5; ||\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 5; /||| ;   ; nt ; 5; |||) ;   ; nt ; 
                9; en; bl 
                5; g4 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; ||) ;   ; nt ; 5; ||\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 5; /||| ;   ; nt ; 5; |||) ;   ; nt ; 
                9; en; bl 
                5; a4 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; b4 5; !!!) ;   ; nt ; 5; \\!!! ;   ; nt ; 5; \\!!/ ;   ; nt ; 5; !!/ ;   ; nt ; 5; !!) ;   ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 
                9; en; bl 
                5; c5 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 
                3; en; bl 
                nl; 
`
const unicodeSentence = computeInputSentenceUnicode(inputSentence)

const asyncGenerateEdoStaves = async (): Promise<void> => {
    const svgString = await textToSvg(unicodeSentence, { font })
    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync("dist/edoStaves.svg", svgString)
}

asyncGenerateEdoStaves().then()
