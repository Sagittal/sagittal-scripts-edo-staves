import { Hyperlink, Index, Io, Maybe, Px } from "@sagittal/general"
import { Document } from "@xmldom/xmldom"
import { OPEN_SANS_REGULAR_FONT_FILE, SANOMAT_FONT_FILE, XEN_WIKI_BASE_URL } from "../../constants"
import { Font, PathifiableTexts } from "../../types"
import { append } from "./append"
import {
    TITLE_FONT_SIZE,
    LEFT_AND_RIGHT_MARGIN,
    SUBTITLE_FONT_SIZE,
    TITLE_Y_OFFSET,
    SUBTITLE_FURTHER_Y_OFFSET,
} from "./constants"
import { addText, textsToSvgGroupElement } from "./text"
import { setTransform } from "./transform"
import { NodeElement } from "./types"
import { getGroupWidth } from "./width"

const computeTitleHyperlinks = (texts: Io[], edoString: string, flavorAnchor: Io): Maybe<Hyperlink>[] => {
    const titleHyperlinks = [] as Maybe<Hyperlink>[]

    if (texts.length > 2)
        titleHyperlinks.push(`${XEN_WIKI_BASE_URL}Sagittal_notation#${flavorAnchor}` as Hyperlink)
    if (texts.length > 3) titleHyperlinks.unshift(undefined)

    titleHyperlinks.unshift(`${XEN_WIKI_BASE_URL}${edoString}edo` as Hyperlink)
    titleHyperlinks.push(`${XEN_WIKI_BASE_URL}Sagittal_notation` as Hyperlink)

    return titleHyperlinks
}

const addTitleAndGetWidth = async (svgDocument: Document, title: Io): Promise<Px> => {
    const chunks = title.match(/\S+(?=\s)|\s\S+|\S+$/g)
    const sagittalNotation = chunks!.slice(-2).join("")
    const texts = [...chunks!.slice(0, -2), sagittalNotation]
    const edo = chunks![0].match(/(\d+)/)![0]
    let flavorAnchor = chunks![1].trim()
    if (flavorAnchor === "Alternative") flavorAnchor = "Evo"

    const pathifiableTexts: PathifiableTexts = {
        fonts: [
            {
                fontFile: SANOMAT_FONT_FILE,
                fontSize: TITLE_FONT_SIZE,
            },
        ],
        texts,
        fontIndices: texts.map((text: Io): Index<Font> => 0 as Index<Font>),
        hyperlinks: computeTitleHyperlinks(texts, edo, flavorAnchor),
    }

    const titleGroupElement: NodeElement<SVGGElement> = await textsToSvgGroupElement({
        svgDocument,
        ...pathifiableTexts,
    })

    setTransform(titleGroupElement, {
        xTranslation: LEFT_AND_RIGHT_MARGIN,
        yTranslation: TITLE_Y_OFFSET,
    })

    append(svgDocument, titleGroupElement)

    return getGroupWidth(titleGroupElement)
}

const addSubtitleAndGetWidth = async (svgDocument: Document, subtitle: Io): Promise<Px> => {
    const subtitleGroupElement: NodeElement<SVGGElement> = await addText(
        svgDocument.documentElement!,
        subtitle,
        {
            fontFile: OPEN_SANS_REGULAR_FONT_FILE,
            fontSize: SUBTITLE_FONT_SIZE,
            xOffset: LEFT_AND_RIGHT_MARGIN,
            yOffset: (TITLE_Y_OFFSET + TITLE_FONT_SIZE + SUBTITLE_FURTHER_Y_OFFSET) as Px,
        },
    )

    return getGroupWidth(subtitleGroupElement)
}

export { addTitleAndGetWidth, addSubtitleAndGetWidth }
