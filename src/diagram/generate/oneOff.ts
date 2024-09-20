import { Filename, Io, Sentence } from "@sagittal/general"
import { Edo, EdoStep, Flavor } from "@sagittal/system"
import { computeTitle } from "./title"
import { writeDiagramSvg } from "../svg"
import { EVO_FLAVOR_INDEX, FORMATTED_FLAVOR_NAMES } from "./constants"

const ONE_OFF_FILENAME: Filename = `one-off.svg` as Filename

const generateOneOffDiagram = async (
    inputSentence: Io & Sentence,
    edo: Edo,
    {
        flavor,
        useSecondBestFifth,
    }: { flavor: Flavor; useSecondBestFifth: boolean },
): Promise<void> => {
    const title: Io = computeTitle({
        edo,
        flavorTitlePart: FORMATTED_FLAVOR_NAMES[flavor],
        useSecondBestFifth,
    })
    const filename = ONE_OFF_FILENAME

    await writeDiagramSvg({
        inputSentence,
        title,
        filename,
        edo,
        useSecondBestFifth,
    })
}

const generateOneOffGeneralDiagram = async (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    { useSecondBestFifth }: { useSecondBestFifth: boolean },
): Promise<void> => {
    const inputSentence: Io & Sentence = inputSentences[EVO_FLAVOR_INDEX]
    const title: Io = computeTitle({
        edo,
        flavorTitlePart: "",
        useSecondBestFifth,
    })
    const filename = ONE_OFF_FILENAME

    await writeDiagramSvg({
        inputSentence,
        title,
        filename,
        edo,
        useSecondBestFifth,
    })
}

export { generateOneOffDiagram, generateOneOffGeneralDiagram }
