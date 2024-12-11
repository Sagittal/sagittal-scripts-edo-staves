import { Comma, Io, isUndefined, Name } from "@sagittal/general"
import { computeCommaName, DirectedNumbers, DirectedWord } from "@sagittal/system"
import { flipComma, flipSagitype } from "../flip"
import { CommaSection } from "../types"

const computeOppositeText = (
    commaName: Name<Comma>,
    { comma, sagitype, isDown, primaryCommaName }: CommaSection,
): Io => {
    const wardText = isDown ? "upward" : "downward"
    const maybeSecondaryRoleText = isUndefined(primaryCommaName) ? "" : "(in a secondary role) "
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
