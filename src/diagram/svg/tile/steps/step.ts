import { HexColor, Hyperlink, Index, Io, Maybe, Px } from "@sagittal/general"
import { Document } from "@xmldom/xmldom"
import { Font } from "../../../../types"
import { justify, textsToSvgGroupElement } from "../../text"
import { setTransform } from "../../transform"
import { Justification, NodeElement } from "../../types"
import { getGroupWidth } from "../../width"

const addStep = async (
    tileWrapperGroupElement: NodeElement<SVGGElement>,
    {
        svgDocument,
        texts,
        fonts,
        fontIndices,
        additionalYOffsets,
        hyperlinks,
        colors,
        xTranslation: baseXTranslation,
        yTranslation,
        justification,
    }: {
        svgDocument: Document
        texts: Io[]
        fonts: Font[]
        fontIndices: Index<Font>[]
        additionalYOffsets?: Px[]
        hyperlinks: Maybe<Hyperlink>[]
        colors: Maybe<HexColor>[]
        xTranslation: Px
        yTranslation: Px
        justification: Justification
    },
): Promise<void> => {
    const stepGroupElement: NodeElement<SVGGElement> = await textsToSvgGroupElement({
        svgDocument,
        texts,
        fonts,
        fontIndices,
        additionalYOffsets,
        hyperlinks,
        colors,
    })

    const groupWidth = getGroupWidth(stepGroupElement)
    const xTranslation: Px = justify(baseXTranslation, groupWidth, justification)

    setTransform(stepGroupElement, {
        xTranslation,
        yTranslation,
    })

    tileWrapperGroupElement.appendChild(stepGroupElement)
}

export { addStep }
