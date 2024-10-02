import { Io, isUndefined, Maybe } from "@sagittal/general"
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
    hasSecondBestFifthNotation,
}: {
    diagramType: DiagramType
    hasSecondBestFifthNotation: boolean
}): Maybe<Io> =>
    hasSecondBestFifthNotation
        ? isUndefined(SUBSECTION_HEADINGS[diagramType])
            ? undefined
            : `=${SUBSECTION_HEADINGS[diagramType]}=`
        : SUBSECTION_HEADINGS[diagramType]

export { computeSubsectionHeadingLine }
