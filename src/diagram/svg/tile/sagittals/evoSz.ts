import {
    computeFifthStep,
    computeSharpStep,
    Edo,
    EdoNotationName,
    EdoStep,
    parseEdoNotationName,
    Sagittal,
    Sagitype,
} from "@sagittal/system"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_FONT_SIZE_FOR_SZ_SEMISHARP,
} from "../../constants"
import { Font } from "../../types"
import { computeIsSagittalSemisharpTheHalfApotome } from "../../../../halfApotome"
import {
    Count,
    deepClone,
    Index,
    Io,
    Sentence,
    ZERO_ONE_INDEX_DIFF,
} from "@sagittal/general"
import { computeInputSentenceUnicode } from "staff-code"
import { computeSagitypeSentence } from "./sagitypeSentence"
import { DiagramType } from "../../../../types"
import { TileRow } from "../types"
import { TILE_SAGITTALS_FONT } from "./constants"
import { TILE_ROW_FOR_EDO } from "../constants"

const TILE_SZ_SEMISHARP_FONT: Font = {
    fontFile: BRAVURA_TEXT_SC_FONT_FILE,
    fontSize: BRAVURA_TEXT_SC_FONT_SIZE_FOR_SZ_SEMISHARP,
}

// TODO: anything can be the half apotome now, not just /|\ so I need to update this to deal with that
const computeShouldReplaceSagittalSemisharpWithSzInTile = ({
    edoNotationName,
    sagitypes,
}: {
    edoNotationName: EdoNotationName
    sagitypes: Sagitype[]
}): boolean => {
    const fifthStep: EdoStep = computeFifthStep(edoNotationName)
    const edo: Edo = parseEdoNotationName(edoNotationName).edo
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)

    return computeIsSagittalSemisharpTheHalfApotome(sagitypes, sharpStep)
}

const computeSzTexts = (sagitypes: Sagitype[]): (Io & Sentence)[] => [
    computeInputSentenceUnicode(
        computeSagitypeSentence(sagitypes.slice(0, sagitypes.length - 1)),
    ),
    computeInputSentenceUnicode(
        `${sagitypes.length > 1 ? "4; " : ""}t;` as Io & Sentence,
    ),
]

const computeIsFinalSagittalRow = ({
    tileRowCount,
    sagittalTileRowIndex,
}: {
    tileRowCount: Count<TileRow>
    sagittalTileRowIndex: Index<TileRow<Sagittal>>
}): boolean =>
    sagittalTileRowIndex ===
    tileRowCount - ZERO_ONE_INDEX_DIFF - TILE_ROW_FOR_EDO

const shouldSz = ({
    diagramType,
    edoNotationName,
    sagitypes,
    tileRowCount,
    sagittalTileRowIndex,
}: {
    diagramType: DiagramType
    edoNotationName: EdoNotationName
    sagitypes: Sagitype[]
    tileRowCount: Count<TileRow>
    sagittalTileRowIndex: Index<TileRow<Sagittal>>
}): boolean => {
    return (
        diagramType === DiagramType.EVO_SZ &&
        computeShouldReplaceSagittalSemisharpWithSzInTile({
            edoNotationName,
            sagitypes,
        }) &&
        computeIsFinalSagittalRow({ tileRowCount, sagittalTileRowIndex })
    )
}

const computeSzTextsAndFonts = (
    sagitypesForTileRow: Sagitype[],
): { texts: (Io & Sentence)[]; fonts: Font[]; fontIndices: Index<Font>[] } => {
    const texts = computeSzTexts(sagitypesForTileRow)
    const fonts = [
        deepClone(TILE_SAGITTALS_FONT),
        deepClone(TILE_SZ_SEMISHARP_FONT),
    ]
    const fontIndices = [0, 1] as Index<Font>[]

    return { texts, fonts, fontIndices }
}

export { computeSzTextsAndFonts, shouldSz }
