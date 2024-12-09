import { deepClone, Index, Io, Px, Sentence } from "@sagittal/general"
import {
    computeSagittalSagitype,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationDefinition,
    EdoNotationName,
    Flavor,
    isSubsetNotation,
    parseSagitype,
    Sagittal,
    Shafts,
    flipSagittal,
} from "@sagittal/system"
import { computeInputSentenceUnicode } from "staff-code"
import { BRAVURA_Y_OFFSET, EDO_NOTATION_NAMES, MEANINGS_FONTS } from "../../../../../constants"
import { computeFlavorFromDiagramType } from "../../../../../flavorFromDiagramType"
import { computeHasHalfApotome } from "../../../../../halfApotome"
import { computeNotation } from "../../../../../notation"
import { DiagramType, Font, PathifiableTexts } from "../../../../../types"
import { COMMA_TEXT } from "../../constants"

const computePathifiableTextsForExpressionsBeyondHalfApotomeByEdoNotationNameFromEdoNotationDefinitions = (
    flavor: Flavor,
): Record<EdoNotationName, PathifiableTexts> => {
    return EDO_NOTATION_NAMES.reduce(
        (
            pathifiableTextsByEdoNotationName: Record<EdoNotationName, PathifiableTexts>,
            edoNotationName: EdoNotationName,
        ): Record<EdoNotationName, PathifiableTexts> => {
            pathifiableTextsByEdoNotationName[edoNotationName] =
                flavor === Flavor.REVO
                    ? computeRevoExpressionsBeyondHalfApotomePathifiableTexts(edoNotationName)
                    : computeEvoExpressionsBeyondHalfApotomePathifiableTexts(edoNotationName)

            return pathifiableTextsByEdoNotationName
        },
        {} as Record<EdoNotationName, PathifiableTexts>,
    )
}

const computeRevoExpressionsBeyondHalfApotomePathifiableTexts = (
    edoNotationName: EdoNotationName,
): PathifiableTexts => {
    const edoNotationDefinition: EdoNotationDefinition = EDO_NOTATION_DEFINITIONS[edoNotationName]

    if (isSubsetNotation(edoNotationDefinition))
        return {
            fonts: [],
            fontIndices: [],
            additionalYOffsets: [],
            texts: [],
        }

    const { sagittals, sagitypes } = computeNotation(edoNotationName, Flavor.REVO)
    const filteredSagittals: Sagittal[] = sagittals
        .slice(sagitypes.length)
        .filter(
            (sagittal: Sagittal): boolean =>
                sagittal.shafts === Shafts.SINGLE || sagittal.shafts === Shafts.DOUBLE,
        )

    const reversedSagitypes = sagitypes.reverse()

    const hasHalfApotome: boolean = computeHasHalfApotome(edoNotationName)

    const texts: Io[] = filteredSagittals.flatMap((sagittal: Sagittal, index: number): Io[] => {
        const commaText = COMMA_TEXT
        const revoText = computeInputSentenceUnicode(
            `5; ${computeSagittalSagitype(sagittal)}` as Io & Sentence,
        )
        const expressionText = " = "
        const halfApotomeAdjustedIndex = hasHalfApotome ? index + 1 : index
        const evoText = computeInputSentenceUnicode(
            `5; ${halfApotomeAdjustedIndex < reversedSagitypes.length ? `${computeSagittalSagitype(flipSagittal(parseSagitype(reversedSagitypes[halfApotomeAdjustedIndex])))}` : ""}; #` as Io &
                Sentence,
        )

        return [commaText, revoText, expressionText, evoText]
    })
    const fontIndices: Index<Font>[] = filteredSagittals.flatMap(
        (): Index<Font>[] => [1, 0, 1, 0] as Index<Font>[],
    )
    const additionalYOffsets: Px[] = filteredSagittals.flatMap(
        (): Px[] => [BRAVURA_Y_OFFSET, 0, BRAVURA_Y_OFFSET, 0] as Px[],
    )

    return {
        fonts: deepClone(MEANINGS_FONTS),
        fontIndices,
        additionalYOffsets,
        texts,
    }
}

