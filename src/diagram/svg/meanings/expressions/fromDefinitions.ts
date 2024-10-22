import {
    analyzeJiPitch,
    computeAccidentalSagitype,
    computeCommaFromCommaName,
    EdoNotationDefinition,
    EdoNotationName,
    isSubsetNotation,
    parseCommaName,
    parseSagitype,
    Sagittal,
    Sagitype,
    StepDefinition,
} from "@sagittal/system"
import { Expression } from "./types"
import {
    Comma,
    computeQuotientFromPev,
    computeSuperSpev,
    deepClone,
    formatQuotient,
    Index,
    Io,
    isSpevSub,
    isUndefined,
    Maybe,
    Name,
    Px,
    Sentence,
    Spev,
} from "@sagittal/general"
import { Font } from "../../types"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_FONT_SIZE,
    DEFINIENS_Y_OFFSET,
} from "../../constants"
import { MEANINGS_FONT } from "../constants"
import { PathifiableTexts } from "../types"
import { EDO_NOTATION_DEFINITIONS_ENTRIES } from "../../../../constants"
import { Code } from "staff-code"
import { computeSubSpev } from "@sagittal/general/dist/cjs/math/numeric/spev/direction"

const DEFINIENDUM_FONT: Font = {
    fontFile: BRAVURA_TEXT_SC_FONT_FILE,
    fontSize: BRAVURA_TEXT_SC_FONT_SIZE,
}
const DEFINIENS_FONT: Font = deepClone(MEANINGS_FONT)
const FONTS = [DEFINIENDUM_FONT, DEFINIENS_FONT]

// const RAW_EXPRESSIONS_DATA = `
// 17 12; /|\\; = ~11M (~33/32) nl;
// 22 12; \\!; = ~5C (~80/81) nl;
// 24 12; /|\\; = ~11M (~33/32) nl;
// 27 12; \\!; = ~5C (~80/81), 12; (|\\; = ~35L (~8505/8192) ≈ ~13L up (~27/26) nl;
// 29 12; \\!; = ~5C (~80/81) nl;
// 31 12; /|\\; = ~11M (~33/32) nl;
// 34 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32) nl;
// 36 12; !); = ~7C (~63/64) nl;
// 38 12; /|\\; = ~11M (~33/32) nl;
// 39 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32) nl;
// 41 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32) nl;
// 43 12; !); = ~7C (~63/64) nl;
// 44 12; )|; = ~19s (~513/512), 12; \\!; = ~5C (~80/81), 12; (!/; ≈ ~13L (~26/27) nl;
// 45 12; \\!); = ~35M (~35/36) ≈ ~13M down (~1024/1053) nl;
// 46 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32) nl;
// 48 12; |~; = ~23C (~736/729), 12; /|\\; = ~11M (~33/32) nl;
// 49 12; )|; = ~19s (~513/512), 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32) nl;
// 50 12; /|); ≈ ~13M (~1053/1024) nl;
// 51 12; !); = ~7C (~63/64), 12; \\!; = ~5C (~80/81), 12; (!/; ≈ ~13L (~26/27) nl;
// 52 12; \\!); = ~35M (~35/36) nl;
// 53 12; \\!; = ~5C (~80/81), 12; \\\\!; = ~25S (~6400/6561) ≈ ~13/5S (~39/40) nl;
// 54 12; )|; = ~19s (~513/512), 12; /|; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32), 12; (!/; ≈ ~13L (~26/27) nl;
// 55 12; )!(; = ~11/7k (~891/896), 12; /|\\; = ~11M (~33/32) nl;
// 56 12; !); = ~7C (~63/64), 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32) nl;
// 57 12; /|); ≈ ~13M (~1053/1024) nl;
// 58 12; \\!; = ~5C (~80/81), 12; |\\; = ~55C (~55/54), 12; /|\\; = ~11M (~33/32) nl;
// 59 12; )|; = (~3A)/9 ((~2187/2048)/9), 12; )~!; = ~143C (~143/144), 12; \\!; = ~5C (~80/81), 12; /|); ≈ ~13M (~1053/1024) nl;
// 59b 12; \\!); = ~35M (~35/36) nl;
// 60 12; (!; = ~11/7C (~45056/45927), 12; /|~; = ~23/5S (~46/45) nl;
// 61 12; )|; = ~19s (~513/512), 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32), 12; (!/; ≈ ~13L (~26/27) nl;
// 62 12; /|); ≈ ~13M (~1053/1024), 12; /|\\; = ~11M (~33/32) nl;
// 63 12; !); = ~7C (~63/64), 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32) nl;
// 64 12; /|); ≈ ~13M (~1053/1024) nl;
// 65 12; \\!; = ~5C (~80/81), 12; !); = ~7C (~63/64), 12; /|\\; = ~11M (~33/32) nl;
// 66 12; )|; = ~19s (~513/512), 12; )~!; = ~143C (~143/144), 12; \\!; = ~5C (~80/81), 12; /|); ≈ ~13M (~1053/1024) nl;
// 67 12; )!(; = ~11/7k (~891/896), 12; \\!); = ~35M (~35/36) ≈ ~13M down (~1024/1053) nl;
// 68 12; !); = ~7C (~63/64), 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32), 12; (!/; ≈ ~13L (~26/27) nl;
// 69 12; /|); ≈ ~13M (~1053/1024), 12; /|\\; = ~11M (~33/32) nl;
// 70 12; \\!; = ~5C (~80/81), 12; |\\; = ~55C (~55/54), 12; /|\\; = ~11M (~33/32) nl;
// 71 12; |\\; = ~55C (~55/54), 12; )~!; = ~143C (~143/144), 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32), 12; (!/; ≈ ~13L (~26/27) nl;
// 71b 12; /|); ≈ ~13M (~1053/1024) nl;
// 72 12; \\!; = ~5C (~80/81), 12; !); = ~7C (~63/64), 12; /|\\; = ~11M (~33/32) nl;
// 73 12; !); = ~7C (~63/64), 12; \\!; = ~5C (~80/81), 12; (!(; = ~11/5S (~44/45), 12; /|\\; = ~11M (~33/32)
// 74 12; (!(; ≈ ~13/7S (~1664/1701), 12; \\!); = ~35M (~35/36) ≈ ~13M down (~1024/1053)
// 75 12; !); = ~7C (~63/64), 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32), 12; (!/; ≈ ~13L (~26/27)
// 76 12; /|); ≈ ~13M (~1053/1024), 12; \\!/; ≈ ~25⋅11/7M (~550/567)
// 77 12; \\!; = ~5C (~80/81), 12; !); = ~7C (~63/64), 12; /|\\; = ~11M (~33/32)
// `

