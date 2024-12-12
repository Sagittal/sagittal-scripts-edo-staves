import { Comma, computeQuotientFromVector, Name, Numerator } from "@sagittal/general"
import { computeComma } from "./comma"
import { CommaSection } from "./types"

const computeCommaNumerator = (commaName: Name<Comma>): Numerator =>
    computeQuotientFromVector(computeComma(commaName).vector)[0]

const sortByNumeratorDescending = (commaSections: CommaSection[]): CommaSection[] =>
    commaSections.sort(
        ({ commaName: commaNameA }: CommaSection, { commaName: commaNameB }: CommaSection): number =>
            computeCommaNumerator(commaNameB) - computeCommaNumerator(commaNameA),
    )

export { sortByNumeratorDescending }
