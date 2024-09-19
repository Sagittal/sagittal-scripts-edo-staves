import { DOMParser, XMLSerializer, Document } from "@xmldom/xmldom"

const getSvgDocumentFromString = (svgString: string): Document => {
    const parser: DOMParser = new DOMParser()
    return parser.parseFromString(svgString, "image/svg+xml")
}

const getSvgStringFromDocument = (svgDocument: Document): string => {
    const serializer: XMLSerializer = new XMLSerializer()
    return serializer.serializeToString(svgDocument)
}

export { getSvgDocumentFromString, getSvgStringFromDocument }
