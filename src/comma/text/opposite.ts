import { Comma, Io, isUndefined, Name } from "@sagittal/general"
import { computeCommaName, DirectedNumbers, DirectedWord, Sagitype } from "@sagittal/system"
import { flipComma, flipSagitype } from "../flip"
import { CommaSection } from "../types"
import { fixFactoring } from "./format"

const computeOppositeText = ({ comma, commaName, sagitype, isDown, primaryComma }: CommaSection): Io => {
    const wardText: Io = isDown ? "upward" : "downward"
    const maybeSecondaryRoleText: Io = isUndefined(primaryComma) ? "" : "(in a secondary role) "
    const oppositeSagitype: Sagitype = flipSagitype(sagitype)

    const oppositeComma: Comma = flipComma(comma)
    const oppositeCommaName: Name<Comma> = fixFactoring(
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
