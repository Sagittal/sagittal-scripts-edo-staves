import { Filename, Io, saveLog, Sentence } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { DiagramType } from "../../types"
import { writeDiagramSvg } from "../svg"
import {
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    FLAVOR_INDEX_FOR_GENERAL_DIAGRAM_TYPE,
    REVO_FLAVOR_INDEX,
} from "./constants"
import { computeFilename, computeSubtitle, computeTitle } from "./titlesAndFilename"

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
    const subtitle: Io = computeSubtitle({
        edoNotationName,
    })
    const filename: Filename = computeFilename({
        edoNotationName,
        diagramType,
    })

    saveLog(`\n\n${title}\n${subtitle}\n\n${inputSentence}`)

    await writeDiagramSvg({
        inputSentence,
        title,
        subtitle,
        filename,
        edoNotationName,
        diagramType,
        dryRun,
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
    { dryRun }: { dryRun: boolean },
): Promise<void> => {
    const title: Io = computeTitle({
        edoNotationName,
        diagramType,
    })
    const subtitle: Io = computeSubtitle({
        edoNotationName,
    })
    const filename = ONE_OFF_FILENAME

    await writeDiagramSvg({
        inputSentence,
        title,
        subtitle,
        filename,
        edoNotationName,
        diagramType,
        dryRun,
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
