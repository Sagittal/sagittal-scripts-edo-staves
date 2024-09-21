import { computeInputSentenceUnicode } from "staff-code"
import {
    Count,
    deepEquals,
    Io,
    isEven,
    Px,
    Sentence,
    Unicode,
    ZERO_ONE_INDEX_DIFF,
} from "@sagittal/general"
import {
    computeFifthStep,
    computeSharpStep,
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoName,
    EdoNotationDefinition,
    EdoStep,
    Flavor,
    isSubsetNotation,
    NonSubsetEdoNotationDefinition,
    parseEdoName,
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
    SUBSET_TEXT_FONT_SIZE,
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
        fontSize: SUBSET_TEXT_FONT_SIZE,
        xOffset: (TILE_SIZE / 2) as Px,
        yOffset: SUBSET_Y_OFFSET,
        justification: Justification.CENTER,
    })
}

const handleEvoSzSagitypes = (
    sagitypes: Sagitype[],
    { edoName }: { edoName: EdoName },
): void => {
    const fifthStep: EdoStep = computeFifthStep(edoName)
    const edo: Edo = parseEdoName(edoName).edo
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
    if (
        isEven(sharpStep) &&
        sagitypes[sharpStep / 2 - ZERO_ONE_INDEX_DIFF] === "/|\\"
    ) {
        sagitypes[sharpStep / 2 - ZERO_ONE_INDEX_DIFF] = "t" as Sagitype
    }
}

const addSagittals = async (
    tileGroupElement: NodeElement<SVGGElement>,
    { edoName, flavor }: { edoName: EdoName; flavor: Flavor },
): Promise<void> => {
    const sagitypes: Sagitype[] = (
        EDO_NOTATION_DEFINITIONS[edoName] as NonSubsetEdoNotationDefinition
    ).sagitypes

    if (sagitypes.length === 0) return

    if (flavor === Flavor.EVO_SZ) {
        handleEvoSzSagitypes(sagitypes, { edoName })
    }

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
    { edoName, flavor }: { edoName: EdoName; flavor: Flavor },
): Promise<void> => {
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edoName]

    if (isSubsetNotation(edoNotationDefinition)) {
        await addSubset(tileGroupElement, {
            supersetEdoName: edoNotationDefinition.supersetEdoName,
        })
    } else {
        await addSagittals(tileGroupElement, { edoName, flavor })
    }
}

export { addSagittalsOrSubset }
