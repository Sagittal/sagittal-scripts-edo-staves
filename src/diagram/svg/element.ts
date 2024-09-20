import { Document } from "@xmldom/xmldom"
import { Filename, Io, Px, textToSvgPathString } from "@sagittal/general"
import { getSvgDocumentFromString } from "./document"
import { NodeElement } from "./types"

const textToSvgDocument = async (
    text: Io,
    { fontFile, fontSize }: { fontFile: Filename; fontSize: Px },
): Promise<Document> => {
    const svgString: string = await textToSvgPathString(text, {
        font: fontFile,
        fontSize,
    })

    return getSvgDocumentFromString(svgString)
}

const textToSvgGroupElement = async (
    text: Io,
    { fontFile, fontSize }: { fontFile: Filename; fontSize: Px },
): Promise<NodeElement<SVGGElement>> => {
    const svgDocument: Document = await textToSvgDocument(text, {
        fontFile,
        fontSize,
    })

    return svgDocument.getElementsByTagName("g")[0] as NodeElement<SVGGElement>
}

export { textToSvgGroupElement, textToSvgDocument }
