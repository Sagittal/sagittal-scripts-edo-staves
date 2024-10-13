import { Document } from "@xmldom/xmldom"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    NonSubsetEdoNotationDefinition,
    Sagittal,
    Sagitype,
} from "@sagittal/system"
import { Font, NodeElement } from "../types"
import { DiagramType } from "../../../types"
import { Count, Index, Io, max, Px, Sentence } from "@sagittal/general"
import { TILE_ROW_FOR_EDO } from "./constants"
import { TILE_SIZE } from "../constants"
import { computeTileRowCountScaleFactor } from "./rowCount"
import { textsToSvgGroupElement } from "../text"
import { computeTextsAndFonts } from "./textsAndFonts"
import { getGroupWidth } from "../width"
import { computeSagittalCountsByRow } from "./needThisOut"
import { computeScaleFactorForSizingSagittalsDownAsMuchAsTheSizeOfThatAtTheMaxSagittalPerRowCountForTheNextRowCountButBeforeAddingTheNextRow } from "./nextRowCountScale"
import { computeExistingTransform } from "../shift"

const computeSagitypesByRow = (
    sagitypes: Sagitype[],
    sagittalCountsByRow: Count<Sagittal>[],
): Sagitype[][] => {
    return sagittalCountsByRow.reduce(
        (
            sagitypesByRow: Sagitype[][],
            sagittalRowCount: Count<Sagittal>,
            sagittalRowIndex: number,
        ): Sagitype[][] => {
            const startingSagitypeIndex: Index<Sagitype> = sagittalCountsByRow
                .slice(0, sagittalRowIndex)
                .reduce(
                    (sum: number, current: number): number => sum + current,
                    0,
                ) as Index<Sagitype>
            const endingSagitypeIndex: Index<Sagitype> =
                (startingSagitypeIndex + sagittalRowCount) as Index<Sagitype>
            const sagitypesForRow: Sagitype[] = sagitypes.slice(
                startingSagitypeIndex,
                endingSagitypeIndex,
            )
            sagitypesByRow.push(sagitypesForRow)
            return sagitypesByRow
        },
        [] as Sagitype[][],
    )
}

