import { Io, isUndefined } from "@sagittal/general"
import { computeComma } from "../comma"
import { computeIsDown } from "../down"
import { flipComma } from "../flip"
import { computeFormattedCommaFromComma, computeFormattedCommaFromCommaName } from "../format"
import { CommaSection } from "../types"

// TODO: types? missing them from a ton of these

const computePrimaryRoleText = ({ sagitype, primaryCommaName, isDown }: CommaSection): Io => {
    if (isUndefined(primaryCommaName)) return ""

    const isPrimaryDown = computeIsDown(primaryCommaName)
    const sameDirection = isPrimaryDown === isDown

    // TODO: these were driving me nuts; surely there's a simpler way to achieve this
    const formattedSuperPrimaryComma = isPrimaryDown
        ? computeFormattedCommaFromComma(flipComma(computeComma(primaryCommaName)))
        : computeFormattedCommaFromCommaName(primaryCommaName)

    const formattedPrimaryComma = sameDirection
        ? computeFormattedCommaFromCommaName(primaryCommaName)
        : computeFormattedCommaFromComma(flipComma(computeComma(primaryCommaName)))

    const upOrDownText = sameDirection ? "" : isDown ? " down" : " up"

    return (
        `The primary role of {{sagittal| ${sagitype} }} is ` +
        `[[${formattedSuperPrimaryComma}#Sagittal notation | ${formattedPrimaryComma}]] ` +
        `(${primaryCommaName}${upOrDownText}). `
    )
}

export { computePrimaryRoleText }
