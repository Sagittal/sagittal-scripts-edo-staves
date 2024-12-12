import { Comma, Io, isUndefined, Name } from "@sagittal/general"
import { computeCommaName } from "@sagittal/system"
import { computeComma } from "../comma"
import { computeIsDown } from "../down"
import { flipComma } from "../flip"
import { computeFormattedCommaFromCommaName } from "../format"
import { CommaSection } from "../types"
import { PRIMARY_COMMA_NAME_OPTIONS } from "./constants"

const computePrimaryRoleText = ({ sagitype, primaryComma, isDown }: CommaSection): Io => {
    if (isUndefined(primaryComma)) return ""

    const primaryCommaName: Name<Comma> = computeCommaName(primaryComma, PRIMARY_COMMA_NAME_OPTIONS)
    const formattedPrimaryComma: Io = computeFormattedCommaFromCommaName(primaryCommaName)

    const oppositePrimaryCommaName: Name<Comma> = computeCommaName(flipComma(computeComma(primaryCommaName)))
    const oppositeFormattedPrimaryComma: Io = computeFormattedCommaFromCommaName(oppositePrimaryCommaName)

    const isPrimaryDown: boolean = computeIsDown(primaryCommaName)
    const formattedSuperPrimaryComma: Io = isPrimaryDown
        ? oppositeFormattedPrimaryComma
        : formattedPrimaryComma

    const sameDirection: boolean = isPrimaryDown === isDown
    const formattedMatchingPrimaryComma: Io = sameDirection
        ? formattedPrimaryComma
        : oppositeFormattedPrimaryComma
    const upOrDownText: Io = sameDirection ? "" : isDown ? " down" : " up"

    return (
        `The primary role of {{sagittal| ${sagitype} }} is ` +
        `[[${formattedSuperPrimaryComma}#Sagittal notation | ${formattedMatchingPrimaryComma}]] ` +
        `(${primaryCommaName}${upOrDownText}). `
    )
}

export { computePrimaryRoleText }
