import { Count, deepClone, Index, Io, Multiplier, Px, Sentence } from "@sagittal/general"
import { EdoNotationName, Sagittal, Sagitype } from "@sagittal/system"
import { computeInputSentenceUnicode } from "staff-code"
import { DiagramType, Font } from "../../../../types"
import { TileRow } from "../types"
import { TILE_SAGITTALS_FONT } from "./constants"
import { computeSzTextsAndFonts, shouldHandleSzTextsAndFonts } from "./evoSz"
import { computeSagitypeSentence } from "./sagitypeSentence"

const computeTexts = (sagitypes: Sagitype[]): (Io & Sentence)[] => [
    computeInputSentenceUnicode(computeSagitypeSentence(sagitypes)),
]

const computeTextsAndFonts = (
    sagitypesForTileRow: Sagitype[],
): { texts: (Io & Sentence)[]; fonts: Font[]; fontIndices: Index<Font>[] } => {
    const texts = computeTexts(sagitypesForTileRow)
    const fonts = [deepClone(TILE_SAGITTALS_FONT)]
    const fontIndices = [0] as Index<Font>[]

    return { texts, fonts, fontIndices }
}

const computeSagittalTextsAndFonts = ({
    edoNotationName,
    sagitypesForTileRow,
    diagramType,
    tileRowCountMultiplier,
    tileRowCount,
    sagittalTileRowIndex,
}: {
    edoNotationName: EdoNotationName
    sagitypesForTileRow: Sagitype[]
    diagramType: DiagramType
    tileRowCountMultiplier: Multiplier<Count<TileRow>>
    tileRowCount: Count<TileRow>
    sagittalTileRowIndex: Index<TileRow<Sagittal>>
}) => {
    const { texts, fonts, fontIndices } = shouldHandleSzTextsAndFonts({
        diagramType,
        sagittalTileRowIndex,
        tileRowCount,
        edoNotationName,
    })
        ? computeSzTextsAndFonts(sagitypesForTileRow)
        : computeTextsAndFonts(sagitypesForTileRow)

    fonts.forEach((font: Font): void => {
        font.fontSize = (font.fontSize / tileRowCountMultiplier) as Px
    })

    return { texts, fonts, fontIndices }
}

export { computeSagittalTextsAndFonts }
