import { Count, deepClone, Index, Io, Sentence, ZERO_ONE_INDEX_DIFF } from "@sagittal/general"
import { EdoNotationName, Sagittal, Sagitype } from "@sagittal/system"
import { computeInputSentenceUnicode } from "staff-code"
import { BRAVURA_TEXT_SC_FONT_FILE } from "../../../../constants"
import { computeHasHalfApotome } from "../../../../halfApotome"
import { DiagramType, Font } from "../../../../types"
import { BRAVURA_TEXT_SC_FONT_SIZE_FOR_SZ_SEMISHARP } from "../../constants"
import { TILE_ROW_FOR_EDO } from "../constants"
import { TileRow } from "../types"
import { TILE_SAGITTALS_FONT } from "./constants"
import { computeSagitypeSentence } from "./sagitypeSentence"

const TILE_SZ_SEMISHARP_FONT: Font = {
    fontFile: BRAVURA_TEXT_SC_FONT_FILE,
    fontSize: BRAVURA_TEXT_SC_FONT_SIZE_FOR_SZ_SEMISHARP,
}

const computeSzTexts = (sagitypes: Sagitype[]): (Io & Sentence)[] => [
    computeInputSentenceUnicode(computeSagitypeSentence(sagitypes.slice(0, sagitypes.length - 1))),
    computeInputSentenceUnicode(`${sagitypes.length > 1 ? "4; " : ""}t;` as Io & Sentence),
]

const computeIsFinalSagittalRow = ({
    tileRowCount,
    sagittalTileRowIndex,
}: {
    tileRowCount: Count<TileRow>
    sagittalTileRowIndex: Index<TileRow<Sagittal>>
}): boolean => sagittalTileRowIndex === tileRowCount - ZERO_ONE_INDEX_DIFF - TILE_ROW_FOR_EDO

const shouldHandleSzTextsAndFonts = ({
    diagramType,
    edoNotationName,
    tileRowCount,
    sagittalTileRowIndex,
}: {
    diagramType: DiagramType
    edoNotationName: EdoNotationName
    tileRowCount: Count<TileRow>
    sagittalTileRowIndex: Index<TileRow<Sagittal>>
}): boolean => {
    return (
        diagramType === DiagramType.EVO_SZ &&
        computeHasHalfApotome(edoNotationName) &&
        computeIsFinalSagittalRow({ tileRowCount, sagittalTileRowIndex })
    )
}

const computeSzTextsAndFonts = (
    sagitypesForTileRow: Sagitype[],
): { texts: (Io & Sentence)[]; fonts: Font[]; fontIndices: Index<Font>[] } => {
    const texts = computeSzTexts(sagitypesForTileRow)
    const fonts = [deepClone(TILE_SAGITTALS_FONT), deepClone(TILE_SZ_SEMISHARP_FONT)]
    const fontIndices = [0, 1] as Index<Font>[]

    return { texts, fonts, fontIndices }
}

export { computeSzTextsAndFonts, shouldHandleSzTextsAndFonts }
