import { Edo, Io, Maybe } from "@sagittal/general"
import { FRACTIONAL_3_LIMIT_NOTATION_PAGE } from "../../constants"
import { DiagramType } from "../../types"

const FORMATTED_FLAVOR_NAMES_BY_DIAGRAM_TYPE: Record<DiagramType, Maybe<Io>> = {
    [DiagramType.GENERAL]: "",
    [DiagramType.EVO]: "Evo",
    [DiagramType.REVO]: "Revo",
    [DiagramType.ALTERNATE_EVO]: "Alternative_Evo",
    [DiagramType.EVO_SZ]: "Evo-SZ",
}

const computeDiagramLines = ({
    edo,
    diagramType,
    isSecondBestFifthNotation = false,
}: {
    edo: Edo
    diagramType: DiagramType
    isSecondBestFifthNotation?: Maybe<boolean>
}): Maybe<Io>[] => {
    const fileLink = `File:${edo}${isSecondBestFifthNotation ? `b` : `-EDO`}${
        diagramType === DiagramType.GENERAL ? "" : "_"
    }${FORMATTED_FLAVOR_NAMES_BY_DIAGRAM_TYPE[diagramType]}_Sagittal.svg`

    return [
        "",
        "<imagemap>",
        fileLink,
        "desc none",
        "rect 80 0 300 50 [[Sagittal notation]]",
        "rect 300 0 460 80 [https://sagittal.org#periodic-table periodic table]",
        `rect 20 80 300 106 [[${FRACTIONAL_3_LIMIT_NOTATION_PAGE}#Bad-fifths_apotome-fraction_notation | apotome-fraction notation]]`, // TODO: oops this was meant to be variable
        `default [[${fileLink}]]`,
        "</imagemap>",
        "",
    ]
}

export { computeDiagramLines }
