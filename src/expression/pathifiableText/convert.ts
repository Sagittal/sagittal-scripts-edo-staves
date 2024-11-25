import { deepClone, Index, Io, Px } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { DEFINIENS_Y_OFFSET } from "../../diagram/svg/constants"
import { PathifiableTexts } from "../../diagram/svg/meaning/types"
import { Font } from "../../diagram/svg/types"
import { Expression } from "../types"
import { FONTS } from "./constants"

const convertToPathifiableTexts = (
    expressionsByEdoNotationName: Record<EdoNotationName, Expression[]>,
): Record<EdoNotationName, PathifiableTexts> => {
    const expressionsByEdoNotationNameEntries: [EdoNotationName, Expression[]][] = Object.entries(
        expressionsByEdoNotationName,
    ) as [EdoNotationName, Expression[]][]

    return expressionsByEdoNotationNameEntries.reduce(
        (
            pathifiableTextsByEdoNotationName: Record<EdoNotationName, PathifiableTexts>,
            [edoNotationName, expressions]: [EdoNotationName, Expression[]],
        ) => {
            const texts: Io[] = []
            const fontIndices: Index<Font>[] = []
            const additionalYOffsets: Px[] = []

            expressions.forEach(({ definiendum, definiens }: Expression): void => {
                texts.push(definiendum)
                fontIndices.push(0 as Index<Font>)
                additionalYOffsets.push(0 as Px)
                texts.push(definiens)
                fontIndices.push(1 as Index<Font>)
                additionalYOffsets.push(DEFINIENS_Y_OFFSET)
            })

            pathifiableTextsByEdoNotationName[edoNotationName] = {
                texts,
                fonts: deepClone(FONTS),
                fontIndices,
                additionalYOffsets,
            }

            return pathifiableTextsByEdoNotationName
        },
        {} as Record<EdoNotationName, PathifiableTexts>,
    )
}

export { convertToPathifiableTexts }
