import { EdoNotationName } from "@sagittal/system"
import { Expression } from "./types"
import { Code } from "staff-code"
import { deepClone, Index, Io, Px, Sentence } from "@sagittal/general"
import { Font } from "../../types"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_FONT_SIZE,
    DEFINIENS_Y_OFFSET,
} from "../../constants"
import { MEANINGS_FONT } from "../constants"
import { PathifiableTexts } from "../types"

const DEFINIENDUM_FONT: Font = {
    fontFile: BRAVURA_TEXT_SC_FONT_FILE,
    fontSize: BRAVURA_TEXT_SC_FONT_SIZE,
}
const DEFINIENS_FONT: Font = deepClone(MEANINGS_FONT)
const FONTS = [DEFINIENDUM_FONT, DEFINIENS_FONT]

const RAW_EXPRESSIONS_DATA = `
17 12; /|\\; = ~11M (~33/32) nl;
22 12; \\!; = ~5C (~80/81) nl;
24 12; /|\\; = ~11M (~33/32) nl;
27 12; \\!; = ~5C (~80/81), 12; (|\\; = ~35L (~8505/8192) ≈ ~13L up (~27/26) nl;
29 12; \\!; = ~5C (~80/81) nl;
31 12; /|\\; = ~11M (~33/32) nl;
34 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32) nl;
36 12; !); = ~7C (~63/64) nl;
38 12; /|\\; = ~11M (~33/32) nl;
39 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32) nl;
41 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32) nl;
43 12; !); = ~7C (~63/64) nl;
44 12; )|; = ~19s (~513/512), 12; \\!; = ~5C (~80/81), 12; (!/; ≈ ~13L (~26/27) nl;
45 12; \\!); = ~35M (~35/36) ≈ ~13M down (~1024/1053) nl;
46 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32) nl;
48 12; |~; = ~23C (~736/729), 12; /|\\; = ~11M (~33/32) nl;
49 12; )|; = ~19s (~513/512), 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32) nl;
50 12; /|); ≈ ~13M (~1053/1024) nl;
51 12; !); = ~7C (~63/64), 12; \\!; = ~5C (~80/81), 12; (!/; ≈ ~13L (~26/27) nl;
52 12; \\!); = ~35M (~35/36) nl;
53 12; \\!; = ~5C (~80/81), 12; \\\\!; = ~25S (~6400/6561) ≈ ~13/5S (~39/40) nl;
54 12; )|; = ~19s (~513/512), 12; /|; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32), 12; (!/; ≈ ~13L (~26/27) nl;
55 12; )!(; = ~11/7k (~891/896), 12; /|\\; = ~11M (~33/32) nl;
56 12; !); = ~7C (~63/64), 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32) nl;
57 12; /|); ≈ ~13M (~1053/1024) nl;
58 12; \\!; = ~5C (~80/81), 12; |\\; = ~55C (~55/54), 12; /|\\; = ~11M (~33/32) nl;
59 12; )|; = (~3A)/9 ((~2187/2048)/9), 12; )~!; = ~143C (~143/144), 12; \\!; = ~5C (~80/81), 12; /|); ≈ ~13M (~1053/1024) nl;
59b 12; \\!); = ~35M (~35/36) nl;
60 12; (!; = ~11/7C (~45056/45927), 12; /|~; = ~23/5S (~46/45) nl;
61 12; )|; = ~19s (~513/512), 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32), 12; (!/; ≈ ~13L (~26/27) nl;
62 12; /|); ≈ ~13M (~1053/1024), 12; /|\\; = ~11M (~33/32) nl;
63 12; !); = ~7C (~63/64), 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32) nl;
64 12; /|); ≈ ~13M (~1053/1024) nl;
65 12; \\!; = ~5C (~80/81), 12; !); = ~7C (~63/64), 12; /|\\; = ~11M (~33/32) nl;
66 12; )|; = ~19s (~513/512), 12; )~!; = ~143C (~143/144), 12; \\!; = ~5C (~80/81), 12; /|); ≈ ~13M (~1053/1024) nl;
67 12; )!(; = ~11/7k (~891/896), 12; \\!); = ~35M (~35/36) ≈ ~13M down (~1024/1053) nl;
68 12; !); = ~7C (~63/64), 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32), 12; (!/; ≈ ~13L (~26/27) nl;
69 12; /|); ≈ ~13M (~1053/1024), 12; /|\\; = ~11M (~33/32) nl;
70 12; \\!; = ~5C (~80/81), 12; |\\; = ~55C (~55/54), 12; /|\\; = ~11M (~33/32) nl;
71 12; |\\; = ~55C (~55/54), 12; )~!; = ~143C (~143/144), 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32), 12; (!/; ≈ ~13L (~26/27) nl;
71b 12; /|); ≈ ~13M (~1053/1024) nl;
72 12; \\!; = ~5C (~80/81), 12; !); = ~7C (~63/64), 12; /|\\; = ~11M (~33/32) nl;
73 12; !); = ~7C (~63/64), 12; \\!; = ~5C (~80/81), 12; (!(; = ~11/5S (~44/45), 12; /|\\; = ~11M (~33/32)
74 12; (!(; ≈ ~13/7S (~1664/1701), 12; \\!); = ~35M (~35/36) ≈ ~13M down (~1024/1053)
75 12; !); = ~7C (~63/64), 12; \\!; = ~5C (~80/81), 12; /|\\; = ~11M (~33/32), 12; (!/; ≈ ~13L (~26/27)
76 12; /|); ≈ ~13M (~1053/1024), 12; \\!/; ≈ ~25⋅11/7M (~550/567)
77 12; \\!; = ~5C (~80/81), 12; !); = ~7C (~63/64), 12; /|\\; = ~11M (~33/32)
`

