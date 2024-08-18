import { Filename, Io, Sentence, textToSvg } from "@sagittal/general"
import { Flavor } from "@sagittal/system"
import * as fs from "fs"
import { computeInputSentenceUnicode } from "staff-code"
import { computeStaffCodeInputSentence } from "../inputSentence"
import { Edo } from "../types"

const font = "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextSC.otf" as Filename

const inputSentence = computeStaffCodeInputSentence(67 as Edo, Flavor.REVO)
console.log(inputSentence)
const unicodeSentence = computeInputSentenceUnicode(inputSentence)

const asyncGenerateEdoStaves = async (): Promise<void> => {
    const svgString = await textToSvg(unicodeSentence, { font })
    fs.writeFileSync("dist/edoStaves.svg", svgString)
}

asyncGenerateEdoStaves().then()
