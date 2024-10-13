import { Element, Document } from "@xmldom/xmldom"
import {
    Filename,
    HexColor,
    Io,
    Px,
    textToSvgPathString,
    Index,
    Max,
    max,
    Maybe,
} from "@sagittal/general"
import { NodeElement, Justification, Font } from "./types"
import { getGroupWidth } from "./width"
import { getSvgDocumentFromString } from "./document"
import { SVG_NS } from "./constants"
import { shiftGroupElement } from "./shift"

const FONT_SIZE_DIFFERENTIAL_Y_SHIFT_FACTOR: number = 27 / 20 // TODO: wtf is this

const computeYShift = ({
    additionalYOffsets,
    textsIndex,
    maxFontSize,
    font,
}: {
    additionalYOffsets: Maybe<Px[]>
    textsIndex: Index
    maxFontSize: Max<Px>
    font: Font
}): Px => {
    const additionalYOffset: Px =
        (additionalYOffsets && additionalYOffsets[textsIndex]) || (0 as Px)
    const fontSizeBasedAutomaticYOffset: Px = ((maxFontSize - font.fontSize) *
        FONT_SIZE_DIFFERENTIAL_Y_SHIFT_FACTOR) as Px
    // console.log("fontSizeBasedAutomaticYOffset: ", fontSizeBasedAutomaticYOffset)
    return (additionalYOffset + fontSizeBasedAutomaticYOffset) as Px
}

const textsToSvgGroupElement = async ( // TODO: this should take named args
    svgDocument: Document,
    texts: Io[],
    fonts: Font[],
    fontIndices: Index<Font>[],
    additionalYOffsets?: Px[],
): Promise<NodeElement<SVGGElement>> => {
    let textsWidth = 0 as Px
    const maxFontSize: Max<Px> = max(
        ...fonts.map(({ fontSize }: Font): Px => fontSize),
    )

    return texts.reduce(
        async (
            textsGroupElementPromise: Promise<NodeElement<SVGGElement>>,
            text: Io,
            textsIndex: number,
        ): Promise<NodeElement<SVGGElement>> => {
            const fontIndex: Index<Font> = fontIndices[textsIndex]
            const font: Font = fonts[fontIndex]
            const textsGroupElement: NodeElement<SVGGElement> =
                await textsGroupElementPromise
            const textGroupElement: NodeElement<SVGGElement> =
                await textToSvgGroupElement(text, font)

            const yShift = computeYShift({
                additionalYOffsets,
                textsIndex: textsIndex as Index,
                maxFontSize,
                font,
            })
            // console.log("text", text)
            // console.log("yShift", yShift)
            shiftGroupElement(
                textGroupElement,
                textsWidth as Px,
                yShift,
            )
            const textWidth: Px = getGroupWidth(textGroupElement, {
                includeLefthandWhitespace: true,
            })
            textsWidth = (textsWidth + textWidth) as Px

            textsGroupElement.appendChild(textGroupElement)

            return textsGroupElement
        },
        Promise.resolve(svgDocument.createElementNS(SVG_NS, "g")) as Promise<
            NodeElement<SVGGElement>
        >,
    )
}

const textToSvgDocument = async (
    text: Io,
    { fontFile, fontSize }: Font,
): Promise<Document> => {
    const svgString: string = await textToSvgPathString(text, {
        font: fontFile,
        fontSize,
    })

    return getSvgDocumentFromString(svgString)
}

const textToSvgGroupElement = async (
    text: Io,
    font: Font,
): Promise<NodeElement<SVGGElement>> => {
    const svgDocument: Document = await textToSvgDocument(text, font)

    return svgDocument.getElementsByTagName("g")[0] as NodeElement<SVGGElement>
}

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
): Promise<NodeElement<SVGGElement>> => {
    const textGroupElement: NodeElement<SVGGElement> =
        await textToSvgGroupElement(text, {
            fontFile,
            fontSize,
        })
    textGroupElement.setAttribute("fill", color)

    if (justification !== Justification.LEFT) {
        const groupWidth = getGroupWidth(textGroupElement)
        if (justification === Justification.CENTER) {
            textGroupElement.setAttribute(
                "transform",
                `translate(${xOffset - groupWidth / 2} ${yOffset})`,
            )
        } else {
            textGroupElement.setAttribute(
                "transform",
                `translate(${xOffset - groupWidth} ${yOffset})`,
            )
        }
    } else {
        textGroupElement.setAttribute(
            "transform",
            `translate(${xOffset} ${yOffset})`,
        )
    }

    parentElement.appendChild(textGroupElement)

    return textGroupElement
}

export {
    addText,
    textToSvgGroupElement,
    textToSvgDocument,
    textsToSvgGroupElement,
}
