import { Filename, Io } from "@sagittal/general"
import { Edo, EdoName } from "@sagittal/system"
import { parseEdoName } from "@sagittal/system/dist/cjs/notations"
import { DiagramType } from "../../types"

const FORMATTED_DIAGRAM_TYPE: Record<DiagramType, Io> = {
    [DiagramType.GENERAL]: "",
    [DiagramType.EVO]: " Evo",
    [DiagramType.REVO]: " Revo",
    [DiagramType.EVO_SZ]: " Evo-SZ",
    [DiagramType.ALTERNATE_EVO]: " Alternative Evo",
}

const embedDiagramType = (
    diagramType: DiagramType,
    { useUnderscores }: { useUnderscores: boolean } = { useUnderscores: false },
): Io => {
    const formattedDiagramType: Io = FORMATTED_DIAGRAM_TYPE[diagramType]

    return useUnderscores
        ? formattedDiagramType.replace(/ /g, "_")
        : formattedDiagramType
}

const embedEdoPart = (useSecondBestFifth: boolean): Io =>
    useSecondBestFifth ? "b" : "-EDO"

const computeFilename = ({
    edoName,
    diagramType,
}: {
    edoName: EdoName
    diagramType: DiagramType
}): Filename => {
    const {
        edo,
        useSecondBestFifth,
    }: { edo: Edo; useSecondBestFifth: boolean } = parseEdoName(edoName)

    return `${edo}${embedEdoPart(useSecondBestFifth)}${embedDiagramType(
        diagramType,
        { useUnderscores: true },
    )}.svg` as Filename
}

const computeTitle = ({
    edoName,
    diagramType,
}: {
    edoName: EdoName
    diagramType: DiagramType
}): Io => {
    const {
        edo,
        useSecondBestFifth,
    }: { edo: Edo; useSecondBestFifth: boolean } = parseEdoName(edoName)

    return `${edo}${embedEdoPart(useSecondBestFifth)}${embedDiagramType(
        diagramType,
    )} Sagittal notation`
}

export { computeTitle, computeFilename }
