import { Filename, Io, Sentence, Index, saveLog } from "@sagittal/general"
import { EdoName, Flavor } from "@sagittal/system"
import { computeTitle } from "./title"
import { writeDiagramSvg } from "../svg"
import { computeFilename } from "./filename"

const generateDiagram = async (
    inputSentences: (Io & Sentence)[],
    edoName: EdoName,
    {
        flavorIndex,
        flavorTitlePart,
        dryRun,
    }: {
        flavorIndex: Index<Flavor>
        flavorTitlePart: Io
        dryRun: boolean
    },
): Promise<void> => {
    const inputSentence: Io & Sentence = inputSentences[flavorIndex]
    const title: Io = computeTitle({
        edoName,
        flavorTitlePart,
    })
    const filename: Filename = computeFilename({
        edoName,
        flavorTitlePart,
    })

    saveLog(`\n\n${title}\n\n${inputSentence}`)

    if (!dryRun)
        await writeDiagramSvg({
            inputSentence,
            title,
            filename,
            edoName,
            flavor: Object.values(Flavor)[flavorIndex]
        })
}

export { generateDiagram }
