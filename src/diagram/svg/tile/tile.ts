import { Document } from "@xmldom/xmldom"
import { Px } from "@sagittal/general"
import { Edo } from "@sagittal/system"
import { addTileSquare } from "./square"
import { addEdo } from "./edo"
import { addSagittalsOrSubset } from "./sagittals"
import { addSteps } from "./steps"
import { maybeAddCornerTriangle } from "./cornerTriangle"
import { NodeElement } from "../types"

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
    const tileGroupElement: NodeElement<SVGGElement> = addTileSquare({
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
