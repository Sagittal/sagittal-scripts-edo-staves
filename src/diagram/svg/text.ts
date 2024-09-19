import { Element, Node } from "@xmldom/xmldom"
import { Filename, HexColor, Io, Px } from "@sagittal/general"
import { Justification } from "./tile/types"
import { getGroupWidth } from "./tile/width"
import { textToSvgGroupElement } from "./textToGroup"

const addText = async (
    parentElement: Element,
    text: Io,
    {
        fontFile,
        fontSize,
        xOffset = 0 as Px,
        yOffset = 0 as Px,
        color = "#000000" as HexColor,
        justification = Justification.LEFT,
    }: {
        fontFile: Filename
        fontSize: Px
        xOffset?: Px
        yOffset?: Px
        color?: HexColor
        justification?: Justification
    },
): Promise<Node & SVGGElement> => {
    const textGroupElement: Node & SVGGElement = await textToSvgGroupElement(
        text,
        {
            fontFile,
            fontSize,
        },
    )
    textGroupElement.setAttribute("fill", color)

    if (justification !== Justification.LEFT) {
        const groupWidth = getGroupWidth(textGroupElement)
        if (justification === Justification.CENTER) {
            textGroupElement.setAttribute(
                "transform",
                `translate(${xOffset - groupWidth / 2}, ${yOffset})`,
            )
        } else {
            textGroupElement.setAttribute(
                "transform",
                `translate(${xOffset - groupWidth}, ${yOffset})`,
            )
        }
    } else {
        textGroupElement.setAttribute(
            "transform",
            `translate(${xOffset}, ${yOffset})`,
        )
    }

    parentElement.appendChild(textGroupElement)

    return textGroupElement
}

export { addText }
