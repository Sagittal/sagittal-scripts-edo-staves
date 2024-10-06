import { Document } from "@xmldom/xmldom"
import { Code, computeInputSentenceUnicode } from "staff-code"
import {
    Count,
    deepClone,
    Index,
    Io,
    Px,
    Sentence,
    Word,
} from "@sagittal/general"
import {
    computeFifthStep,
    computeSharpStep,
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoName,
    EdoNotationDefinition,
    EdoStep,
    isSubsetNotation,
    NonSubsetEdoNotationDefinition,
    parseEdoName,
    Sagittal,
    Sagitype,
} from "@sagittal/system"
import {
    SAGITTAL_Y_OFFSETS_BASED_ON_HOW_MANY_TIMES_SCALE_NEEDED_TO_CHANGE,
    SAGITTALS_MAX_WIDTH,
    SANOMAT_FONT_FILE,
    SUBSET_Y_OFFSET,
    TILE_SIZE,
    SUBSET_TEXT_FONT_SIZE,
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_FONT_SIZE,
    BRAVURA_TEXT_SC_FONT_SIZE_FOR_SZ_SEMISHARP,
} from "../constants"
import { getGroupWidth } from "../width"
import { addText, textsToSvgGroupElement } from "../text"
import { Font, Justification, NodeElement } from "../types"
import { computeIsSagittalSemisharpTheHalfApotome } from "../../../halfApotome"
import { splitAccents } from "../../../accents"
import { DiagramType } from "../../../types"

const SAGITTALS_SCALER_CHANGE_FACTOR: number = 1.1

const TILE_SAGITTALS_FONT: Font = {
    fontFile: BRAVURA_TEXT_SC_FONT_FILE,
    fontSize: BRAVURA_TEXT_SC_FONT_SIZE,
}
const TILE_SZ_SEMISHARP_FONT: Font = {
    fontFile: BRAVURA_TEXT_SC_FONT_FILE,
    fontSize: BRAVURA_TEXT_SC_FONT_SIZE_FOR_SZ_SEMISHARP,
}

const COMPRESS_SPACING_BEYOND_THIS_SAGITTAL_COUNT: Count<Sagittal> =
    3 as Count<Sagittal>

const addSubset = async (
    tileGroupElement: NodeElement<SVGGElement>,
    { supersetEdoName }: { supersetEdoName: EdoName },
): Promise<void> => {
    await addText(tileGroupElement, `ss${supersetEdoName}`, {
        fontFile: SANOMAT_FONT_FILE,
        fontSize: SUBSET_TEXT_FONT_SIZE,
        xOffset: (TILE_SIZE / 2) as Px,
        yOffset: SUBSET_Y_OFFSET,
        justification: Justification.CENTER,
    })
}

const computeShouldReplaceSagittalSemisharpWithSzInTile = ({
    edoName,
    sagitypes,
}: {
    edoName: EdoName
    sagitypes: Sagitype[]
}): boolean => {
    const fifthStep: EdoStep = computeFifthStep(edoName)
    const edo: Edo = parseEdoName(edoName).edo
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

const addSagittals = async (
    tileGroupElement: NodeElement<SVGGElement>,
    {
        svgDocument,
        edoName,
        diagramType,
    }: { svgDocument: Document; edoName: EdoName; diagramType: DiagramType },
): Promise<void> => {
    const sagitypes: Sagitype[] = (
        EDO_NOTATION_DEFINITIONS[edoName] as NonSubsetEdoNotationDefinition
    ).sagitypes

    if (sagitypes.length === 0) return

    let texts: (Io & Sentence)[]
    let fonts: Font[]
    let fontIndices: Index<Font>[]
    if (
        diagramType === DiagramType.EVO_SZ &&
        computeShouldReplaceSagittalSemisharpWithSzInTile({
            edoName,
            sagitypes,
        })
    ) {
        texts = computeSzTexts(sagitypes)
        fonts = [
            deepClone(TILE_SAGITTALS_FONT),
            deepClone(TILE_SZ_SEMISHARP_FONT),
        ]
        fontIndices = [0, 1] as Index<Font>[]
    } else {
        texts = computeTexts(sagitypes)
        fonts = [deepClone(TILE_SAGITTALS_FONT)]
        fontIndices = [0] as Index<Font>[]
    }

    let sagittalsWidth: Px = Infinity as Px
    let sagittalsScaler: number = 1
    let scaleChangeCount: Count = 0 as Count
    let sagittalsHaveBeenPlaced: boolean = false
    while (!sagittalsHaveBeenPlaced) {
        fonts.forEach((font: Font): void => {
            font.fontSize = (font.fontSize * sagittalsScaler) as Px
        })

        const sagittalsGroupElement: NodeElement<SVGGElement> =
            await textsToSvgGroupElement(svgDocument, texts, fonts, fontIndices)

        sagittalsWidth = getGroupWidth(sagittalsGroupElement)

        if (sagittalsWidth > SAGITTALS_MAX_WIDTH) {
            sagittalsScaler /= SAGITTALS_SCALER_CHANGE_FACTOR
            scaleChangeCount = (scaleChangeCount + 1) as Count
        } else {
            sagittalsGroupElement.setAttribute(
                "transform",
                `translate(${TILE_SIZE / 2 - sagittalsWidth / 2} ${
                    SAGITTAL_Y_OFFSETS_BASED_ON_HOW_MANY_TIMES_SCALE_NEEDED_TO_CHANGE[
                        scaleChangeCount
                    ]
                })`,
            )
            tileGroupElement.appendChild(sagittalsGroupElement)
            sagittalsHaveBeenPlaced = true
        }
    }
}

const addSagittalsOrSubset = async (
    tileGroupElement: NodeElement<SVGGElement>,
    {
        svgDocument,
        edoName,
        diagramType,
        tileRowCount,
    }: {
        svgDocument: Document
        edoName: EdoName
        diagramType: DiagramType
        tileRowCount: Count
    },
): Promise<void> => {
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edoName]

    if (isSubsetNotation(edoNotationDefinition)) {
        await addSubset(tileGroupElement, {
            supersetEdoName: edoNotationDefinition.supersetEdoName,
        })
    } else {
        await addSagittals(tileGroupElement, {
            svgDocument,
            edoName,
            diagramType,
        })
    }
}

export { addSagittalsOrSubset }
