import { Index, Io } from "@sagittal/general"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    EdoNotationDefinition,
    isSubsetNotation,
} from "@sagittal/system"
import { computeHasHalfApotome } from "../../../../../halfApotome"

const isSagitype = (text: Io): boolean => !!text.match(/^[\d; /\\()~!|`,.'XY]+$/)
const isDownSagitype = (text: Io): boolean => !!text.match(/!/g)
const isNotFirstExpression = (texts: Io[], position: Index<Io>): boolean => texts.length > position

const handleSzAtPosition = (texts: Io[], position: Index<Io>) => {
    const textAtPosition: Io = texts[texts.length - position]

    if (texts.length >= position && isSagitype(textAtPosition)) {
        const maybePadding: Io = isNotFirstExpression(texts, position) ? "4; " : ""
        const evoSzSagitype: Io = isDownSagitype(textAtPosition) ? `d` : `t`
        texts[texts.length - position] = `${maybePadding}${evoSzSagitype}`
    }
}

const handleSzForExpressions = (
    texts: Io[],
    { edoNotationName }: { edoNotationName: EdoNotationName },
): void => {
    const edoNotationDefinition: EdoNotationDefinition = EDO_NOTATION_DEFINITIONS[edoNotationName]
    if (isSubsetNotation(edoNotationDefinition)) return

    if (computeHasHalfApotome(edoNotationName) && texts.length > 0) {
        handleSzAtPosition(texts, 2 as Index<Io>)
        handleSzAtPosition(texts, 3 as Index<Io>)
    }
}

export { handleSzForExpressions }
