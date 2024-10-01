import { Io, Maybe } from "@sagittal/general"
import { DiagramType } from "../../types"

const SUBSECTION_HEADINGS: Record<DiagramType, Maybe<Io>> = {
    [DiagramType.GENERAL]: undefined,
    [DiagramType.EVO]: "====Evo flavor====",
    [DiagramType.REVO]: "====Revo flavor====",
    [DiagramType.ALTERNATE_EVO]: "====Alternate Evo flavor====",
    [DiagramType.EVO_SZ]: "====Evo-SZ flavor====",
}

const computeSubsectionHeadingLine = ({
    diagramType,
}: {
    diagramType: DiagramType
}): Maybe<Io> => SUBSECTION_HEADINGS[diagramType]

export { computeSubsectionHeadingLine }
