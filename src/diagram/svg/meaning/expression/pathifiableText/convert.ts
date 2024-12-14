import { deepClone, Hyperlink, Index, Io, isUndefined, Maybe, Px } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { BRAVURA_Y_OFFSET, MEANINGS_FONTS } from "../../../../../constants"
import { Font, PathifiableTexts } from "../../../../../types"
import { Expression } from "../types"

const convertExpressionsToPathifiableTexts = (
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
            const hyperlinks: Maybe<Hyperlink>[] = []

            expressions.forEach(
                ({
                    definiendum,
                    definiens,
                    hyperlink,
                    secondaryDefiniens,
                    secondaryHyperlink,
                }: Expression): void => {
                    texts.push(definiendum)
                    fontIndices.push(0 as Index<Font>)
                    additionalYOffsets.push(0 as Px)
                    hyperlinks.push(undefined)

                    texts.push(definiens)
                    fontIndices.push(1 as Index<Font>)
                    additionalYOffsets.push(BRAVURA_Y_OFFSET)
                    hyperlinks.push(hyperlink)

                    if (!isUndefined(secondaryDefiniens)) {
                        texts.push(secondaryDefiniens)
                        fontIndices.push(1 as Index<Font>)
                        additionalYOffsets.push(BRAVURA_Y_OFFSET)
                        hyperlinks.push(secondaryHyperlink)
                    }
                },
            )

            const pathifiableTexts: PathifiableTexts = {
                texts,
                fonts: deepClone(MEANINGS_FONTS),
                fontIndices,
                additionalYOffsets,
                hyperlinks,
            }

            pathifiableTextsByEdoNotationName[edoNotationName] = pathifiableTexts

            return pathifiableTextsByEdoNotationName
        },
        {} as Record<EdoNotationName, PathifiableTexts>,
    )
}

export { convertExpressionsToPathifiableTexts }
