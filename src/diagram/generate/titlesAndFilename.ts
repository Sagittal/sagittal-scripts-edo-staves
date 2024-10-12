import { Filename, HexColor, Io } from "@sagittal/general"
import {
    computeSectionColor,
    Edo,
    EdoNotationName,
    SectionColor,
} from "@sagittal/system"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationDefinition,
    isSubsetNotation,
    parseEdoNotationName,
} from "@sagittal/system"
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
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edoNotationName]

    const sectionColor: SectionColor | HexColor =
        computeSectionColor(edoNotationName)

    return `${
        isSubsetNotation(edoNotationDefinition)
            ? `As a subset of ${edoNotationDefinition.supersetEdoNotationName}-EDO `
            : sectionColor === SectionColor.ROSE
            ? useSecondBestFifth
                ? "A bad-fifth limma-fraction notation, using the second-best fifth "
                : "A bad-fifth limma-fraction notation "
            : sectionColor === SectionColor.GOLD
            ? useSecondBestFifth
                ? "A bad-fifth apotome-fraction notation, using the second-best fifth "
                : "A bad-fifth apotome-fraction notation "
            : useSecondBestFifth
            ? "Using the second-best fifth "
            : ""
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
    const { edo }: { edo: Edo } = parseEdoNotationName(edoNotationName)

    return `${edo}-EDO${embedDiagramType(diagramType)} Sagittal notation`
}

export { computeTitle, computeSubtitle, computeFilename }
