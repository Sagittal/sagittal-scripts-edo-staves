import { Io } from "@sagittal/general"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    EdoNotationDefinition,
    isSubsetNotation,
} from "@sagittal/system"
import { computeHasHalfApotome } from "../../../../../halfApotome"

const handleSzForExpressions = (
    texts: Io[],
    { edoNotationName }: { edoNotationName: EdoNotationName },
): void => {
    const edoNotationDefinition: EdoNotationDefinition = EDO_NOTATION_DEFINITIONS[edoNotationName]
    if (isSubsetNotation(edoNotationDefinition)) return

    if (computeHasHalfApotome(edoNotationName) && texts.length > 0)
        texts[texts.length - 2] = texts[texts.length - 2].match(/!/g) // is a down sagittal
            ? `${texts.length > 2 ? "4; " : ""}d`
            : `${texts.length > 2 ? "4; " : ""}t`
}

export { handleSzForExpressions }
