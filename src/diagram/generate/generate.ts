import { Filename, Io, saveLog, Sentence } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import {
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    FLAVOR_INDEX_FOR_GENERAL_DIAGRAM_TYPE,
    REVO_FLAVOR_INDEX,
} from "./constants"
import { DiagramType } from "../../types"
import { computeFilename, computeTitle } from "./titleAndFilename"
import { writeDiagramSvg } from "../svg"

const ONE_OFF_FILENAME: Filename = `one-off.svg` as Filename

const generateDiagram = async ({
    inputSentence,
    edoNotationName,
    diagramType,
    dryRun,
}: {
    inputSentence: Io & Sentence
    edoNotationName: EdoNotationName
    diagramType: DiagramType
    dryRun: boolean
}): Promise<void> => {
    const title: Io = computeTitle({
        edoNotationName,
        diagramType,
    })
    const filename: Filename = computeFilename({
        edoNotationName,
        diagramType,
    })

    saveLog(`\n\n${title}\n\n${inputSentence}`)

    if (!dryRun)
        await writeDiagramSvg({
            inputSentence,
            title,
            filename,
            edoNotationName,
            diagramType,
        })
}

const generateGeneralDiagram = async (
    inputSentences: (Io & Sentence)[],
    edoNotationName: EdoNotationName,
    { dryRun }: { dryRun: boolean },
): Promise<void> =>
    await generateDiagram({
        edoNotationName,
        dryRun,
        inputSentence: inputSentences[FLAVOR_INDEX_FOR_GENERAL_DIAGRAM_TYPE],
        diagramType: DiagramType.GENERAL,
    })

const generateEvoDiagram = async (
    inputSentences: (Io & Sentence)[],
    edoNotationName: EdoNotationName,
    { dryRun }: { dryRun: boolean },
): Promise<void> =>
    await generateDiagram({
        edoNotationName,
        dryRun,
        inputSentence: inputSentences[EVO_FLAVOR_INDEX],
        diagramType: DiagramType.EVO,
    })

const generateEvoSZDiagram = async (
    inputSentences: (Io & Sentence)[],
    edoNotationName: EdoNotationName,
    { dryRun }: { dryRun: boolean },
): Promise<void> =>
    await generateDiagram({
        edoNotationName,
        dryRun,
        inputSentence: inputSentences[EVO_SZ_FLAVOR_INDEX],
        diagramType: DiagramType.EVO_SZ,
    })

const generateRevoDiagram = async (
    inputSentences: (Io & Sentence)[],
    edoNotationName: EdoNotationName,
    { dryRun }: { dryRun: boolean },
): Promise<void> =>
    await generateDiagram({
        edoNotationName,
        dryRun,
        inputSentence: inputSentences[REVO_FLAVOR_INDEX],
        diagramType: DiagramType.REVO,
    })

const generateAlternativeEvoDiagram = async (
    inputSentences: (Io & Sentence)[],
    edoNotationName: EdoNotationName,
    { dryRun }: { dryRun: boolean },
): Promise<void> =>
    await generateDiagram({
        edoNotationName,
        dryRun,
        inputSentence: inputSentences[EVO_FLAVOR_INDEX],
        diagramType: DiagramType.ALTERNATE_EVO,
    })

const generateOneOffDiagram = async (
    inputSentence: Io & Sentence,
    edoNotationName: EdoNotationName,
    diagramType: DiagramType,
): Promise<void> => {
    const title: Io = computeTitle({
        edoNotationName,
        diagramType,
    })
    const filename = ONE_OFF_FILENAME

    await writeDiagramSvg({
        inputSentence,
        title,
        filename,
        edoNotationName,
        diagramType,
    })
}

export {
    generateGeneralDiagram,
    generateEvoDiagram,
    generateEvoSZDiagram,
    generateRevoDiagram,
    generateAlternativeEvoDiagram,
    generateOneOffDiagram,
}
