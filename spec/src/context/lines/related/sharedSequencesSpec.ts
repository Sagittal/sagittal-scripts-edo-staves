import { computeCombinations, Count, isUndefined, stringify } from "@sagittal/general"
import { EdoNotationName, parseEdoNotationName } from "@sagittal/system"
import { MAX_PERIODIC_TABLE_EDO } from "../../../../../src/constants"
import { computeSharedSagittalSequenceEdoNotationNames } from "../../../../../src/context/lines/related/sharedSequences"

const EXPECTED_SHARED_SAGITTAL_SEQUENCES: EdoNotationName[][] = [
    ["9", "14"],
    ["15", "22", "29"],
    ["16", "21"],
    ["17", "24", "31", "38"],
    ["23", "28", "33"],
    ["23b", "30", "37", "44"],
    ["25", "32"],
    ["30b", "35", "40"],
    ["34", "41"],
    ["35b", "42"],
    ["36", "43"],
    ["39", "46"],
    ["42b", "47"],
    ["45", "52", "59b"],
    ["50", "57", "64", "71b"],
    ["54", "61"],
    ["56", "63"],
    ["59", "66"],
    ["62", "69", "76"],
    ["65", "72"],
] as EdoNotationName[][]

const EDO_NAME_PAIR: Count<EdoNotationName> = 2 as Count<EdoNotationName>

const computeExpectedSharedSagittalSequencesByEdoNotationName = (
    expectedSharedSagittalSequences: EdoNotationName[][],
): Record<EdoNotationName, EdoNotationName[]> => {
    const expectedSharedSagittalSequencesByEdoNotationName = expectedSharedSagittalSequences.reduce(
        (
            expectedSharedSagittalSequencesByEdoNotationName: Record<EdoNotationName, EdoNotationName[]>,
            expectedSharedSagittalSequence: EdoNotationName[],
        ): Record<EdoNotationName, EdoNotationName[]> => {
            const combinations = computeCombinations(expectedSharedSagittalSequence, EDO_NAME_PAIR)
            combinations.forEach(([a, b]) => {
                if (isUndefined(expectedSharedSagittalSequencesByEdoNotationName[a]))
                    expectedSharedSagittalSequencesByEdoNotationName[a] = []
                expectedSharedSagittalSequencesByEdoNotationName[a].push(b)
                if (isUndefined(expectedSharedSagittalSequencesByEdoNotationName[b]))
                    expectedSharedSagittalSequencesByEdoNotationName[b] = []
                expectedSharedSagittalSequencesByEdoNotationName[b].push(a)
            })
            return expectedSharedSagittalSequencesByEdoNotationName
        },
        {} as Record<EdoNotationName, EdoNotationName[]>,
    )

    const keys: EdoNotationName[] = Object.keys(
        expectedSharedSagittalSequencesByEdoNotationName,
    ) as EdoNotationName[]

    keys.forEach((key) => {
        expectedSharedSagittalSequencesByEdoNotationName[key] =
            expectedSharedSagittalSequencesByEdoNotationName[key].sort()
    })

    return expectedSharedSagittalSequencesByEdoNotationName
}

const EXPECTED_SHARED_SAGITTAL_SEQUENCES_BY_EDO_NAME =
    computeExpectedSharedSagittalSequencesByEdoNotationName(EXPECTED_SHARED_SAGITTAL_SEQUENCES)

describe("computeSharedSagittalSequenceEdoNotationNames", (): void => {
    /* 
    Exact match of the full sequence spanning an apotome or limma. 
    Or equivalently exact match to the half apotome or limma and same number of steps to the apotome or limma. 
    Of course limma only applies to nonsubset rose notations.
    A limma fraction (nonsubset rose) notation can never have the same sequence as a non limma fraction notation 
    because limma complements are different from apotome complements.
    */
    it("given the name of an EDO, finds a sorted list of EDOs which share the same sagittal sequence", (): void => {
        const expectedSharedSagittalSequencesEntries: [EdoNotationName, EdoNotationName[]][] = Object.entries(
            EXPECTED_SHARED_SAGITTAL_SEQUENCES_BY_EDO_NAME,
        ) as [EdoNotationName, EdoNotationName[]][]
        expectedSharedSagittalSequencesEntries.forEach(
            ([edoNotationName, expectedSharedSagittalSequenceEdoNotationNames]: [
                EdoNotationName,
                EdoNotationName[],
            ]): void => {
                const actualSharedSagittalSequenceEdoNotationNames: EdoNotationName[] =
                    computeSharedSagittalSequenceEdoNotationNames(edoNotationName).filter(
                        (edoNotationName: EdoNotationName): boolean =>
                            parseEdoNotationName(edoNotationName).edo <= MAX_PERIODIC_TABLE_EDO,
                    )

                expect(actualSharedSagittalSequenceEdoNotationNames)
                    .withContext(
                        `Expected ${edoNotationName} to find shared sagittal sequences ${stringify(expectedSharedSagittalSequenceEdoNotationNames)}, but instead found ${stringify(actualSharedSagittalSequenceEdoNotationNames)}`,
                    )
                    .toEqual(expectedSharedSagittalSequenceEdoNotationNames)
            },
        )
    })
})
