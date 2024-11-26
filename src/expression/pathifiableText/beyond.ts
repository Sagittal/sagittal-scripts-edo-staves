import { deepClone, Edo, EdoStep, Index, Io, Px, Sentence } from "@sagittal/general"
import {
    computeFifthStep,
    computeSagittals,
    computeSagittalSagitype,
    computeSagitypes,
    computeSharpStep,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationDefinition,
    EdoNotationName,
    Flavor,
    isSubsetNotation,
    NonSubsetEdoNotationDefinition,
    parseEdoNotationName,
    parseSagitype,
    Sagittal,
    Sagitype,
    Shafts,
} from "@sagittal/system"
import { computeInputSentenceUnicode } from "staff-code"
import { DEFINIENS_Y_OFFSET } from "../../diagram/svg/constants"
import { PathifiableTexts } from "../../diagram/svg/meaning/types"
import { Font } from "../../diagram/svg/types"
import { DiagramType } from "../../types"
// TODO: massively clean up all these imports, though I'm worried about weird circular deps
import { FONTS } from "./constants"

// TODO: FONTS is more like EXPRESSIONS_FONTS, and its more like EXPRESSIONS_BRAVURA_FONT
// or something... I can't keep straight the difference between expressions and meanings
// and there's also expressions bravura y offset, not definiens y offset

const computeThing = (): Record<EdoNotationName, PathifiableTexts> => {
    return {}
}

// TODO: rename
const down = (sagittal: Sagittal): Sagittal => ({ ...sagittal, down: true }) as Sagittal

// TODO: rename
const doItForRevo = ({
    edoNotationName,
    nonSubsetEdoNotationDefinition,
}: {
    edoNotationName: EdoNotationName
    nonSubsetEdoNotationDefinition: NonSubsetEdoNotationDefinition
}): PathifiableTexts => {
    // TODO: I feel like the first part of this can be DRYed up, and not just within this file I mean
    const sagitypes: Sagitype[] = computeSagitypes(nonSubsetEdoNotationDefinition)
    const fifthStep: EdoStep = computeFifthStep(edoNotationName)
    const edo: Edo = parseEdoNotationName(edoNotationName).edo
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals({
        sagitypes,
        flavor: Flavor.REVO,
        sharpStep,
    })
        .slice(sagitypes.length)
        .filter(
            (sagittal: Sagittal): boolean =>
                sagittal.shafts === Shafts.SINGLE || sagittal.shafts === Shafts.DOUBLE,
        )

    const reversedSagitypes = sagitypes.reverse()

    const texts: Io[] = sagittals.flatMap((sagittal: Sagittal, index: number): Io[] => {
        const commaText = ", "
        const revoText = computeInputSentenceUnicode(
            `5; ${computeSagittalSagitype(sagittal)}` as Io & Sentence,
        )
        const expressionText = " = "
        const evoText = computeInputSentenceUnicode(
            `5; ${index < reversedSagitypes.length ? `${computeSagittalSagitype(down(parseSagitype(reversedSagitypes[index])))}` : ""}; #` as Io &
                Sentence,
        )

        return [commaText, revoText, expressionText, evoText]
    })
    const fontIndices: Index<Font>[] = sagittals.flatMap((): Index<Font>[] => [1, 0, 1, 0] as Index<Font>[])
    const additionalYOffsets: Px[] = sagittals.flatMap(
        (): Px[] => [DEFINIENS_Y_OFFSET, 0, DEFINIENS_Y_OFFSET, 0] as Px[],
    )

    return {
        fonts: deepClone(FONTS),
        fontIndices,
        additionalYOffsets,
        texts,
    }
}

// TODO: rename
const doItForEvo = ({
    edoNotationName,
    nonSubsetEdoNotationDefinition,
}: {
    edoNotationName: EdoNotationName
    nonSubsetEdoNotationDefinition: NonSubsetEdoNotationDefinition
}): PathifiableTexts => {
    const sagitypes: Sagitype[] = computeSagitypes(nonSubsetEdoNotationDefinition)
    const fifthStep: EdoStep = computeFifthStep(edoNotationName)
    const edo: Edo = parseEdoNotationName(edoNotationName).edo
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals({
        sagitypes,
        flavor: Flavor.REVO,
        sharpStep,
    })
        .slice(sagitypes.length)
        .filter((sagittal: Sagittal): boolean => sagittal.shafts === Shafts.SINGLE)

    return {
        fonts: [],
        fontIndices: [],
        additionalYOffsets: [],
        texts: [],
    }
}

// TODO: make sure that it works for ones with a half-apotome symbol as well as ones without

const PATHIFIABLE_TEXTS_FOR_BEYOND_HALF_APOTOME_EXPRESSIONS_BY_EDO_NOTATION_NAME: Record<
    EdoNotationName,
    PathifiableTexts
> = computeThing() // TODO: wait a sec I'm doing this totally differently, computing them one at a time rather than all up front and storing them...

const computeExpressionsBeyondHalfApotomePathifiableTexts = ({
    edoNotationName,
    diagramType,
}: {
    edoNotationName: EdoNotationName
    diagramType: DiagramType
}): PathifiableTexts => {
    const edoNotationDefinition: EdoNotationDefinition = EDO_NOTATION_DEFINITIONS[edoNotationName]

    if (isSubsetNotation(edoNotationDefinition))
        return {
            fonts: [],
            fontIndices: [],
            additionalYOffsets: [],
            texts: [],
        }

    // TODO: really we don't do this anywhere else yet? shoud probably be extracted
    const flavor: Flavor =
        diagramType === DiagramType.REVO ? Flavor.REVO : DiagramType.EVO_SZ ? Flavor.EVO_SZ : Flavor.EVO

    if (flavor === Flavor.REVO) {
        return doItForRevo({
            edoNotationName,
            nonSubsetEdoNotationDefinition: edoNotationDefinition,
        })
    } else {
        return doItForEvo({
            edoNotationName,
            nonSubsetEdoNotationDefinition: edoNotationDefinition,
        })
    }
}

export { computeExpressionsBeyondHalfApotomePathifiableTexts }
