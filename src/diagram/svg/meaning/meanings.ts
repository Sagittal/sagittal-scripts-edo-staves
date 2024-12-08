import { Px } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { Document } from "@xmldom/xmldom"
import { DiagramType, PathifiableTexts } from "../../../types"
import { append } from "../append"
import {
    LEFT_AND_RIGHT_MARGIN,
    SUBTITLE_FONT_SIZE,
    TITLE_FONT_SIZE,
    EXTRA_MEANINGS_SPACING,
} from "../constants"
import { textsToSvgGroupElement } from "../text"
import { setTransform } from "../transform"
import { NodeElement } from "../types"
import { getGroupWidth } from "../width"
import { computeMeaningsPathifiableTexts } from "./pathifiableTexts"

const addMeaningsAndGetWidth = async (
    svgDocument: Document,
    { diagramType, edoNotationName }: { diagramType: DiagramType; edoNotationName: EdoNotationName },
): Promise<Px> => {
    const pathifiableTexts: PathifiableTexts = computeMeaningsPathifiableTexts({
        edoNotationName,
        diagramType,
    })

    const meaningsGroupElement: NodeElement<SVGGElement> = await textsToSvgGroupElement({
        svgDocument,
        ...pathifiableTexts,
    })

    setTransform(meaningsGroupElement, {
        xTranslation: LEFT_AND_RIGHT_MARGIN,
        yTranslation: (TITLE_FONT_SIZE +
            SUBTITLE_FONT_SIZE +
            SUBTITLE_FONT_SIZE +
            EXTRA_MEANINGS_SPACING) as Px,
    })

    append(svgDocument, meaningsGroupElement)

    return getGroupWidth(meaningsGroupElement)
}

export { addMeaningsAndGetWidth }
