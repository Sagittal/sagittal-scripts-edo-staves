import { Filename, Io, Sentence } from "@sagittal/general"
import { EdoName, Flavor } from "@sagittal/system"
import { computeTitle } from "./title"
import { writeDiagramSvg } from "../svg"
import { EVO_FLAVOR_INDEX, FORMATTED_FLAVOR_NAMES, GENERAL_FLAVOR_INDEX } from "./constants"

const ONE_OFF_FILENAME: Filename = `one-off.svg` as Filename

const generateOneOffDiagram = async (
    inputSentence: Io & Sentence,
    edoName: EdoName,
    flavor: Flavor,
): Promise<void> => {
    const title: Io = computeTitle({
        edoName,
        flavorTitlePart: FORMATTED_FLAVOR_NAMES[flavor],
    })
    const filename = ONE_OFF_FILENAME

    await writeDiagramSvg({
        inputSentence,
        title,
        filename,
        edoName,
        flavor,
    })
}

const generateOneOffGeneralDiagram = async (
    inputSentences: (Io & Sentence)[],
    edoName: EdoName,
): Promise<void> => {
    const inputSentence: Io & Sentence = inputSentences[GENERAL_FLAVOR_INDEX]
    const title: Io = computeTitle({
        edoName,
        flavorTitlePart: "",
    })
    const filename = ONE_OFF_FILENAME

    await writeDiagramSvg({
        inputSentence,
        title,
        filename,
        edoName,
        flavor: Flavor.REVO, // anything but Evo-SZ is okay here, to prevent the /|\ → t
    })
}

const generateOneOffAlternateEvoDiagram = async (
    inputSentences: (Io & Sentence)[],
    edoName: EdoName,
): Promise<void> => {
    const inputSentence: Io & Sentence = inputSentences[EVO_FLAVOR_INDEX]
    const title: Io = computeTitle({
        edoName,
        flavorTitlePart: `Alternative ${FORMATTED_FLAVOR_NAMES[Flavor.EVO]}`,
    })
    const filename = ONE_OFF_FILENAME

    await writeDiagramSvg({
        inputSentence,
        title,
        filename,
        edoName,
        flavor: Flavor.EVO,
    })
}

export { generateOneOffDiagram, generateOneOffGeneralDiagram, generateOneOffAlternateEvoDiagram }
