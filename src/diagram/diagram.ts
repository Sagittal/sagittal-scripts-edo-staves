import * as fs from "fs"
import { computeInputSentenceUnicode } from "staff-code"
import {
    Filename,
    Io,
    Sentence,
    Index,
    textToSvg,
    Unicode,
    isUndefined,
} from "@sagittal/general"
import { Edo, Flavor } from "@sagittal/system"
import { addTitle } from "./title"

const BRAVURA_TEXT_SC_FONT_FILE: Filename =
    "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextSC.otf" as Filename

const FORMATTED_FLAVOR_NAMES: Record<Flavor, Io> = {
    [Flavor.EVO]: "Evo",
    [Flavor.EVO_SZ]: "Evo-SZ",
    [Flavor.REVO]: "Revo",
}

const EVO_FLAVOR_INDEX: Index<Flavor> = 0 as Index<Flavor>
const EVO_SZ_FLAVOR_INDEX: Index<Flavor> = 1 as Index<Flavor>
const REVO_FLAVOR_INDEX: Index<Flavor> = 2 as Index<Flavor>

const asyncGenerateDiagram = async (
    inputSentence: Io & Sentence,
    title: Io,
    filename: Filename,
): Promise<void> => {
    const unicodeSentence: Unicode & Sentence =
        computeInputSentenceUnicode(inputSentence)

    const svgString: string = await textToSvg(unicodeSentence, {
        font: BRAVURA_TEXT_SC_FONT_FILE,
    })
    const modifiedSvgString: string = addTitle(svgString, title)

    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync(`dist/${filename}`, modifiedSvgString)
}

const generateDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    {
        flavorIndex,
        formattedFlavorName,
        dryRun,
    }: { flavorIndex: Index<Flavor>; formattedFlavorName: Io; dryRun: boolean },
): void => {
    const inputSentence: Io & Sentence = inputSentences[flavorIndex]
    const title: Io = `${formattedFlavorName}${
        formattedFlavorName.length === 0 ? "" : " "
    }Sagittal notation for ${edo}-EDO`
    const filename: Filename = `${edo}-EDO${
        formattedFlavorName.length === 0 ? "" : "_"
    }${formattedFlavorName}.svg` as Filename

    console.log(`\n\n${title}\n\n${inputSentence}`)

    if (!dryRun) asyncGenerateDiagram(inputSentence, title, filename).then()
}

const generateOneOffDiagram = (
    inputSentence: Io & Sentence,
    edo: Edo,
    { flavor }: { flavor: Flavor },
): Promise<void> =>
    asyncGenerateDiagram(
        inputSentence,
        `${FORMATTED_FLAVOR_NAMES[flavor]} Sagittal notation for ${edo}-EDO`,
        `one-off.svg` as Filename,
    ).then()

const generateGeneralDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    { dryRun }: { dryRun: boolean },
): void =>
    generateDiagram(inputSentences, edo, {
        formattedFlavorName: "",
        flavorIndex: EVO_FLAVOR_INDEX,
        dryRun,
    })

const generateEvoDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    { dryRun }: { dryRun: boolean },
): void =>
    generateDiagram(inputSentences, edo, {
        formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.EVO],
        flavorIndex: EVO_FLAVOR_INDEX,
        dryRun,
    })

const generateEvoSZDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    { dryRun }: { dryRun: boolean },
): void =>
    generateDiagram(inputSentences, edo, {
        formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.EVO_SZ],
        flavorIndex: EVO_SZ_FLAVOR_INDEX,
        dryRun,
    })

const generateRevoDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    { dryRun }: { dryRun: boolean },
): void =>
    generateDiagram(inputSentences, edo, {
        formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.REVO],
        flavorIndex: REVO_FLAVOR_INDEX,
        dryRun,
    })

export {
    generateGeneralDiagram,
    generateEvoDiagram,
    generateEvoSZDiagram,
    generateRevoDiagram,
    generateOneOffDiagram,
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    REVO_FLAVOR_INDEX,
}
