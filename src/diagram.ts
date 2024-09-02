import * as fs from "fs"
import { computeInputSentenceUnicode } from "staff-code"
// import { DOMParser, XMLSerializer } from "xmldom"
import { Filename, Io, Sentence, textToSvg, Unicode } from "@sagittal/general"
import { Edo, Nominal, Flavor } from "@sagittal/system"
import { computeStaffCodeInputSentence } from "./inputSentence"

// TODO: use isUndefined

const font = "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextSC.otf" as Filename

const asyncGenerateDiagram = async ({ edo, flavor, root }: { edo: Edo, flavor: Flavor, root: Nominal }): Promise<void> => {
    const inputSentence: Io & Sentence = computeStaffCodeInputSentence(edo, flavor, { root })
    // console.log(inputSentence)

    const unicodeSentence: Unicode & Sentence = computeInputSentenceUnicode(inputSentence)

    const svgString: string = await textToSvg(unicodeSentence, { font })

    // const parser = new DOMParser();
    // const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
    // const svg = svgDoc.getElementsByTagName("svg")[0]
    // if (!svg) return
    // svg.setAttribute("height", `${(parseInt(svg.getAttribute("height") || "0") * 2)}`)
    // svg.setAttribute("width", `${(parseInt(svg.getAttribute("width") || "0") * 2)}`)
    // const g = svgDoc.getElementsByTagName("g")[0]
    // g?.setAttribute("transform", "translate(50 0)")
    // const serializer = new XMLSerializer()
    // const modifiedSvgString = serializer.serializeToString(svgDoc)

    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync(`dist/${edo}-EDO-${flavor}.svg`, svgString)
}

export {
    asyncGenerateDiagram,
}
