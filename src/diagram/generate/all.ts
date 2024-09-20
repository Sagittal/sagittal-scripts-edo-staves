import { Filename, Io, Sentence, Index } from "@sagittal/general"
import { Edo, Flavor } from "@sagittal/system"
import { computeTitle } from "./title"
import { writeDiagramSvg } from "../svg"
import { computeFilename } from "./filename"

const generateDiagram = async (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    {
        flavorIndex,
        flavorTitlePart,
        dryRun,
        useSecondBestFifth,
    }: {
        flavorIndex: Index<Flavor>
        flavorTitlePart: Io
        dryRun: boolean
        useSecondBestFifth: boolean
    },
): Promise<void> => {
    const inputSentence: Io & Sentence = inputSentences[flavorIndex]
    const title: Io = computeTitle({
        edo,
        flavorTitlePart,
        useSecondBestFifth,
    })
    const filename: Filename = computeFilename({
        edo,
        flavorTitlePart,
        useSecondBestFifth,
    })

    console.log(`\n\n${title}\n\n${inputSentence}`)

    if (!dryRun)
        await writeDiagramSvg({
            inputSentence,
            title,
            filename,
            edo,
            useSecondBestFifth,
        })
}

export { generateDiagram }
