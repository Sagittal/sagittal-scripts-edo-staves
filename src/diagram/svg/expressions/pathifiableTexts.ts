import { EdoNotationName } from "@sagittal/system"
import { Expression, PathifiableTexts } from "./types"
import { Code, computeInputSentenceUnicode } from "staff-code"
import { Index, Io, Px, Sentence } from "@sagittal/general"
import { Font } from "../types"
import { DEFINIENS_Y_OFFSET } from "../constants"

const RAW_EXPRESSION_DATA = `
5 12;  nl;
6 12;  nl;
7 12;  nl;
8 12;  nl;
9 12; |\\; = ~55C (55/54) nl;
10 12; (!/; ≈ ~13L (26/27) nl;
11 12;  nl;
12 12;  nl;
13 12;  nl;
14 12; |\\; = ~55C (55/54) nl;
15 12; \\!; = ~5C (80/81) nl;
16 12; !); = ~7C (63/64) nl;
17 12; /|\\; = ~11M (33/32) nl;
18 12;  nl;
19 12;  nl;
20 12; )~!; = ~143C (143/144), 12; (!/; ≈ ~13L (26/27) nl;
21 12; !); = ~7C (63/64) nl;
22 12; \\!; = ~5C (80/81) nl;
23 12; !); = ~7C (63/64), 12; |\\; = ~55C (55/54) nl;
24 12; /|\\; = ~11M (33/32) nl;
25 12; )~!; = ~143C (143/144), 12; \\!; = ~5C (80/81) nl;
26 12;  nl;
27 12; \\!; = ~5C (80/81), 12; (!/; ≈ ~13L (26/27) nl;
28 12; !); = ~7C (63/64), 12; |\\; = ~55C (55/54) nl;
29 12; \\!; = ~5C (80/81) nl;
30 12; )|; = ~19s (513/512), 12; \\!; = ~5C (80/81), 12; (!/; ≈ ~13L (26/27) nl;
31 12; /|\\; = ~11M (33/32) nl;
32 12; )~!; = ~143C (143/144), 12; \\!; = ~5C (80/81) nl;
33 12; !); = ~7C (63/64), 12; |\\; = ~55C (55/54) nl;
34 12; \\!; = ~5C (80/81), 12; /|\\; = ~11M (33/32) nl;
35 12; !(; ≈ ~13/11k (351/352), 12; !); = ~7C (63/64) nl;
36 12; !); = ~7C (63/64) nl;
37 12; )|; = ~19s (513/512), 12; \\!; = ~5C (80/81), 12; (!/; ≈ ~13L (26/27) nl;
38 12; /|\\; = ~11M (33/32) nl;
39 12; \\!; = ~5C (80/81), 12; /|\\; = ~11M (33/32) nl;
40 12; !(; ≈ ~13/11k (351/352), 12; !); = ~7C (63/64), 12; (|\\; ≈ ~7L (28/27) nl;
41 12; \\!; = ~5C (80/81), 12; /|\\; = ~11M (33/32) nl;
42 12; )|; = ~19s (513/512), 12; \\!; = ~5C (80/81), 12; \\!); = ~35M (35/36) nl;
43 12; !); = ~7C (63/64) nl;
44 12; )|; = ~19s (513/512), 12; \\!; = ~5C (80/81), 12; (!/; ≈ ~13L (26/27) nl;
45 12; \\!); = ~35M (35/36) nl;
46 12; \\!; = ~5C (80/81), 12; /|\\; = ~11M (33/32) nl;
47 12; !); = ~7C (63/64), 12; |\\; = ~55C (55/54) nl;
48 12; |~; = ~23C (736/729), 12; /|\\; = ~11M (33/32) nl;
49 12; )|; = ~19s (513/512), 12; \\!; = ~5C (80/81), 12; /|\\; = ~11M (33/32) nl;
50 12; /|); ≈ ~13M (1053/1024) nl;
51 12; !); = ~7C (63/64), 12; \\!; = ~5C (80/81), 12; (!/; ≈ ~13L (26/27) nl;
52 12; \\!); = ~35M (35/36) nl;
53 12; \\!; = ~5C (80/81), 12; \\\\!; = ~25S (6400/6561) nl;
54 12; )|; = ~19s (513/512), 12; /|\\; = ~11M (33/32), 12; (!/; ≈ ~13L (26/27) nl;
55 12; )!(; = ~11/7k (891/896), 12; /|\\; = ~11M (33/32) nl;
56 12; !); = ~7C (63/64), 12; \\!; = ~5C (80/81), 12; /|\\; = ~11M (33/32) nl;
57 12; /|); ≈ ~13M (1053/1024) nl;
58 12; \\!; = ~5C (80/81), 12; |\\; = ~55C (55/54), 12; /|\\; = ~11M (33/32) nl;
59 12; )~!; = ~143C (143/144), 12; \\!; = ~5C (80/81), 12; /|); ≈ ~13M (1053/1024) nl;
60 12; (!; = ~11/7C (45056/45927), 12; /|~; = ~23/5S (46/45) nl;
61 12; )|; = ~19s (513/512), 12; \\!; = ~5C (80/81), 12; /|\\; = ~11M (33/32), 12; (!/; ≈ ~13L (26/27) nl;
62 12; /|); ≈ ~13M (1053/1024), 12; /|\\; = ~11M (33/32) nl;
63 12; !); = ~7C (63/64), 12; \\!; = ~5C (80/81), 12; /|\\; = ~11M (33/32) nl;
64 12; /|); ≈ ~13M (1053/1024) nl;
65 12; \\!; = ~5C (80/81), 12; !); = ~7C (63/64), 12; /|\\; = ~11M (33/32) nl;
66 12; )|; = ~19s (513/512), 12; )~!; = ~143C (143/144), 12; \\!; = ~5C (80/81), 12; /|); ≈ ~13M (1053/1024) nl;
67 12; )!(; = ~11/7k (891/896), 12; \\!); = ~35M (35/36) nl;
68 12; |\\; = ~55C (55/54), 12; \\!; = ~5C (80/81), 12; /|\\; = ~11M (33/32), 12; (!/; ≈ ~13L (26/27) nl;
69 12; /|); ≈ ~13M (1053/1024), 12; \\!/; ≈ ~25·11/7M (550/567) nl;
70 12; \\!; = ~5C (80/81), 12; |\\; = ~55C (55/54), 12; /|\\; = ~11M (33/32) nl;
71 12; |\\; = ~55C (55/54), 12; )~!; = ~143C (143/144), 12; \\!; = ~5C (80/81), 12; /|\\; = ~11M (33/32), 12; (!/; ≈ ~13L (26/27) nl;
72 12; \\!; = ~5C (80/81), 12; !); = ~7C (63/64), 12; /|\\; = ~11M (33/32) nl;
23b 12; (!/; ≈ ~13L (26/27) nl;
30b 12; !); = ~7C (63/64) nl;
35b 12; \\!); = ~35M (35/36) nl;
42b 12; !); = ~7C (63/64), 12; |\\; = ~55C (55/54) nl;
47b 12; \\!; = ~5C (80/81), 12; (!/; ≈ ~13L (26/27) nl;
59b 12; \\!); = ~35M (35/36) nl;
64b 12; )~!; = ~143C (143/144), 12; )|(; ≈ ~35/11k (2835/2816), 12; (!/; ≈ ~13L (26/27) nl;
71b 12; /|); ≈ ~13M (1053/1024) nl;
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
    const expressionsByEdoNotationNameEntries: [EdoNotationName, Expression[]][] =
        Object.entries(expressionsByEdoNotationName) as [
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
                    texts.push(computeInputSentenceUnicode(definiendum))
                    fontIndices.push(0 as Index<Font>)
                    additionalYOffsets.push(0 as Px)
                    texts.push(definiens)
                    fontIndices.push(1 as Index<Font>)
                    additionalYOffsets.push(DEFINIENS_Y_OFFSET)
                },
            )

            pathifiableTextsByEdoNotationName[edoNotationName] = {
                texts,
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

const PATHIFIABLE_TEXTS_BY_EDO_NAME: Record<EdoNotationName, PathifiableTexts> =
    computePathifiableTextsByEdoNotationNameFromRawExpressionData(RAW_EXPRESSION_DATA)

export { PATHIFIABLE_TEXTS_BY_EDO_NAME }
