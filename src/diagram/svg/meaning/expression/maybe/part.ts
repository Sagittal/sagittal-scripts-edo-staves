import { Comma, Io, Name } from "@sagittal/general"
import { computeFormattedCommaFromCommaName } from "../../../../../comma"

const computeCommaExpressionPart = (
    commaName: Name<Comma>,
    { isSecondary }: { isSecondary: boolean } = { isSecondary: false },
): Io => {
    const formattedCommaQuotient: Io = computeFormattedCommaFromCommaName(commaName)

    const equalitySymbol: Io = isSecondary ? "≈" : "="

    return ` ${equalitySymbol} ~${commaName} (~${formattedCommaQuotient})`
}

export { computeCommaExpressionPart }