const computeEvoExpressionsBeyondHalfApotomePathifiableTexts = (
    edoNotationName: EdoNotationName,
): PathifiableTexts => {
    const edoNotationDefinition: EdoNotationDefinition = EDO_NOTATION_DEFINITIONS[edoNotationName]

    if (isSubsetNotation(edoNotationDefinition))
        return {
            fonts: [],
            fontIndices: [],
            additionalYOffsets: [],
            texts: [],
        }

    const { sagittals, sagitypes } = computeNotation(edoNotationName, Flavor.REVO)
    const filteredSagittals: Sagittal[] = sagittals
        .slice(sagitypes.length)
        .filter((sagittal: Sagittal): boolean => sagittal.shafts === Shafts.SINGLE)

    const reversedSagitypes = sagitypes.reverse()

    const hasHalfApotome: boolean = computeHasHalfApotome(edoNotationName)

    const texts: Io[] = filteredSagittals.flatMap((sagittal: Sagittal, index: number): Io[] => {
        const commaText = ", "
        const singleShaftSymbolBeyondHalfApotomeText = computeInputSentenceUnicode(
            `5; ${computeSagittalSagitype(sagittal)}` as Io & Sentence,
        )
        const expressionText = " = "
        const halfApotomeAdjustedIndex = hasHalfApotome ? index + 1 : index
        const equivalentUsingSharpAndApotomeComplementText = computeInputSentenceUnicode(
            `5; ${halfApotomeAdjustedIndex < reversedSagitypes.length ? `${computeSagittalSagitype(flipSagittal(parseSagitype(reversedSagitypes[halfApotomeAdjustedIndex])))}` : ""}; #` as Io &
                Sentence,
        )

        return [
            commaText,
            singleShaftSymbolBeyondHalfApotomeText,
            expressionText,
            equivalentUsingSharpAndApotomeComplementText,
        ]
    })
    const fontIndices: Index<Font>[] = filteredSagittals.flatMap(
        (): Index<Font>[] => [1, 0, 1, 0] as Index<Font>[],
    )
    const additionalYOffsets: Px[] = filteredSagittals.flatMap(
        (): Px[] => [BRAVURA_Y_OFFSET, 0, BRAVURA_Y_OFFSET, 0] as Px[],
    )

    return {
        fonts: deepClone(MEANINGS_FONTS),
        fontIndices,
        additionalYOffsets,
        texts,
    }
}

const REVO_PATHIFIABLE_TEXTS_FOR_BEYOND_HALF_APOTOME_EXPRESSIONS_BY_EDO_NOTATION_NAME: Record<
    EdoNotationName,
    PathifiableTexts
> = computePathifiableTextsForExpressionsBeyondHalfApotomeByEdoNotationNameFromEdoNotationDefinitions(
    Flavor.REVO,
)

const EVO_PATHIFIABLE_TEXTS_FOR_BEYOND_HALF_APOTOME_EXPRESSIONS_BY_EDO_NOTATION_NAME: Record<
    EdoNotationName,
    PathifiableTexts
> = computePathifiableTextsForExpressionsBeyondHalfApotomeByEdoNotationNameFromEdoNotationDefinitions(
    Flavor.EVO,
)

const computeExpressionsBeyondHalfApotomePathifiableTexts = ({
    edoNotationName,
    diagramType,
}: {
    edoNotationName: EdoNotationName
    diagramType: DiagramType
}): PathifiableTexts => {
    const flavor: Flavor = computeFlavorFromDiagramType(diagramType)

    if (flavor === Flavor.REVO) {
        return REVO_PATHIFIABLE_TEXTS_FOR_BEYOND_HALF_APOTOME_EXPRESSIONS_BY_EDO_NOTATION_NAME[
            edoNotationName
        ]
    } else {
        return EVO_PATHIFIABLE_TEXTS_FOR_BEYOND_HALF_APOTOME_EXPRESSIONS_BY_EDO_NOTATION_NAME[edoNotationName]
    }
}

export { computeExpressionsBeyondHalfApotomePathifiableTexts }
