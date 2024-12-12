import { Comma, Io, isUndefined, Name } from "@sagittal/general"
import { computeCommaName } from "@sagittal/system"
import { computeComma } from "../comma"
import { computeIsDown } from "../down"
import { flipComma } from "../flip"
import { computeFormattedCommaFromCommaName } from "../format"
import { CommaSection } from "../types"
import { PRIMARY_COMMA_NAME_OPTIONS } from "./constants"

// TODO: types? missing them from a ton of these

const computePrimaryRoleText = ({ sagitype, primaryComma, isDown }: CommaSection): Io => {
    if (isUndefined(primaryComma)) return ""

    const primaryCommaName: Name<Comma> = computeCommaName(primaryComma, PRIMARY_COMMA_NAME_OPTIONS)
    const formattedPrimaryComma = computeFormattedCommaFromCommaName(primaryCommaName)

    const oppositePrimaryCommaName = computeCommaName(flipComma(computeComma(primaryCommaName)))
    const oppositeFormattedPrimaryComma = computeFormattedCommaFromCommaName(oppositePrimaryCommaName)

    const isPrimaryDown = computeIsDown(primaryCommaName)
    const formattedSuperPrimaryComma = isPrimaryDown ? oppositeFormattedPrimaryComma : formattedPrimaryComma

    const sameDirection = isPrimaryDown === isDown
    const formattedMatchPrimaryComma = sameDirection ? formattedPrimaryComma : oppositeFormattedPrimaryComma
    const upOrDownText = sameDirection ? "" : isDown ? " down" : " up"

    return (
        `The primary role of {{sagittal| ${sagitype} }} is ` +
        `[[${formattedSuperPrimaryComma}#Sagittal notation | ${formattedMatchPrimaryComma}]] ` +
        `(${primaryCommaName}${upOrDownText}). `
    )
}

export { computePrimaryRoleText }