const addSagittals = async (
    tileGroupElement: NodeElement<SVGGElement>,
    {
        svgDocument,
        edoNotationName,
        diagramType,
        tileRowCount,
    }: {
        svgDocument: Document
        edoNotationName: EdoNotationName
        diagramType: DiagramType
        tileRowCount: Count
    },
): Promise<void> => {
    const sagitypes: Sagitype[] = (
        EDO_NOTATION_DEFINITIONS[
            edoNotationName
        ] as NonSubsetEdoNotationDefinition
    ).sagitypes

    const sagittalCount: Count<Sagittal> = sagitypes.length as Count<Sagittal>
    if (sagittalCount === 0) return

    const sagittalRowCount: Count = (tileRowCount - TILE_ROW_FOR_EDO) as Count

    const sagittalCountsByRow: Count<Sagittal>[] = computeSagittalCountsByRow({
        sagittalRowCount,
        sagittalCount,
    })
    const sagitypesByRow: Sagitype[][] = computeSagitypesByRow(
        sagitypes,
        sagittalCountsByRow,
    )

    const tileRowCountScaleFactor: number =
        computeTileRowCountScaleFactor(tileRowCount)

    const things = []
    const widths = []

    await Promise.all(
        sagitypesByRow.map(
            async (
                sagitypesForRow: Sagitype[],
                sagittalRowIndex: number,
            ): Promise<void> => {
                const {
                    texts,
                    fonts,
                    fontIndices,
                }: {
                    texts: (Io & Sentence)[]
                    fonts: Font[]
                    fontIndices: Index<Font>[]
                } = computeTextsAndFonts({
                    edoNotationName,
                    diagramType,
                    sagitypesForRow,
                    tileRowCountScaleFactor,
                })

                const specialScaleFactor =
                    computeScaleFactorForSizingSagittalsDownAsMuchAsTheSizeOfThatAtTheMaxSagittalPerRowCountForTheNextRowCountButBeforeAddingTheNextRow(
                        sagittalCount,
                    )

                const additionalYOffsets = fonts.map((font) => {
                    const oldFontSize = font.fontSize
                    const newFontSize = oldFontSize / specialScaleFactor
                    font.fontSize = newFontSize
                    return oldFontSize - newFontSize
                })
                //  7 for 494 three row where yTranslation is 11.25 ; 11.25 /  7 = 1.607
                // 10 for 140   two row where yTranslation is 15    ; 15    / 10 = 1.5
                // 16 for  64   one row where yTranslation is 22.5  ; 22.5  / 16 = 1.40625
                const manualY = 8
                // console.log(fonts)
                const sagittalRowGroupElement: NodeElement<SVGGElement> =
                    await textsToSvgGroupElement(
                        svgDocument,
                        texts,
                        fonts,
                        fontIndices,
                        // [-6, -6] // for 64-EDO
                        // [2, 2] // for 140-EDO
                        // [7, 7] // for 494-EDO
                        additionalYOffsets,
                    )

                const sagittalsWidth: Px = getGroupWidth(
                    sagittalRowGroupElement,
                )
                const xTranslation = TILE_SIZE / 2 - sagittalsWidth / 2

                const yTranslation =
                    // -(TILE_SIZE / 2) +
                    (sagittalRowIndex - 0.25) /* 0.166666 if over 72-EDO? */ *
                    (TILE_SIZE / 2 / tileRowCountScaleFactor)

                // console.log("")
                // console.log("manualY", manualY)
                // console.log("TILE_SIZE / 2", TILE_SIZE / 2)
                // console.log("sagittalRowIndex + 1", sagittalRowIndex + 1)
                // console.log(
                //     "(TILE_SIZE / 2 / tileRowCountScaleFactor)",
                //     TILE_SIZE / 2 / tileRowCountScaleFactor,
                // )
                // console.log("yTranslation", yTranslation)
                // console.log("manualY + yTranslation", manualY + yTranslation)

                sagittalRowGroupElement.setAttribute(
                    // TODO: add a helper for translating x or y or both so I don't have to remember this every time
                    "transform",
                    `translate(${xTranslation} ${yTranslation})`,
                )

                things.push(sagittalRowGroupElement)

                widths.push(sagittalsWidth)
            },
        ),
    )

    const maxWidth = max(...widths)
    // console.log(
    //     "edoNotationName",
    //     edoNotationName,
    //     "maxWidth",
    //     maxWidth,
    //     "widths",
    //     widths,
    // )
    if (maxWidth > TILE_SIZE - 4) {
        console.log(
            "\n\nbad thing for edo",
            edoNotationName,
            "with max wdith",
            maxWidth,
        )
        things.forEach((thing) => {
            // const { existingX, existingY } = computeExistingTransform(thing) // TODO: these should be existingXTransform and smae for y yeah?
            // const transform = thing.getAttribute("transform")
            const { existingX, existingY } = computeExistingTransform(thing)

            const scale = (TILE_SIZE - 4) / maxWidth

            const adjustX = (1 - scale) * 25 //52.3 * scale * scale - 100.4 * scale + 48.2
            const adjustY = (1 - scale) * 25 //68.5 * scale * scale - 130.7 * scale + 63.4
            // console.log("adjustX", adjustX)
            // console.log("adjustY", adjustY)

            // with scale of 0.9927360774818402, 205 wants x + 0 and y + 0
            // with scale of 0.9865255052935514,  71 wants x + 0 and y + 0
            // with scale of 0.9834492684096906, 270 wants x + 0 and y + 0
            // with scale of 0.9781619654231118,  68 wants x + 1 and y + 3
            // with scale of 0.9771210676835080, 311 wants x + 1 and y + 3 (guessing)
            // with scale of 0.9326660600545951,  75 wants x + 1 and y + 3
            // with scale of 0.8843830888697153, 141 wants x + 3 and y + 5
            // with scale of 0.8324873096446701, 581 wants x + 4 and y + 6
            const newX = existingX + adjustX
            const newY = existingY + adjustY

            // console.log("transform before", thing.getAttribute("transform"))
            // console.log("scale", scale)
            thing.setAttribute(
                "transform",
                `translate(${newX} ${newY}) scale(${scale})`,
            )
            // console.log("transform after", thing.getAttribute("transform"))
        })
    }

    things.forEach((thing) => {
        // console.log(thing.getAttribute("transform"))
        tileGroupElement.appendChild(thing)
    })
}

export { addSagittals }
