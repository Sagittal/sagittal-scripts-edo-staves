import { Io, isUndefined } from "@sagittal/general"
import { computeCommaName, DirectedNumbers, DirectedWord } from "@sagittal/system"
import { flipComma, flipSagitype } from "../flip"
import { CommaSection } from "../types"
import { fixFactoring } from "./format"

const computeOppositeText = ({ comma, commaName, sagitype, isDown, primaryComma }: CommaSection): Io => {
    const wardText = isDown ? "upward" : "downward"
    const maybeSecondaryRoleText = isUndefined(primaryComma) ? "" : "(in a secondary role) "
    const oppositeSagitype = flipSagitype(sagitype)

    const oppositeComma = flipComma(comma)
    const oppositeCommaName = fixFactoring(
        computeCommaName(oppositeComma, {
            directedWord: DirectedWord.NEVER,
            directedNumbers: DirectedNumbers.ON,
        }),
    )

    return (
        `The ${wardText} version is called '''${oppositeCommaName}''' or '''${commaName} ${isDown ? "up" : "down"}''' ` +
        `and is represented ${maybeSecondaryRoleText}by {{sagittal| ${oppositeSagitype} }}. `
    )
}

export { computeOppositeText }
