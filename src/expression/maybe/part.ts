import { Comma, computeQuotientFromPev, formatQuotient, Io, Name } from "@sagittal/general"
import { computeComma } from "./comma"

const formatCommaQuotient = (comma: Comma): Io => formatQuotient(computeQuotientFromPev(comma.pev))

const computeCommaExpressionPart = (
    commaName: Name<Comma>,
    { isSecondary }: { isSecondary: boolean } = { isSecondary: false },
): Io => {
    const comma: Comma = computeComma(commaName)
    const formattedCommaQuotient: Io = formatCommaQuotient(comma)
    const equalitySymbol: Io = isSecondary ? "≈" : "="

    return ` ${equalitySymbol} ~${commaName} (~${formattedCommaQuotient})`
}

export { computeCommaExpressionPart }
