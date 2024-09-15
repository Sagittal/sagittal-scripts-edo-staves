import * as fs from "fs"
import { computeInputSentenceUnicode } from "staff-code"
import {
    Filename,
    Io,
    Sentence,
    Index,
    textToSvg,
    Unicode,
} from "@sagittal/general"
import { Edo, Flavor } from "@sagittal/system"
import { addTitle } from "./title"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_TITLE_FONT_SIZE,
} from "./constants"
import { getSvgDocumentFromString, getSvgStringFromDocument } from "./svg"
import { setSvgSize } from "./size"
import { shiftStavesDown } from "./shift"

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

    let svgString: string = await textToSvg(unicodeSentence, {
        font: BRAVURA_TEXT_SC_FONT_FILE,
        fontSize: BRAVURA_TEXT_SC_TITLE_FONT_SIZE,
    })
    const svgDocument: Document = getSvgDocumentFromString(svgString)
    setSvgSize(svgDocument)
    shiftStavesDown(svgDocument)
    addTitle(svgDocument, title)
    svgString = getSvgStringFromDocument(svgDocument)

    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync(`dist/${filename}`, svgString)
}

const generateDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    {
        flavorIndex,
        formattedFlavorName,
        dryRun,
        useSecondBestFifth,
    }: { flavorIndex: Index<Flavor>; formattedFlavorName: Io; dryRun: boolean, useSecondBestFifth: boolean },
): void => {
    const inputSentence: Io & Sentence = inputSentences[flavorIndex]
    const title: Io = `${formattedFlavorName}${
        formattedFlavorName.length === 0 ? "" : " "
    }Sagittal notation for ${edo}-EDO${useSecondBestFifth ? " (w/ 2nd best fifth)" : ""}`
    const filename: Filename = `${edo}-EDO${
        formattedFlavorName.length === 0 ? "" : "_"
    }${formattedFlavorName.replace(/ /g, "_")}${useSecondBestFifth ? "_b" : ""}.svg` as Filename

    console.log(`\n\n${title}\n\n${inputSentence}`)

    if (!dryRun) asyncGenerateDiagram(inputSentence, title, filename).then()
}

const generateOneOffDiagram = (
    inputSentence: Io & Sentence,
    edo: Edo,
    { flavor, useSecondBestFifth }: { flavor: Flavor, useSecondBestFifth: boolean },
): Promise<void> =>
    asyncGenerateDiagram(
        inputSentence,
        `${FORMATTED_FLAVOR_NAMES[flavor]} Sagittal notation for ${edo}-EDO${useSecondBestFifth ? " (w/ 2nd best fifth)" : ""}`,
        `one-off.svg` as Filename,
    ).then()

const generateOneOffGeneralDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    { useSecondBestFifth }: { useSecondBestFifth: boolean }
): Promise<void> =>
    asyncGenerateDiagram(
        inputSentences[EVO_FLAVOR_INDEX],
        `Sagittal notation for ${edo}-EDO${useSecondBestFifth ? " (w/ 2nd best fifth)" : ""}`,
        `one-off.svg` as Filename,
    ).then()

const generateGeneralDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    { dryRun, useSecondBestFifth }: { dryRun: boolean, useSecondBestFifth: boolean },
): void =>
    generateDiagram(inputSentences, edo, {
        formattedFlavorName: "",
        flavorIndex: REVO_FLAVOR_INDEX,
        dryRun,
        useSecondBestFifth,
    })

const generateEvoDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    { dryRun, useSecondBestFifth }: { dryRun: boolean, useSecondBestFifth: boolean },
): void =>
    generateDiagram(inputSentences, edo, {
        formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.EVO],
        flavorIndex: EVO_FLAVOR_INDEX,
        dryRun,
        useSecondBestFifth,
    })

const generateEvoSZDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    { dryRun, useSecondBestFifth }: { dryRun: boolean, useSecondBestFifth: boolean },
): void =>
    generateDiagram(inputSentences, edo, {
        formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.EVO_SZ],
        flavorIndex: EVO_SZ_FLAVOR_INDEX,
        dryRun,
        useSecondBestFifth,
    })

const generateRevoDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    { dryRun, useSecondBestFifth }: { dryRun: boolean, useSecondBestFifth: boolean },
): void =>
    generateDiagram(inputSentences, edo, {
        formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.REVO],
        flavorIndex: REVO_FLAVOR_INDEX,
        dryRun,
        useSecondBestFifth,
    })

const generateAlternativeEvoDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    { dryRun, useSecondBestFifth }: { dryRun: boolean, useSecondBestFifth: boolean },
): void =>
    generateDiagram(inputSentences, edo, {
        formattedFlavorName: `Alternative ${
            FORMATTED_FLAVOR_NAMES[Flavor.EVO]
        }`,
        flavorIndex: EVO_FLAVOR_INDEX,
        dryRun,
        useSecondBestFifth,
    })

export {
    generateGeneralDiagram,
    generateEvoDiagram,
    generateEvoSZDiagram,
    generateRevoDiagram,
    generateOneOffDiagram,
    generateOneOffGeneralDiagram,
    generateAlternativeEvoDiagram,
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    REVO_FLAVOR_INDEX,
}