const convertToPathifiableTexts = (
    expressionsByEdoNotationName: Record<EdoNotationName, Expression[]>,
): Record<EdoNotationName, PathifiableTexts> => {
    const expressionsByEdoNotationNameEntries: [
        EdoNotationName,
        Expression[],
    ][] = Object.entries(expressionsByEdoNotationName) as [
        EdoNotationName,
        Expression[],
    ][]

    return expressionsByEdoNotationNameEntries.reduce(
        (
            pathifiableTextsByEdoNotationName: Record<
                EdoNotationName,
                PathifiableTexts
            >,
            [edoNotationName, expressions]: [EdoNotationName, Expression[]],
        ) => {
            const texts: Io[] = []
            const fontIndices: Index<Font>[] = []
            const additionalYOffsets: Px[] = []

            expressions.forEach(
                ({ definiendum, definiens }: Expression): void => {
                    texts.push(definiendum)
                    fontIndices.push(0 as Index<Font>)
                    additionalYOffsets.push(0 as Px)
                    texts.push(definiens)
                    fontIndices.push(1 as Index<Font>)
                    additionalYOffsets.push(DEFINIENS_Y_OFFSET)
                },
            )

            pathifiableTextsByEdoNotationName[edoNotationName] = {
                texts,
                fonts: deepClone(FONTS),
                fontIndices,
                additionalYOffsets,
            }

            return pathifiableTextsByEdoNotationName
        },
        {} as Record<EdoNotationName, PathifiableTexts>,
    )
}

const computeCommaQuotient = (comma: Comma): Io => {
    return formatQuotient(computeQuotientFromPev(comma.pev))
}

const flipSagitype = (sagitype: Sagitype): Sagitype => {
    const sagittal: Sagittal = parseSagitype(sagitype)
    return computeAccidentalSagitype({ ...sagittal, down: true })
}

const maybeUpOrDown = (
    isPrimaryDown: boolean,
    isSecondaryDown: boolean,
): Io => {
    if (isPrimaryDown === isSecondaryDown) return ""
    if (isSecondaryDown) return "up "
    return "down "
}

const maybeFlipSecondaryComma = (
    secondaryComma: Comma,
    {
        isPrimaryDown,
        isSecondaryDown,
    }: { isPrimaryDown: boolean; isSecondaryDown: boolean },
): Comma => {
    if (isPrimaryDown === isSecondaryDown) return secondaryComma
    if (isSecondaryDown)
        return computeSuperSpev(secondaryComma) as Spev as Comma
    return computeSubSpev(secondaryComma) as Spev as Comma
}

