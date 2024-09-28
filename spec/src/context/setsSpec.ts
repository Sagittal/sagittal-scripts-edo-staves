import { computeDeepDistinct, isUndefined, Maybe } from "@sagittal/general"
import { EdoName, parseEdoName } from "@sagittal/system"
import { computeSupersetEdoNames } from "../../../src/context/sets"
import { MAX_PERIODIC_TABLE_EDO } from "../../../src/constants"

const EXPECTED_DIRECT_SUPERSETS: Record<EdoName, EdoName[]> = {
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
    "19": ["38", "57"],

    // 27n
    "27": ["54"],

    // 31n
    "31": ["62"],

    // 32n
    "32": ["64b"],
} as Record<EdoName, EdoName[]>

const computeRecursiveSupersets = (edoNames: EdoName[]): EdoName[] => {
    return computeDeepDistinct(
        edoNames
            .map((edoName: EdoName): EdoName[] => {
                const directSupersets: Maybe<EdoName[]> =
                    EXPECTED_DIRECT_SUPERSETS[edoName]

                return isUndefined(directSupersets)
                    ? edoNames
                    : edoNames.concat(
                          computeRecursiveSupersets(directSupersets),
                      )
            })
            .flat()
            .sort(),
    )
}

const computeExpectedSupersetsFromExpectedDirectSuperset = (
    expectedDirectSupersets: Record<EdoName, EdoName[]>,
): Record<EdoName, EdoName[]> => {
    const expectedDirectSupersetsEntries: [EdoName, EdoName[]][] =
        Object.entries(expectedDirectSupersets) as [EdoName, EdoName[]][]

    return expectedDirectSupersetsEntries.reduce(
        (
            expectedSupersets: Record<EdoName, EdoName[]>,
            [edoName, supersetEdoNames]: [EdoName, EdoName[]],
        ) => {
            expectedSupersets[edoName] =
                computeRecursiveSupersets(supersetEdoNames)

            return expectedSupersets
        },
        {} as Record<EdoName, EdoName[]>,
    )
}

const EXPECTED_SUPERSETS: Record<EdoName, EdoName[]> =
    computeExpectedSupersetsFromExpectedDirectSuperset(
        EXPECTED_DIRECT_SUPERSETS,
    )

describe("computeSupersetEdoNames", (): void => {
    it("computes the correct list of EDOs whose notations are supersets of the given EDO's notation", (): void => {
        const expectedSupersetsEntries: [EdoName, EdoName[]][] = Object.entries(
            EXPECTED_SUPERSETS,
        ) as [EdoName, EdoName[]][]
        expectedSupersetsEntries.forEach(
            ([edoName, expectedSupersetEdoNames]: [
                EdoName,
                EdoName[],
            ]): void => {
                const actualSupersetEdoNames: EdoName[] =
                    computeSupersetEdoNames(edoName).filter(
                        (edoName: EdoName): boolean =>
                            parseEdoName(edoName).edo <= MAX_PERIODIC_TABLE_EDO,
                    )

                expect(actualSupersetEdoNames)
                    .withContext(
                        `Expected ${edoName} to find supersets ${expectedSupersetEdoNames}, but instead found ${actualSupersetEdoNames}`,
                    )
                    .toEqual(expectedSupersetEdoNames)
            },
        )
    })
})
