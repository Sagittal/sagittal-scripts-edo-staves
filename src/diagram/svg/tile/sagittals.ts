// import { Document } from "@xmldom/xmldom"
// import { Count, Index, Io, Max, max, Px, Sentence } from "@sagittal/general"
// import {
//     EDO_NOTATION_DEFINITIONS,
//     EdoNotationName,
//     NonSubsetEdoNotationDefinition,
//     Sagittal,
//     Sagitype,
// } from "@sagittal/system"
// import { TILE_SIZE } from "../constants"
// import { getGroupWidth } from "../width"
// import { textsToSvgGroupElement } from "../text"
// import { Font, NodeElement } from "../types"
// import { DiagramType } from "../../../types"
// import { computeTextsAndFonts } from "./textsAndFonts"
// import { TILE_ROW_FOR_EDO } from "./constants"
// import {
//     computeMaxSagittalsForTileRowCount,
//     computeTileRowCountScaleFactor,
// } from "./rowCount"

// const computeSagittalCountsByRow = ({
//     sagittalRowCount,
//     sagittalCount,
// }: {
//     sagittalRowCount: Count
//     sagittalCount: Count<Sagittal>
// }): Count<Sagittal>[] => {
//     const sagittalCountByRow: Count<Sagittal>[] = []
//     let remainingSagittalCount: Count<Sagittal> = sagittalCount

//     const sagittalsPerRow: Count<Sagittal> = Math.ceil(
//         sagittalCount / sagittalRowCount,
//     ) as Count<Sagittal>

//     while (remainingSagittalCount > 0) {
//         if (remainingSagittalCount > sagittalsPerRow) {
//             sagittalCountByRow.push(sagittalsPerRow)
//             remainingSagittalCount = (remainingSagittalCount -
//                 sagittalsPerRow) as Count<Sagittal>
//         } else {
//             sagittalCountByRow.push(remainingSagittalCount)
//             remainingSagittalCount = 0 as Count<Sagittal>
//         }
//     }

//     return sagittalCountByRow
// }

// const computeSagitypesByRow = (
//     sagitypes: Sagitype[],
//     sagittalCountsByRow: Count<Sagittal>[],
// ): Sagitype[][] => {
//     return sagittalCountsByRow.reduce(
//         (
//             sagitypesByRow: Sagitype[][],
//             sagittalRowCount: Count<Sagittal>,
//             sagittalRowIndex: number,
//         ): Sagitype[][] => {
//             const startingSagitypeIndex: Index<Sagitype> = sagittalCountsByRow
//                 .slice(0, sagittalRowIndex)
//                 .reduce(
//                     (sum: number, current: number): number => sum + current,
//                     0,
//                 ) as Index<Sagitype>
//             const endingSagitypeIndex: Index<Sagitype> =
//                 (startingSagitypeIndex + sagittalRowCount) as Index<Sagitype>
//             const sagitypesForRow: Sagitype[] = sagitypes.slice(
//                 startingSagitypeIndex,
//                 endingSagitypeIndex,
//             )
//             sagitypesByRow.push(sagitypesForRow)
//             return sagitypesByRow
//         },
//         [] as Sagitype[][],
//     )
// }

// const POWER_TO_ACCOUNT_FOR_SPACES_BETWEEN_SAGITTALS = 1 // 2

// // this is how we scale down toward the size of the sagittals for the next row count before actually adding the next row
// const additionalTileRowCountScaleFactor = ({
//     sagittalCountsByRow,
//     sagittalRowCount,
// }: {
//     sagittalCountsByRow: Count<Sagittal>[]
//     sagittalRowCount: Count
// }): number => {
//     const maxSagittalRowCount: Max<Count<Sagittal>> = max(
//         // TODO extract cuz used out there too
//         ...sagittalCountsByRow,
//     )
//     const maxFullSizeSagittalsForSagittalRowCount: Max<Count<Sagittal>> =
//         ((sagittalRowCount + 1) * 2) as Max<Count<Sagittal>>

//     console.log("maxSagittalRowCount", maxSagittalRowCount)
//     console.log(
//         "maxFullSizeSagittalsForSagittalRowCount",
//         maxFullSizeSagittalsForSagittalRowCount,
//     )
//     console.log(
//         "maxSagittalRowCount / maxFullSizeSagittalsForSagittalRowCount",
//         maxSagittalRowCount / maxFullSizeSagittalsForSagittalRowCount,
//     )

//     return maxSagittalRowCount > maxFullSizeSagittalsForSagittalRowCount
//         ? (maxSagittalRowCount / maxFullSizeSagittalsForSagittalRowCount) **
//               POWER_TO_ACCOUNT_FOR_SPACES_BETWEEN_SAGITTALS
//         : 1
// }

