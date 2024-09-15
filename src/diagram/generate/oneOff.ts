import { Filename, Io, Sentence } from "@sagittal/general"
import { Edo, Flavor } from "@sagittal/system"
import { computeTitle } from "./title"
import { writeDiagramSvg } from "../svg"
import { FORMATTED_FLAVOR_NAMES } from "./constants"
import { EVO_FLAVOR_INDEX } from ".."

const generateOneOffDiagram = (
    inputSentence: Io & Sentence,
    edo: Edo,
    {
        flavor,
        useSecondBestFifth,
    }: { flavor: Flavor; useSecondBestFifth: boolean },
): Promise<void> =>
    writeDiagramSvg(
        inputSentence,
        computeTitle({
            edo,
            formattedFlavorName: FORMATTED_FLAVOR_NAMES[flavor],
            useSecondBestFifth,
        }),
        `one-off.svg` as Filename,
    ).then()

const generateOneOffGeneralDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    { useSecondBestFifth }: { useSecondBestFifth: boolean },
): Promise<void> =>
    writeDiagramSvg(
        inputSentences[EVO_FLAVOR_INDEX],
        computeTitle({
            edo,
            formattedFlavorName: "",
            useSecondBestFifth,
        }),
        `one-off.svg` as Filename,
    ).then()

export { generateOneOffDiagram, generateOneOffGeneralDiagram }
