import { Document } from "@xmldom/xmldom"
import { Count, Index, Io, Max, max, Px, Sentence } from "@sagittal/general"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    NonSubsetEdoNotationDefinition,
    Sagittal,
    Sagitype,
} from "@sagittal/system"
import { TILE_SIZE } from "../constants"
import { getGroupWidth } from "../width"
import { textsToSvgGroupElement } from "../text"
import { Font, NodeElement } from "../types"
import { DiagramType } from "../../../types"
import { computeTextsAndFonts } from "./textsAndFonts"
import { TILE_ROW_FOR_EDO } from "./constants"
import { computeTileRowCountScaleFactor } from "./rowCount"

const computeSagittalCountsByRow = ({
    sagittalRowCount,
    sagittalCount,
}: {
    sagittalRowCount: Count
    sagittalCount: Count<Sagittal>
}): Count<Sagittal>[] => {
    const sagittalCountByRow: Count<Sagittal>[] = []
    let remainingSagittalCount: Count<Sagittal> = sagittalCount

    const sagittalsPerRow: Count<Sagittal> = Math.ceil(
        sagittalCount / sagittalRowCount,
    ) as Count<Sagittal>

    while (remainingSagittalCount > 0) {
        if (remainingSagittalCount > sagittalsPerRow) {
            sagittalCountByRow.push(sagittalsPerRow)
            remainingSagittalCount = (remainingSagittalCount -
                sagittalsPerRow) as Count<Sagittal>
        } else {
            sagittalCountByRow.push(remainingSagittalCount)
            remainingSagittalCount = 0 as Count<Sagittal>
        }
    }

    return sagittalCountByRow
}

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

const POWER_TO_ACCOUNT_FOR_SPACES_BETWEEN_SAGITTALS = 1 // 2

const additionalTowRowCountScaleFactor = ({
    sagittalCountsByRow,
    sagittalRowCount,
}: {
    sagittalCountsByRow: Count<Sagittal>[]
    sagittalRowCount: Count
}): number => {
    const maxSagittalRowCount: Max<Count<Sagittal>> = max(
        ...sagittalCountsByRow,
    )
    const maxFullSizeSagittalsForSagittalRowCount: Max<Count<Sagittal>> =
        ((sagittalRowCount + 1) * 2) as Max<Count<Sagittal>>

    return maxSagittalRowCount > maxFullSizeSagittalsForSagittalRowCount
        ? (maxSagittalRowCount / maxFullSizeSagittalsForSagittalRowCount) **
              POWER_TO_ACCOUNT_FOR_SPACES_BETWEEN_SAGITTALS
        : 1
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
        computeTileRowCountScaleFactor(tileRowCount) *
        additionalTowRowCountScaleFactor({
            sagittalCountsByRow,
            sagittalRowCount,
        })

    sagitypesByRow.forEach(
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

            const sagittalsGroupElement: NodeElement<SVGGElement> =
                await textsToSvgGroupElement(
                    svgDocument,
                    texts,
                    fonts,
                    fontIndices,
                )

            const sagittalsWidth: Px = getGroupWidth(sagittalsGroupElement)

            sagittalsGroupElement.setAttribute(
                "transform",
                `translate(${TILE_SIZE / 2 - sagittalsWidth / 2} ${
                    ADDITIONAL_Y_OFFSET_PER_SAGITTAL_ROW_COUNT[
                        sagittalRowCount
                    ] +
                    sagittalRowIndex * (22 / tileRowCountScaleFactor)
                })`, // TODO: this is the part I need to work on now, including constantizing whatever I come up with that works in the end
            )
            tileGroupElement.appendChild(sagittalsGroupElement)
        },
    )
}

const ADDITIONAL_Y_OFFSET_PER_SAGITTAL_ROW_COUNT: Px[] = [
    0, // 0 sagittal rows (not needed?)
    -6, // 1 sagittal row
    5, // 2 sagittal rows
    2,
    6,
] as Px[]

// 61:  4  (1 row,  max  4 of  6              ) best is -6
// 71:  5  (1 row,  max  5 of  6, so stretched) best is  2
// 121: 6  (1 row,  max  6 of  6, so stretched) best is  7

// 140: 7  (2 rows, max  4 of  8              ) best is -4
// 270: 13 (2 rows, max  7 of  8, so stretched) best is  2
// 311: 15 (2 rows, max  8 of  8, so stretched) best is  5

// 494: 23 (3 rows, max  8 of 10              ) best is  ?
// ???: ?? (3 rows, max  9 of 10, so stretched) best is  ?
// 581: 28 (3 rows, max 10 of 10, so stretched) best is  ?

export { addSagittals }