const computeExpression = (
    { sagitype, validCommas, nonJiMeaning }: StepDefinition,
    isFirstExpression: boolean,
    isFinalExpression: boolean,
): Maybe<Expression> => {
    if (isUndefined(validCommas)) {
        if (isUndefined(nonJiMeaning)) {
            return undefined
        } else {
            return {
                definiendum: `${
                    isFirstExpression ? "" : "5; "
                }${sagitype};` as Code & Sentence,
                definiens: ` = ${nonJiMeaning}${
                    isFinalExpression ? "" : ","
                }` as Io,
            }
        }
    }
    // TODO: I feel like I've got some other spots where I'm using Io where I should be using Name<Comma>
    const primaryCommaName: Maybe<Name<Comma>> = validCommas[0]
    const primaryComma: Maybe<Comma> = isUndefined(primaryCommaName)
        ? undefined
        : computeCommaFromCommaName(parseCommaName(primaryCommaName))
    const isPrimaryDown: boolean = isUndefined(primaryComma)
        ? false
        : isSpevSub(primaryComma)

    // TODO: handle multiple secondaries
    const secondaryCommaName: Maybe<Name<Comma>> = validCommas[1]
    const secondaryComma: Maybe<Comma> = isUndefined(secondaryCommaName)
        ? undefined
        : computeCommaFromCommaName(parseCommaName(secondaryCommaName))
    const isSecondaryDown: boolean = isUndefined(secondaryComma)
        ? false
        : isSpevSub(secondaryComma)

    const primaryCommaExpression: Io = isUndefined(primaryComma)
        ? ""
        : ` = ~${primaryCommaName} (~${computeCommaQuotient(primaryComma)})`
    const secondaryCommaExpression: Io = isUndefined(secondaryComma)
        ? ""
        : ` ≈ ~${secondaryCommaName} ${
              isUndefined(primaryComma)
                  ? ""
                  : maybeUpOrDown(isPrimaryDown, isSecondaryDown)
          }(~${computeCommaQuotient(
              // TODO: hmmmmmm I think the problem is just we need to be looking at the super/sub of the 2,3-free class
              isUndefined(primaryComma)
                  ? secondaryComma
                  : maybeFlipSecondaryComma(secondaryComma, {
                        isPrimaryDown,
                        isSecondaryDown,
                    }),
          )})`

    return {
        definiendum: `${isFirstExpression ? "" : "5; "}${
            // TODO: arrggghhh feeling pretty inconsistent about what stuff we put in maybes and what stuff is out here
            // and also how maybe we should just have separate branches for existences of primary and secondary?
            isPrimaryDown || (isUndefined(primaryComma) && isSecondaryDown)
                ? flipSagitype(sagitype)
                : sagitype
        };` as Code & Sentence,
        definiens: `${primaryCommaExpression}${secondaryCommaExpression}${
            isFinalExpression ? "" : ","
        }` as Io,
    }
}

const computePathifiableTextsForExpressionsByEdoNotationNameFromEdoNotationDefinitions =
    (): Record<EdoNotationName, PathifiableTexts> => {
        const expressionsByEdoNotationName: Record<
            EdoNotationName,
            Expression[]
        > = EDO_NOTATION_DEFINITIONS_ENTRIES.reduce(
            (
                expressionsByEdoNotationName: Record<
                    EdoNotationName,
                    Expression[]
                >,
                [edoNotationName, edoNotationDefinition]: [
                    EdoNotationName,
                    EdoNotationDefinition,
                ],
            ): Record<EdoNotationName, Expression[]> => {
                if (!isSubsetNotation(edoNotationDefinition)) {
                    const { stepDefinitions } = edoNotationDefinition

                    expressionsByEdoNotationName[edoNotationName] =
                        stepDefinitions
                            .map(
                                (
                                    stepDefinition: StepDefinition,
                                    index: number,
                                ): Maybe<Expression> => {
                                    return computeExpression(
                                        stepDefinition,
                                        index === 0,
                                        index === stepDefinitions.length - 1,
                                    )
                                },
                            )
                            .filter(Boolean) as Expression[]
                }
                return expressionsByEdoNotationName
            },
            {} as Record<EdoNotationName, Expression[]>,
        )

        return convertToPathifiableTexts(expressionsByEdoNotationName)
    }

const PATHIFIABLE_TEXTS_FOR_EXPRESSIONS_BY_EDO_NOTATION_NAME: Record<
    EdoNotationName,
    PathifiableTexts
> =
    computePathifiableTextsForExpressionsByEdoNotationNameFromEdoNotationDefinitions()

export { PATHIFIABLE_TEXTS_FOR_EXPRESSIONS_BY_EDO_NOTATION_NAME }
