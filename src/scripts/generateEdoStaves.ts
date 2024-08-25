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
    .option("-f, --flavor <string>", "flavor")

program.parse()
const { flavor, edo } = program.opts()

const inputSentence = computeStaffCodeInputSentence(parseInt(edo) as Edo, flavor)
console.log(inputSentence)
const unicodeSentence = computeInputSentenceUnicode(inputSentence)

const asyncGenerateEdoStaves = async (): Promise<void> => {
    const svgString = await textToSvg(unicodeSentence, { font })
    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync("dist/edoStaves.svg", svgString)
}

asyncGenerateEdoStaves().then()
