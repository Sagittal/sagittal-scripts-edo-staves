import { Filename, Io } from "@sagittal/general"
import { Edo, EdoNotationName } from "@sagittal/system"
import { parseEdoNotationName } from "@sagittal/system"
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

const computeSubtitle = ({
    edoNotationName,
}: {
    edoNotationName: EdoNotationName
}): Io => {
    const { useSecondBestFifth }: { useSecondBestFifth: boolean } =
        parseEdoNotationName(edoNotationName)

    return `${
        useSecondBestFifth ? "Using the second-best fifth " : ""
    }(default spellings)`
}

const computeFilename = ({
    edoNotationName,
    diagramType,
}: {
    edoNotationName: EdoNotationName
    diagramType: DiagramType
}): Filename => {
    const {
        edo,
        useSecondBestFifth,
    }: { edo: Edo; useSecondBestFifth: boolean } =
        parseEdoNotationName(edoNotationName)

    return `${edo}${embedEdoPart(useSecondBestFifth)}${embedDiagramType(
        diagramType,
        {
            useUnderscores: true,
        },
    )}.svg` as Filename
}

const computeTitle = ({
    edoNotationName,
    diagramType,
}: {
    edoNotationName: EdoNotationName
    diagramType: DiagramType
}): Io => {
    const edo: Edo = parseEdoNotationName(edoNotationName).edo

    return `${edo}-EDO${embedDiagramType(diagramType)} Sagittal notation`
}

export { computeTitle, computeSubtitle, computeFilename }
