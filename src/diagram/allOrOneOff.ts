import { Filename, Io, Sentence, Index } from "@sagittal/general"
import { Edo, Flavor } from "@sagittal/system"
import { computeFilename, computeTitle } from "./filenameAndTitle"
import { asyncGenerateDiagram } from "./diagram"
import { FORMATTED_FLAVOR_NAMES } from "./constants"
import { EVO_FLAVOR_INDEX } from "."

const generateDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    {
        flavorIndex,
        formattedFlavorName,
        dryRun,
        useSecondBestFifth,
    }: {
        flavorIndex: Index<Flavor>
        formattedFlavorName: Io
        dryRun: boolean
        useSecondBestFifth: boolean
    },
): void => {
    const inputSentence: Io & Sentence = inputSentences[flavorIndex]
    const title: Io = computeTitle({
        edo,
        formattedFlavorName,
        useSecondBestFifth,
    })
    const filename: Filename = computeFilename({
        edo,
        formattedFlavorName,
        useSecondBestFifth,
    })

    console.log(`\n\n${title}\n\n${inputSentence}`)

    if (!dryRun) asyncGenerateDiagram(inputSentence, title, filename).then()
}

const generateOneOffDiagram = (
    inputSentence: Io & Sentence,
    edo: Edo,
    {
        flavor,
        useSecondBestFifth,
    }: { flavor: Flavor; useSecondBestFifth: boolean },
): Promise<void> =>
    asyncGenerateDiagram(
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
    asyncGenerateDiagram(
        inputSentences[EVO_FLAVOR_INDEX],
        computeTitle({
            edo,
            formattedFlavorName: "",
            useSecondBestFifth,
        }),
        `one-off.svg` as Filename,
    ).then()

export { generateDiagram, generateOneOffDiagram, generateOneOffGeneralDiagram }
