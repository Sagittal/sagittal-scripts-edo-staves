import { Io, isUndefined } from "@sagittal/general"
import { computeCommaName, DirectedNumbers, DirectedWord } from "@sagittal/system"
import { flipComma, flipSagitype } from "../flip"
import { CommaSection } from "../types"

const computeOppositeText = ({ comma, commaName, sagitype, isDown, primaryComma }: CommaSection): Io => {
    const wardText = isDown ? "upward" : "downward"
    const maybeSecondaryRoleText = isUndefined(primaryComma) ? "" : "(in a secondary role) "
    const oppositeSagitype = flipSagitype(sagitype)

    const oppositeComma = flipComma(comma)
    const oppositeCommaName = computeCommaName(oppositeComma, {
        directedWord: DirectedWord.NEVER,
        directedNumbers: DirectedNumbers.ON,
    })
        // TODO: DRY this up with the other place like this ... oh maybe there are many more?
        .replace(/5²/g, "25")

    return (
        `The ${wardText} version is called '''${oppositeCommaName}''' or '''${commaName} ${isDown ? "up" : "down"}''' ` +
        `and is represented ${maybeSecondaryRoleText}by {{sagittal| ${oppositeSagitype} }}. `
    )
}

export { computeOppositeText }
