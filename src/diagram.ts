import * as fs from "fs"
import { computeInputSentenceUnicode } from "staff-code"
import { Filename, Io, Sentence, textToSvg, Unicode } from "@sagittal/general"
import { Flavor } from "@sagittal/system"
import { Edo } from "./types"
import { computeStaffCodeInputSentence } from "./inputSentence"

const font = "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextSC.otf" as Filename

const asyncGenerateDiagram = async ({ edo, flavor }: { edo: Edo, flavor: Flavor }): Promise<void> => {
    const inputSentence: Io & Sentence = computeStaffCodeInputSentence(edo, flavor)
    console.log(inputSentence)
    const unicodeSentence: Unicode & Sentence = computeInputSentenceUnicode(inputSentence)

    const svgString: string = await textToSvg(unicodeSentence, { font })
    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync(`dist/${edo}-EDO-${flavor}.svg`, svgString)
}

export {
    asyncGenerateDiagram,
}
