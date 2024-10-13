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
    BRAVURA_TEXT_SC_FONT_SIZE,
    BRAVURA_TEXT_SC_FONT_SIZE_FOR_SZ_SEMISHARP,
} from "../constants"
import { Font } from "../types"
import { computeIsSagittalSemisharpTheHalfApotome } from "../../../halfApotome"
import {
    Count,
    deepClone,
    Index,
    Io,
    Px,
    Sentence,
    Word,
} from "@sagittal/general"
import { Code, computeInputSentenceUnicode } from "staff-code"
import { splitAccents } from "../../../accents"
import { DiagramType } from "../../../types"

const COMPRESS_SPACING_BEYOND_THIS_SAGITTAL_COUNT: Count<Sagittal> =
    3 as Count<Sagittal>

const TILE_SAGITTALS_FONT: Font = {
    fontFile: BRAVURA_TEXT_SC_FONT_FILE,
    fontSize: BRAVURA_TEXT_SC_FONT_SIZE // * 0.9, only if over 72-EDO?
}
const TILE_SZ_SEMISHARP_FONT: Font = {
    fontFile: BRAVURA_TEXT_SC_FONT_FILE,
    fontSize: BRAVURA_TEXT_SC_FONT_SIZE_FOR_SZ_SEMISHARP,
}

const computeTexts = (sagitypes: Sagitype[]): (Io & Sentence)[] => [
    computeInputSentenceUnicode(computeSagitypeSentence(sagitypes)),
]

const computeSagitypeSentence = (sagitypes: Sagitype[]): Io & Sentence => {
    const sagittalWordsList: (Code & Word)[][] = sagitypes.map(splitAccents)
    const sagittalPhrases = sagittalWordsList.map(
        (sagittalWords: (Code & Word)[]): string => {
            return sagittalWords.join("; ") + ";"
        },
    )
    const spacing: Px =
        sagittalPhrases.length > COMPRESS_SPACING_BEYOND_THIS_SAGITTAL_COUNT
            ? (1 as Px)
            : (2 as Px)

    return (sagittalPhrases.join(` ${spacing}; `) + ";") as Io & Sentence
}

const computeShouldReplaceSagittalSemisharpWithSzInTile = ({
    edoNotationName,
    sagitypesForRow,
}: {
    edoNotationName: EdoNotationName
    sagitypesForRow: Sagitype[]
}): boolean => {
    const fifthStep: EdoStep = computeFifthStep(edoNotationName)
    const edo: Edo = parseEdoNotationName(edoNotationName).edo
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)

    return computeIsSagittalSemisharpTheHalfApotome(sagitypesForRow, sharpStep) // TODO: it's because sagittals for row isn't the total count of all the sagittals
    // TODO: also wait, didn't we decide that anything can be the half apotome now?
}

const computeSzTexts = (sagitypes: Sagitype[]): (Io & Sentence)[] => [
    computeInputSentenceUnicode(
        computeSagitypeSentence(sagitypes.slice(0, sagitypes.length - 1)),
    ),
    computeInputSentenceUnicode(
        `${sagitypes.length > 1 ? "4; " : ""}t;` as Io & Sentence,
    ),
]

const computeTextsAndFonts = ({
    edoNotationName,
    sagitypesForRow,
    diagramType,
    tileRowCountScaleFactor,
}: {
    edoNotationName: EdoNotationName
    sagitypesForRow: Sagitype[]
    diagramType: DiagramType
    tileRowCountScaleFactor: number
}) => {
    let texts: (Io & Sentence)[]
    let fonts: Font[]
    let fontIndices: Index<Font>[]

    if (
        diagramType === DiagramType.EVO_SZ &&
        computeShouldReplaceSagittalSemisharpWithSzInTile({
            edoNotationName,
            sagitypesForRow,
        })
    ) {
        texts = computeSzTexts(sagitypesForRow)
        fonts = [
            deepClone(TILE_SAGITTALS_FONT),
            deepClone(TILE_SZ_SEMISHARP_FONT),
        ]
        fontIndices = [0, 1] as Index<Font>[]
    } else {
        texts = computeTexts(sagitypesForRow)
        fonts = [deepClone(TILE_SAGITTALS_FONT)]
        fontIndices = [0] as Index<Font>[]
    }

    fonts.forEach((font: Font): void => {
        font.fontSize = (font.fontSize / tileRowCountScaleFactor) as Px
    })

    return { texts, fonts, fontIndices }
}

export { computeTextsAndFonts }