// const addSagittals = async (
//     tileGroupElement: NodeElement<SVGGElement>,
//     {
//         svgDocument,
//         edoNotationName,
//         diagramType,
//         tileRowCount,
//     }: {
//         svgDocument: Document
//         edoNotationName: EdoNotationName
//         diagramType: DiagramType
//         tileRowCount: Count
//     },
// ): Promise<void> => {
//     const sagitypes: Sagitype[] = (
//         EDO_NOTATION_DEFINITIONS[
//             edoNotationName
//         ] as NonSubsetEdoNotationDefinition
//     ).sagitypes

//     const sagittalCount: Count<Sagittal> = sagitypes.length as Count<Sagittal>
//     if (sagittalCount === 0) return

//     const sagittalRowCount: Count = (tileRowCount - TILE_ROW_FOR_EDO) as Count

//     const sagittalCountsByRow: Count<Sagittal>[] = computeSagittalCountsByRow({
//         sagittalRowCount,
//         sagittalCount,
//     })
//     const sagitypesByRow: Sagitype[][] = computeSagitypesByRow(
//         sagitypes,
//         sagittalCountsByRow,
//     )
//     console.log("tileRowCount", tileRowCount)
//     console.log(
//         "computeTileRowCountScaleFactor(tileRowCount)",
//         computeTileRowCountScaleFactor(tileRowCount),
//     )
//     const tileRowCountScaleFactor: number =
//         computeTileRowCountScaleFactor(tileRowCount) *
//         additionalTileRowCountScaleFactor({
//             sagittalCountsByRow,
//             sagittalRowCount,
//         })

//     const maxSagittalRowCount: Max<Count<Sagittal>> = max(
//         ...sagittalCountsByRow,
//     )

    // sagitypesByRow.forEach(
    //     async (
    //         sagitypesForRow: Sagitype[],
    //         sagittalRowIndex: number,
    //     ): Promise<void> => {
//             const {
//                 texts,
//                 fonts,
//                 fontIndices,
//             }: {
//                 texts: (Io & Sentence)[]
//                 fonts: Font[]
//                 fontIndices: Index<Font>[]
//             } = computeTextsAndFonts({
//                 edoNotationName,
//                 diagramType,
//                 sagitypesForRow,
//                 tileRowCountScaleFactor,
//             })

//             const sagittalsGroupElement: NodeElement<SVGGElement> =
//                 await textsToSvgGroupElement(
//                     svgDocument,
//                     texts,
//                     fonts,
//                     fontIndices,
//                 )

//             const sagittalsWidth: Px = getGroupWidth(sagittalsGroupElement)

//             sagittalsGroupElement.setAttribute(
//                 "transform",
//                 `translate(${TILE_SIZE / 2 - sagittalsWidth / 2} ${
//                     computeAdditionalYOffsetPerSagittalRowCount(
//                         sagittalRowCount,
//                         maxSagittalRowCount,
//                     ) +
//                     sagittalRowIndex * (22 / tileRowCountScaleFactor)
//                 })`, // TODO: this is the part I need to work on now, including constantizing whatever I come up with that works in the end
//             )
//             tileGroupElement.appendChild(sagittalsGroupElement)
//         },
//     )
// }

// // TODO: Count<TileRow<Sagittal>>, and so also TileRow<Edo>
// const computeAdditionalYOffsetPerSagittalRowCount = (
//     sagittalRowCount: Count,
//     maxSagittalRowCount: Max<Count<Sagittal>>,
// ): Px => {

//     const maxSagittalsPerRow =
//         computeMaxSagittalsForTileRowCount((sagittalRowCount + 1) as Count) /
//         sagittalRowCount
    
//     const thingFactor = max(maxSagittalsPerRow - maxSagittalRowCount, 0)
    
//     const baseThing = -10 + 2 ** (2 - sagittalRowCount)



//     return 0 as Px
// }

// const ADDITIONAL_Y_OFFSET_PER_SAGITTAL_ROW_COUNT: Px[] = [
//     undefined,
//     -6, // 1 sagittal row
//     5, // 2 sagittal rows
//     3, // 3 sagittal rows
// ] as Px[]

// // 61:  4  (1 sagittal row,  max  4 of  6              ) best is -6
// // 71:  5  (1 sagittal row,  max  5 of  6, so stretched) best is  2
// // 121: 6  (1 sagittal row,  max  6 of  6, so stretched) best is  6

// // 140: 7  (2 sagittal rows, max  4 of  8              ) best is -4
// // 270: 13 (2 sagittal rows, max  7 of  8, so stretched) best is  2
// // 311: 15 (2 sagittal rows, max  8 of  8, so stretched) best is  5

// // 494: 23 (3 sagittal rows, max  8 of 10              ) best is  -3
// // ???: ?? (3 sagittal rows, max  9 of 10, so stretched) best is  1
// // 581: 28 (3 sagittal rows, max 10 of 10, so stretched) best is  3

// export { addSagittals }

// export {
//     computeSagittalCountsByRow,
//     computeSagitypesByRow,
// }
