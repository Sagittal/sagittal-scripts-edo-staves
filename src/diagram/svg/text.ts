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
import { NodeElement, Justification, Font, Scaler } from "./types"
import { getGroupWidth } from "./width"
import { getSvgDocumentFromString } from "./document"
import { SVG_NS } from "./constants"
import { furtherTransform, setTransform } from "./transform"

const FONT_SIZE_DIFFERENTIAL_Y_SHIFT_SCALER: Scaler = (27 / 20) as Scaler

const computeYTranslation = ({
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

    // If the font changes in size, then we need to shift its y position slightly to put it back where it was previously
    const fontSizeBasedAutomaticYOffset: Px = ((maxFontSize - font.fontSize) *
        FONT_SIZE_DIFFERENTIAL_Y_SHIFT_SCALER) as Px

    return (additionalYOffset + fontSizeBasedAutomaticYOffset) as Px
}

const textsToSvgGroupElement = async ({
    svgDocument,
    texts,
    fonts,
    fontIndices,
    additionalYOffsets,
}: {
    svgDocument: Document
    texts: Io[]
    fonts: Font[]
    fontIndices: Index<Font>[]
    additionalYOffsets?: Px[]
}): Promise<NodeElement<SVGGElement>> => {
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

            const yTranslation: Px = computeYTranslation({
                additionalYOffsets,
                textsIndex: textsIndex as Index,
                maxFontSize,
                font,
            })
            furtherTransform(textGroupElement, {
                xTranslation: textsWidth as Px,
                yTranslation,
            })

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

    const groupWidth: Px = getGroupWidth(textGroupElement)

    const xTranslation: Px =
        justification === Justification.RIGHT
            ? ((xOffset - groupWidth) as Px)
            : justification === Justification.CENTER
            ? ((xOffset - groupWidth / 2) as Px)
            : xOffset

    setTransform(textGroupElement, {
        xTranslation,
        yTranslation: yOffset,
    })

    parentElement.appendChild(textGroupElement)

    return textGroupElement
}

export {
    addText,
    textToSvgGroupElement,
    textToSvgDocument,
    textsToSvgGroupElement,
}
