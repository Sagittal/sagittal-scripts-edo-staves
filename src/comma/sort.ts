import { Comma, computeQuotientFromVector, Name, Numerator } from "@sagittal/general"
import { computeComma } from "./comma"
import { CommaSection } from "./types"

const computeCommaNumerator = (commaName: Name<Comma>): Numerator =>
    computeQuotientFromVector(computeComma(commaName).vector)[0]

const sortByNumeratorDescending = (
    commaSectionEntries: [Name<Comma>, CommaSection][],
): [Name<Comma>, CommaSection][] =>
    commaSectionEntries.sort(
        (
            [commaNameA, commaSectionA]: [Name<Comma>, CommaSection],
            [commaNameB, commaSectionB]: [Name<Comma>, CommaSection],
        ): number => computeCommaNumerator(commaNameB) - computeCommaNumerator(commaNameA),
    )

export { sortByNumeratorDescending }
