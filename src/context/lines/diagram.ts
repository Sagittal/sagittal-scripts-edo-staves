import { Io, Maybe } from "@sagittal/general"
import { DiagramType } from "../../types"
import { Edo } from "@sagittal/system"

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
// TODO: still haven't figured out how I'm going to size these things, which will especially matter for image-maps

export { computeDiagramLine }
