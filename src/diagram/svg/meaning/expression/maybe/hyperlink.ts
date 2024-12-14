import {
    formatQuotient,
    Hyperlink,
    Io,
    isNull,
    Maybe,
    parseQuotient,
    invertQuotient,
    isQuotientSub,
    Quotient,
} from "@sagittal/general"
import { XEN_WIKI_BASE_URL } from "../../../../../constants"

const computeExpressionHyperlink = (definiensBody: Io): Maybe<Hyperlink> => {
    const match = definiensBody.match(/\(~(\d+\/\d+)\)/)

    if (isNull(match)) {
        return undefined
    } else {
        let commaText: Io = match[1]
        const commaQuotient: Quotient = parseQuotient(commaText)
        commaText = isQuotientSub(commaQuotient) ? formatQuotient(invertQuotient(commaQuotient)) : commaText

        return `${XEN_WIKI_BASE_URL}${commaText}` as Hyperlink
    }
}

export { computeExpressionHyperlink }
