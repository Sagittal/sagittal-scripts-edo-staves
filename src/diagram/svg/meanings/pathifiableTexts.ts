import { deepClone, HexColor, Index, Px } from "@sagittal/general"
import {
    computeSectionColor,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationDefinition,
    EdoNotationName,
    isSubsetNotation,
    SectionColor,
} from "@sagittal/system"
import { DiagramType } from "../../../types"
import { Font } from "../types"
import { EMPTY_PATHIFIABLE_TEXTS, MEANINGS_FONT } from "./constants"
import { computeExpressionsPathifiableTexts } from "./expressions"
import { PathifiableTexts } from "./types"

const computeMeaningsPathifiableTexts = ({
    edoNotationName,
    diagramType,
}: {
    edoNotationName: EdoNotationName
    diagramType: DiagramType
}): PathifiableTexts => {
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edoNotationName]

    if (isSubsetNotation(edoNotationDefinition)) {
        return {
            fontIndices: [0 as Index<Font>],
            fonts: [deepClone(MEANINGS_FONT)],
            texts: [
                `a subset of ${edoNotationDefinition.supersetEdoNotationName}-EDO`,
            ],
            additionalYOffsets: [0 as Px],
        }
    } else {
        const sectionColor: SectionColor | HexColor =
            computeSectionColor(edoNotationName)
        if (sectionColor === SectionColor.ROSE) {
            if (edoNotationName === "7") {
                return EMPTY_PATHIFIABLE_TEXTS
            } else {
                return {
                    fontIndices: [0 as Index<Font>],
                    fonts: [deepClone(MEANINGS_FONT)],
                    texts: ["a bad-fifth limma-fraction notation"],
                    additionalYOffsets: [0 as Px],
                }
            }
        } else if (sectionColor === SectionColor.GOLD) {
            if (edoNotationName === "5") {
                return EMPTY_PATHIFIABLE_TEXTS
            } else {
                return {
                    fontIndices: [0 as Index<Font>],
                    fonts: [deepClone(MEANINGS_FONT)],
                    texts: ["a bad-fifth apotome-fraction notation"],
                    additionalYOffsets: [0 as Px],
                }
            }
        } else {
            return computeExpressionsPathifiableTexts({
                edoNotationName,
                diagramType,
            })
        }
    }
}

export { computeMeaningsPathifiableTexts }