const ALWAYS_LEADING_SPACE_FOR_DEFINIENS_WHICH_COMES_SECOND = " " as Io

const leadingSpaceExceptForFirstDefiniendum = (rawExpressionIndex: Index): Io =>
    rawExpressionIndex > 0 ? "5; " : ""

const parseExpression = (
    rawExpression: string,
    rawExpressionIndex: number,
): Expression => {
    const separatorIndex: Index = rawExpression.search(/[=≈]/) as Index
    const definiendum: Code & Sentence = (leadingSpaceExceptForFirstDefiniendum(
        rawExpressionIndex as Index,
    ) + rawExpression.slice(0, separatorIndex).trim()) as Code & Sentence
    const definiens: Io =
        ALWAYS_LEADING_SPACE_FOR_DEFINIENS_WHICH_COMES_SECOND +
        rawExpression.slice(separatorIndex)

    return { definiendum, definiens }
}

const computeExpressionsByEdoNotationName = (
    lines: string[],
): Record<EdoNotationName, Expression[]> =>
    lines.reduce(
        (
            expressionsByEdoNotationName: Record<EdoNotationName, Expression[]>,
            line: string,
        ): Record<EdoNotationName, Expression[]> => {
            const [edoNotationName, ...rawExpressions]: string[] =
                line.split(" 12; ")

            expressionsByEdoNotationName[edoNotationName as EdoNotationName] =
                rawExpressions.map(parseExpression)

            return expressionsByEdoNotationName
        },
        {} as Record<EdoNotationName, Expression[]>,
    )

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

const computePathifiableTextsByEdoNotationNameFromRawExpressionData = (
    rawExpressionData: string,
): Record<EdoNotationName, PathifiableTexts> => {
    const lines: string[] = rawExpressionData
        .split("\n")
        .map((line: string): string => line.replace(/ nl;/g, ""))
        .filter((line: string): boolean => line.length > 0)

    const expressionsByEdoNotationName: Record<EdoNotationName, Expression[]> =
        computeExpressionsByEdoNotationName(lines)

    return convertToPathifiableTexts(expressionsByEdoNotationName)
}

const PATHIFIABLE_TEXTS_FOR_EXPRESSIONS_BY_EDO_NAME: Record<
    EdoNotationName,
    PathifiableTexts
> =
    computePathifiableTextsByEdoNotationNameFromRawExpressionData(
        RAW_EXPRESSIONS_DATA,
    )

export { PATHIFIABLE_TEXTS_FOR_EXPRESSIONS_BY_EDO_NAME }
