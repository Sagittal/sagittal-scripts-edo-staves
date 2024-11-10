import { computeDeepDistinct, isUndefined, Maybe, stringify } from "@sagittal/general"
import { EdoNotationName, parseEdoNotationName } from "@sagittal/system"
import { MAX_PERIODIC_TABLE_EDO } from "../../../../../src/constants"
import { computeSupersetEdoNotationNames } from "../../../../../src/context/lines/related/sets"

const EXPECTED_DIRECT_SUPERSETS: Record<EdoNotationName, EdoNotationName[]> = {
    // 5n
    "5": ["10", "15", "25", "35b"],
    "10": ["20", "30"],
    "15": ["30"],

    // 6n
    "6": ["12", "18"],
    "8": ["24"],
    "12": ["24", "36", "60"],
    "18": ["36"],
    "24": ["48", "72"],
    "36": ["72"],

    // 7n
    "7": ["14", "21", "35"],
    "14": ["28", "42b"],
    "21": ["42b"],

    // 11n
    "11": ["22"],
    "22": ["44", "66"],

    // 13n
    "13": ["26"],
    "26": ["52"],

    // 17n
    "17": ["34"],

    // 19n
    "19": ["38", "57", "76"],

    // 27n
    "27": ["54"],

    // 31n
    "31": ["62"],

    // 32n
    "32": ["64b"],
} as Record<EdoNotationName, EdoNotationName[]>

const computeRecursiveSupersets = (edoNotationNames: EdoNotationName[]): EdoNotationName[] => {
    return computeDeepDistinct(
        edoNotationNames
            .map((edoNotationName: EdoNotationName): EdoNotationName[] => {
                const directSupersets: Maybe<EdoNotationName[]> = EXPECTED_DIRECT_SUPERSETS[edoNotationName]

                return isUndefined(directSupersets)
                    ? edoNotationNames
                    : edoNotationNames.concat(computeRecursiveSupersets(directSupersets))
            })
            .flat()
            .sort(),
    )
}

const computeExpectedSupersetsFromExpectedDirectSuperset = (
    expectedDirectSupersets: Record<EdoNotationName, EdoNotationName[]>,
): Record<EdoNotationName, EdoNotationName[]> => {
    const expectedDirectSupersetsEntries: [EdoNotationName, EdoNotationName[]][] = Object.entries(
        expectedDirectSupersets,
    ) as [EdoNotationName, EdoNotationName[]][]

    return expectedDirectSupersetsEntries.reduce(
        (
            expectedSupersets: Record<EdoNotationName, EdoNotationName[]>,
            [edoNotationName, supersetEdoNotationNames]: [EdoNotationName, EdoNotationName[]],
        ) => {
            expectedSupersets[edoNotationName] = computeRecursiveSupersets(supersetEdoNotationNames)

            return expectedSupersets
        },
        {} as Record<EdoNotationName, EdoNotationName[]>,
    )
}

const EXPECTED_SUPERSETS: Record<EdoNotationName, EdoNotationName[]> =
    computeExpectedSupersetsFromExpectedDirectSuperset(EXPECTED_DIRECT_SUPERSETS)

describe("computeSupersetEdoNotationNames", (): void => {
    it("computes the correct list of EDOs whose notations are supersets of the given EDO's notation", (): void => {
        const expectedSupersetsEntries: [EdoNotationName, EdoNotationName[]][] = Object.entries(
            EXPECTED_SUPERSETS,
        ) as [EdoNotationName, EdoNotationName[]][]
        expectedSupersetsEntries.forEach(
            ([edoNotationName, expectedSupersetEdoNotationNames]: [
                EdoNotationName,
                EdoNotationName[],
            ]): void => {
                const actualSupersetEdoNotationNames: EdoNotationName[] = computeSupersetEdoNotationNames(
                    edoNotationName,
                ).filter(
                    (edoNotationName: EdoNotationName): boolean =>
                        parseEdoNotationName(edoNotationName).edo <= MAX_PERIODIC_TABLE_EDO,
                )

                expect(actualSupersetEdoNotationNames)
                    .withContext(
                        `Expected ${edoNotationName} to find supersets ${stringify(expectedSupersetEdoNotationNames)}, but instead found ${stringify(actualSupersetEdoNotationNames)}`,
                    )
                    .toEqual(expectedSupersetEdoNotationNames)
            },
        )
    })
})
