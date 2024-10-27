import { Edo, Io, Maybe } from "@sagittal/general"
import { DiagramType } from "../../types"

const FORMATTED_FLAVOR_NAMES_BY_DIAGRAM_TYPE: Record<DiagramType, Maybe<Io>> = {
    [DiagramType.GENERAL]: "",
    [DiagramType.EVO]: "Evo",
    [DiagramType.REVO]: "Revo",
    [DiagramType.ALTERNATE_EVO]: "Alternative_Evo",
    [DiagramType.EVO_SZ]: "Evo-SZ",
}

const computeDiagramLine = ({
    edo,
    diagramType,
    isSecondBestFifthNotation = false,
}: {
    edo: Edo
    diagramType: DiagramType
    isSecondBestFifthNotation?: Maybe<boolean>
}) =>
    `[[File:${edo}${isSecondBestFifthNotation ? `b` : `-EDO`}${
        diagramType === DiagramType.GENERAL ? "" : "_"
    }${FORMATTED_FLAVOR_NAMES_BY_DIAGRAM_TYPE[diagramType]}.svg]]`

export { computeDiagramLine }
