import { program } from "commander"
import { Filename, Io, Sentence, textToSvg, Unicode } from "@sagittal/general"
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
const { edo: edoString, flavor: flavorString }: { edo: string, flavor: string } = program.opts()
const edo: Edo = parseInt(edoString) as Edo
const flavor: Flavor = flavorString.toLowerCase() as Flavor

const inputSentence: Io & Sentence = computeStaffCodeInputSentence(edo, flavor)
console.log(inputSentence)

const unicodeSentence: Unicode & Sentence = computeInputSentenceUnicode(inputSentence)

const asyncGenerateEdoStaves = async (): Promise<void> => {
    const svgString: string = await textToSvg(unicodeSentence, { font })
    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync("dist/edoStaves.svg", svgString)
}

asyncGenerateEdoStaves().then()
