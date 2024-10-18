import { Document } from "@xmldom/xmldom"
import { Px } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { DiagramType } from "../../../types"
import {
    LEFT_AND_RIGHT_MARGIN,
    SUBTITLE_FONT_SIZE,
    TITLE_FONT_SIZE,
} from "../constants"
import { textsToSvgGroupElement } from "../text"
import { append } from "../append"
import { getGroupWidth } from "../width"
import { NodeElement } from "../types"
import { setTransform } from "../transform"
import { computeMeaningsPathifiableTexts } from "./pathifiableTexts"
import { PathifiableTexts } from "./types"

const addMeaningsAndGetWidth = async (
    svgDocument: Document,
    {
        diagramType,
        edoNotationName,
    }: { diagramType: DiagramType; edoNotationName: EdoNotationName },
): Promise<Px> => {
    const pathifiableTexts: PathifiableTexts = computeMeaningsPathifiableTexts({
        edoNotationName,
        diagramType,
    })

    const meaningsGroupElement: NodeElement<SVGGElement> =
        await textsToSvgGroupElement({
            svgDocument,
            ...pathifiableTexts,
        })

    setTransform(meaningsGroupElement, {
        xTranslation: LEFT_AND_RIGHT_MARGIN,
        yTranslation: (TITLE_FONT_SIZE +
            SUBTITLE_FONT_SIZE +
            SUBTITLE_FONT_SIZE) as Px,
    })

    append(svgDocument, meaningsGroupElement)

    return getGroupWidth(meaningsGroupElement)
}

export { addMeaningsAndGetWidth }
