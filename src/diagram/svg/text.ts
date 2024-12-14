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
    Multiplier,
    Hyperlink,
    isUndefined,
} from "@sagittal/general"
import { Element, Document } from "@xmldom/xmldom"
import { Font } from "../../types"
import { wrapInAnchor } from "./anchor"
import { SVG_NS } from "./constants"
import { getSvgDocumentFromString } from "./document"
import { furtherTransform, setTransform } from "./transform"
import { NodeElement, Justification } from "./types"
import { getGroupWidth } from "./width"

const FONT_SIZE_DIFFERENTIAL_Y_SHIFT_MULTIPLIER: Multiplier = (27 / 20) as Multiplier

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
    const additionalYOffset: Px = (additionalYOffsets && additionalYOffsets[textsIndex]) || (0 as Px)

    // If the font changes in size, then we need to shift its y position slightly to put it back where it was previously
    const fontSizeBasedAutomaticYOffset: Px = ((maxFontSize - font.fontSize) *
        FONT_SIZE_DIFFERENTIAL_Y_SHIFT_MULTIPLIER) as Px

    return (additionalYOffset + fontSizeBasedAutomaticYOffset) as Px
}

const maybeGetProp = <T>(prop: Maybe<T[]>, textsIndex: Index<T>) =>
    isUndefined(prop) ? undefined : prop.length > textsIndex ? prop[textsIndex] : undefined

const textsToSvgGroupElement = async ({
    svgDocument,
    texts,
    fonts,
    fontIndices,
    additionalYOffsets,
    hyperlinks,
    colors,
}: {
    svgDocument: Document
    texts: Io[]
    fonts: Font[]
    fontIndices: Index<Font>[]
    additionalYOffsets?: Px[]
    hyperlinks?: Maybe<Hyperlink>[]
    colors?: Maybe<HexColor>[]
}): Promise<NodeElement<SVGGElement>> => {
    let textsWidth = 0 as Px
    const maxFontSize: Max<Px> = max(...fonts.map(({ fontSize }: Font): Px => fontSize))

    return texts.reduce(
        async (
            textsGroupElementPromise: Promise<NodeElement<SVGGElement>>,
            text: Io,
            textsIndex: number,
        ): Promise<NodeElement<SVGGElement>> => {
            const fontIndex: Index<Font> = fontIndices[textsIndex]
            const hyperlink: Maybe<Hyperlink> = maybeGetProp(hyperlinks, textsIndex as Index<Hyperlink>)
            const font: Font = fonts[fontIndex]
            const color: Maybe<HexColor> = maybeGetProp(colors, textsIndex as Index<HexColor>)

            const textsGroupElement: NodeElement<SVGGElement> = await textsGroupElementPromise
            const textGroupElement: NodeElement<SVGGElement> = await textToSvgGroupElement(text, font)
            if (!isUndefined(color)) textGroupElement.setAttribute("fill", color)

            const yTranslation: Px = computeYTranslation({
                additionalYOffsets,
                textsIndex: textsIndex as Index,
                maxFontSize,
                font,
            })
            furtherTransform(textGroupElement, {
                xTranslation: textsWidth,
                yTranslation,
            })

            const textWidth: Px = getGroupWidth(textGroupElement, {
                includeLefthandWhitespace: true,
            })
            textsWidth = (textsWidth + textWidth) as Px

            if (isUndefined(hyperlink)) {
                textsGroupElement.appendChild(textGroupElement)
            } else {
                const anchorElement = wrapInAnchor(textGroupElement, hyperlink, { svgDocument })
                textsGroupElement.appendChild(anchorElement)
            }

            return textsGroupElement
        },
        Promise.resolve(svgDocument.createElementNS(SVG_NS, "g")) as Promise<NodeElement<SVGGElement>>,
    )
}

const textToSvgDocument = async (text: Io, { fontFile, fontSize }: Font): Promise<Document> => {
    const svgString: string = await textToSvgPathString(text, {
        font: fontFile,
        fontSize,
    })

    return getSvgDocumentFromString(svgString)
}

const textToSvgGroupElement = async (text: Io, font: Font): Promise<NodeElement<SVGGElement>> => {
    const svgDocument: Document = await textToSvgDocument(text, font)

    return svgDocument.getElementsByTagName("g")[0] as NodeElement<SVGGElement>
}

const justify = (x: Px, width: Px, justification: Justification): Px =>
    justification === Justification.RIGHT
        ? ((x - width) as Px)
        : justification === Justification.CENTER
          ? ((x - width / 2) as Px)
          : x

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
        hyperlink,
        svgDocument,
    }: {
        fontFile: Filename
        fontSize: Px
        xOffset?: Px
        yOffset?: Px
        color?: HexColor
        justification?: Justification
        hyperlink?: Hyperlink
        svgDocument?: Document
    },
): Promise<NodeElement<SVGGElement>> => {
    const textGroupElement: NodeElement<SVGGElement> = await textToSvgGroupElement(text, {
        fontFile,
        fontSize,
    })
    textGroupElement.setAttribute("fill", color)

    const groupWidth: Px = getGroupWidth(textGroupElement)
    const xTranslation: Px = justify(xOffset, groupWidth, justification)
    setTransform(textGroupElement, {
        xTranslation,
        yTranslation: yOffset,
    })

    if (isUndefined(hyperlink)) {
        parentElement.appendChild(textGroupElement)

        return textGroupElement
    } else {
        if (isUndefined(svgDocument)) throw new Error("svgDocument is required when hyperlink is provided")

        const anchorElement: NodeElement<SVGAElement> = wrapInAnchor(textGroupElement, hyperlink, {
            svgDocument,
        })

        parentElement.appendChild(anchorElement)

        return anchorElement
    }
}

export { addText, textToSvgGroupElement, textToSvgDocument, textsToSvgGroupElement, justify }
