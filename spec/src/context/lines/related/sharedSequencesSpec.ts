import { EdoName, parseEdoName } from "@sagittal/system"
import { MAX_PERIODIC_TABLE_EDO } from "../../../../../src/constants"
import { computeCombinations, Count, isUndefined } from "@sagittal/general"
import { computeSharedSagittalSequenceEdoNames } from "../../../../../src/context/lines/related/sharedSequences"

const EXPECTED_SHARED_SAGITTAL_SEQUENCES: EdoName[][] = [
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
    ["62", "69"],
    ["65", "72"],
] as EdoName[][]

const EDO_NAME_PAIR: Count<EdoName> = 2 as Count<EdoName>

const computeExpectedSharedSagittalSequencesByEdoName = (
    expectedSharedSagittalSequences: EdoName[][],
): Record<EdoName, EdoName[]> => {
    const expectedSharedSagittalSequencesByEdoName =
        expectedSharedSagittalSequences.reduce(
            (
                expectedSharedSagittalSequencesByEdoName: Record<
                    EdoName,
                    EdoName[]
                >,
                expectedSharedSagittalSequence: EdoName[],
            ): Record<EdoName, EdoName[]> => {
                const combinations = computeCombinations(
                    expectedSharedSagittalSequence,
                    EDO_NAME_PAIR,
                )
                combinations.forEach(([a, b]) => {
                    if (
                        isUndefined(expectedSharedSagittalSequencesByEdoName[a])
                    )
                        expectedSharedSagittalSequencesByEdoName[a] = []
                    expectedSharedSagittalSequencesByEdoName[a].push(b)
                    if (
                        isUndefined(expectedSharedSagittalSequencesByEdoName[b])
                    )
                        expectedSharedSagittalSequencesByEdoName[b] = []
                    expectedSharedSagittalSequencesByEdoName[b].push(a)
                })
                return expectedSharedSagittalSequencesByEdoName
            },
            {} as Record<EdoName, EdoName[]>,
        )

    const keys: EdoName[] = Object.keys(
        expectedSharedSagittalSequencesByEdoName,
    ) as EdoName[]

    keys.forEach((key) => {
        expectedSharedSagittalSequencesByEdoName[key] =
            expectedSharedSagittalSequencesByEdoName[key].sort()
    })

    return expectedSharedSagittalSequencesByEdoName
}

const EXPECTED_SHARED_SAGITTAL_SEQUENCES_BY_EDO_NAME =
    computeExpectedSharedSagittalSequencesByEdoName(
        EXPECTED_SHARED_SAGITTAL_SEQUENCES,
    )

describe("computeSharedSagittalSequenceEdoNames", (): void => {
    /* 
    Exact match of the full sequence spanning an apotome or limma. 
    Or equivalently exact match to the half apotome or limma and same number of steps to the apotome or limma. 
    Of course limma only applies to nonsubset rose notations.
    A limma fraction (nonsubset rose) notation can never have the same sequence as a non limma fraction notation 
    because limma complements are different from apotome complements.
    */
    it("given the name of an EDO, finds a sorted list of EDOs which share the same sagittal sequence", (): void => {
        const expectedSharedSagittalSequencesEntries: [EdoName, EdoName[]][] =
            Object.entries(EXPECTED_SHARED_SAGITTAL_SEQUENCES_BY_EDO_NAME) as [
                EdoName,
                EdoName[],
            ][]
        expectedSharedSagittalSequencesEntries.forEach(
            ([edoName, expectedSharedSagittalSequenceEdoNames]: [
                EdoName,
                EdoName[],
            ]): void => {
                const actualSharedSagittalSequenceEdoNames: EdoName[] =
                    computeSharedSagittalSequenceEdoNames(edoName).filter(
                        (edoName: EdoName): boolean =>
                            parseEdoName(edoName).edo <= MAX_PERIODIC_TABLE_EDO,
                    )

                expect(actualSharedSagittalSequenceEdoNames)
                    .withContext(
                        `Expected ${edoName} to find shared sagittal sequences ${expectedSharedSagittalSequenceEdoNames}, but instead found ${actualSharedSagittalSequenceEdoNames}`,
                    )
                    .toEqual(expectedSharedSagittalSequenceEdoNames)
            },
        )
    })
})
