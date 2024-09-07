import * as fs from "fs"
// import { DOMParser, XMLSerializer } from "xmldom"
import { computeInputSentenceUnicode } from "staff-code"
import { Filename, Io, Sentence, Index, textToSvg, Unicode } from "@sagittal/general"
import { Edo, Flavor } from "@sagittal/system"

const BRAVURA_TEXT_SC = "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextSC.otf" as Filename

const FORMATTED_FLAVOR_NAMES: Record<Flavor, Io> = {
    [Flavor.EVO]: "Evo",
    [Flavor.EVO_SZ]: "Evo-SZ",
    [Flavor.REVO]: "Revo",
}

const EVO_FLAVOR_INDEX: Index<Flavor> = 0 as Index<Flavor>
const EVO_SZ_FLAVOR_INDEX: Index<Flavor> = 1 as Index<Flavor>
const REVO_FLAVOR_INDEX: Index<Flavor> = 2 as Index<Flavor>

const asyncGenerateDiagram = async (inputSentence: Io & Sentence, title: Io, filename: Filename): Promise<void> => {
    const unicodeSentence: Unicode & Sentence = computeInputSentenceUnicode(inputSentence)

    const svgString: string = await textToSvg(unicodeSentence, { font: BRAVURA_TEXT_SC })

    // const parser = new DOMParser();
    // const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
    // const svg = svgDoc.getElementsByTagName("svg")[0]
    // if (isUndefined(svg)) return
    // svg.setAttribute("height", `${(parseInt(svg.getAttribute("height") || "0") * 2)}`)
    // svg.setAttribute("width", `${(parseInt(svg.getAttribute("width") || "0") * 2)}`)
    // const g = svgDoc.getElementsByTagName("g")[0]
    // g?.setAttribute("transform", "translate(50 0)")

    // const newText = svgDoc.createElement('text');
    // newText.setAttribute('x', '10');
    // newText.setAttribute('y', '90');
    // newText.setAttribute('font-family', 'Sanomat-Semibold'); // Set font family
    // newText.setAttribute('font-size', '32'); // Set font size
    // newText.setAttribute('fill', 'black'); // Set text color

    // const textNode = svgDoc.createTextNode(title);
    // newText.appendChild(textNode);
    // svgDoc.documentElement.appendChild(newText);

    // const serializer = new XMLSerializer()
    // const modifiedSvgString = serializer.serializeToString(svgDoc)

    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync(`dist/${filename}`, svgString)
}

const generateDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    { flavorIndex, formattedFlavorName }: { flavorIndex: Index<Flavor>, formattedFlavorName: Io }
): Promise<void> =>
    asyncGenerateDiagram(
        inputSentences[flavorIndex],
        `${formattedFlavorName} Sagittal notation for ${edo}-EDO`,
        `${edo}-EDO_${formattedFlavorName}.svg` as Filename
    ).then()

const generateOneOffDiagram = (
    inputSentence: (Io & Sentence),
    edo: Edo,
    { flavor }: { flavor: Flavor },
): Promise<void> =>
    asyncGenerateDiagram(
        inputSentence,
        `${FORMATTED_FLAVOR_NAMES[flavor]} Sagittal notation for ${edo}-EDO`,
        `one-off.svg` as Filename
    ).then()

const generateGeneralDiagram = (inputSentences: (Io & Sentence)[], edo: Edo): Promise<void> =>
    generateDiagram(inputSentences, edo, { formattedFlavorName: "", flavorIndex: EVO_FLAVOR_INDEX })

const generateEvoDiagram = (inputSentences: (Io & Sentence)[], edo: Edo): Promise<void> =>
    generateDiagram(inputSentences, edo, { formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.EVO], flavorIndex: EVO_FLAVOR_INDEX })

const generateEvoSZDiagram = (inputSentences: (Io & Sentence)[], edo: Edo): Promise<void> =>
    generateDiagram(inputSentences, edo, { formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.EVO_SZ], flavorIndex: EVO_SZ_FLAVOR_INDEX })

const generateRevoDiagram = (inputSentences: (Io & Sentence)[], edo: Edo): Promise<void> =>
    generateDiagram(inputSentences, edo, { formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.REVO], flavorIndex: REVO_FLAVOR_INDEX })

export {
    generateGeneralDiagram,
    generateEvoDiagram,
    generateEvoSZDiagram,
    generateRevoDiagram,
    generateOneOffDiagram,
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    REVO_FLAVOR_INDEX,
}
