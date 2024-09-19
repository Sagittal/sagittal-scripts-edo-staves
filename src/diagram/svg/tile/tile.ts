import { Document, Element } from "@xmldom/xmldom"
import { Px } from "@sagittal/general"
import { Edo } from "@sagittal/system"
import { addTileSquare } from "./square"
import { addEdo } from "./edo"
import { addSagittalsOrSubset } from "./sagittals"
import { addSteps } from "./steps"
import { maybeAddCornerTriangle } from "./cornerTriangle"

// TODO: actually generateEdoStaves should be even smarter, and even if you ask for e.g. Revo when Revo === Evo,
// it should warn you of this on the console, then generate a diagram with a general name?
// so always check all flavors, even when you give a flavor?
// here's the plan: https://docs.google.com/spreadsheets/d/1qWXZb4KO2Y12HYF7Ln_XH1-dvDR2o5Ldwh4K_7dgM28/edit?gid=0#gid=0

// TODO: perhaps a parameterized type that just takes some SVG element like a polygon or rect or whatever 
// and adds both Node and Element to it, for consistency so not some are Node & and others are Element &
// it would be called... NodeElement<T> maybe?

// TODO: need to account for e.g. 5-EDO where the title is longer than the stave
// and needs to push the tile out to the right

// TODO: perhaps I should add another type, EdoName, that is a branded string,
// which could includes the "b" so I don't have to pass around this "useSecondBestFifth" so much

const addTile = async (
    svgDocument: Document,
    {
        edo,
        useSecondBestFifth,
        diagramWidth,
    }: { edo: Edo; useSecondBestFifth: boolean; diagramWidth: Px },
): Promise<void> => {
    const tileGroupElement: Element & SVGGElement = addTileSquare({
        svgDocument,
        edo,
        useSecondBestFifth,
        diagramWidth,
    })

    await addEdo(tileGroupElement, { edo, useSecondBestFifth })

    await addSagittalsOrSubset(tileGroupElement, {
        edo,
        useSecondBestFifth,
    })

    maybeAddCornerTriangle(tileGroupElement, {
        svgDocument,
        edo,
        useSecondBestFifth,
    })

    await addSteps(tileGroupElement, { edo, useSecondBestFifth })
}

export { addTile }
