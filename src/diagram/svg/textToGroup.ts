import { Filename, Io, Px, textToSvg } from "@sagittal/general"
import { getSvgDocumentFromString } from "./document"
import { NodeElement } from "./types";

const textToSvgGroupElement = async (
    text: Io,
    { fontFile, fontSize }: { fontFile: Filename; fontSize: Px },
): Promise<NodeElement<SVGGElement>> => {
    const svgString: string = await textToSvg(text, {
        font: fontFile,
        fontSize,
    })
    const groupElement: NodeElement<SVGGElement> =
        getSvgDocumentFromString(svgString).getElementsByTagName("g")[0] as NodeElement<SVGGElement>

    return groupElement
}

export { textToSvgGroupElement }
