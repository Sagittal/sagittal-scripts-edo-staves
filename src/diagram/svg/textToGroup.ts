import { Node } from "@xmldom/xmldom"
import { Filename, Io, Px, textToSvg } from "@sagittal/general"
import { getSvgDocumentFromString } from "./document"

const textToSvgGroupElement = async (
    text: Io,
    { fontFile, fontSize }: { fontFile: Filename; fontSize: Px },
): Promise<Node & SVGGElement> => {
    const svgString: string = await textToSvg(text, {
        font: fontFile,
        fontSize,
    })
    const groupElement: Node & SVGGElement =
        getSvgDocumentFromString(svgString).getElementsByTagName("g")[0] as Node & SVGGElement

    return groupElement
}

export { textToSvgGroupElement }
