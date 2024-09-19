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
        formattedFlavorName,
        dryRun,
        useSecondBestFifth,
    }: {
        flavorIndex: Index<Flavor>
        formattedFlavorName: Io
        dryRun: boolean
        useSecondBestFifth: boolean
    },
): Promise<void> => {
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
