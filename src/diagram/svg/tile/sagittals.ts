import { computeInputSentenceUnicode } from "staff-code"
import { Count, Io, Px, Sentence, Unicode } from "@sagittal/general"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoName,
    EdoNotationDefinition,
    isSubsetNotation,
    NonSubsetEdoNotationDefinition,
    Sagitype,
} from "@sagittal/system"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_TITLE_FONT_SIZE,
    SAGITTAL_Y_OFFSETS_BASED_ON_HOW_MANY_TIMES_SCALE_NEEDED_TO_CHANGE,
    SAGITTALS_MAX_WIDTH,
    SANOMAT_FONT_FILE,
    SUBSET_Y_OFFSET,
    TILE_SIZE,
    TILE_TEXT_FONT_SIZE,
} from "../constants"
import { getGroupWidth } from "./width"
import { addText } from "../text"
import { Justification } from "./types"
import { textToSvgGroupElement } from "../element"
import { NodeElement } from "../types"

const SAGITTALS_SCALER_CHANGE_FACTOR: number = 1.1

const addSubset = async (
    tileGroupElement: NodeElement<SVGGElement>,
    { supersetEdoName }: { supersetEdoName: EdoName },
): Promise<void> => {
    await addText(tileGroupElement, `ss${supersetEdoName}`, {
        fontFile: SANOMAT_FONT_FILE,
        fontSize: TILE_TEXT_FONT_SIZE,
        xOffset: (TILE_SIZE / 2) as Px,
        yOffset: SUBSET_Y_OFFSET,
        justification: Justification.CENTER,
    })
}

const addSagittals = async (
    tileGroupElement: NodeElement<SVGGElement>,
    edoName: EdoName,
): Promise<void> => {
    const sagitypes: Sagitype[] = (
        EDO_NOTATION_DEFINITIONS[edoName] as NonSubsetEdoNotationDefinition
    ).sagitypes

    if (sagitypes.length === 0) return

    const unicodeSentence: Unicode & Sentence = computeInputSentenceUnicode(
        (sagitypes.join("; 2; ") + ";") as Io & Sentence,
    )

    let sagittalsWidth: Px = Infinity as Px
    let sagittalsScaler: number = 1
    let scaleChangeCount: Count = 0 as Count
    let sagittalsHaveBeenPlaced: boolean = false
    while (!sagittalsHaveBeenPlaced) {
        const sagittalsGroupElement: NodeElement<SVGGElement> =
            await textToSvgGroupElement(unicodeSentence, {
                fontFile: BRAVURA_TEXT_SC_FONT_FILE,
                fontSize: (BRAVURA_TEXT_SC_TITLE_FONT_SIZE *
                    sagittalsScaler) as Px,
            })
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
    { edoName }: { edoName: EdoName },
): Promise<void> => {
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edoName]

    if (isSubsetNotation(edoNotationDefinition)) {
        await addSubset(tileGroupElement, {
            supersetEdoName: edoNotationDefinition.supersetEdoName,
        })
    } else {
        await addSagittals(tileGroupElement, edoName)
    }
}

export { addSagittalsOrSubset }
