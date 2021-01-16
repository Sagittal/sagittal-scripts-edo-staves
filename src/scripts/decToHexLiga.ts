import {Filename, NEWLINE, readLines} from "@sagittal/general"
import * as fs from "fs"

const lookupTablesJson = readLines("src/scripts/lookupTables.json" as Filename).join(NEWLINE)

const decToHex = (int: number): string => {
    let str = int.toString(16).toUpperCase()
    while (str.length < 4) {
        str = "0" + str
    }
    return `U+${str}`
}

const OFFSET_BETWEEN_CSP_AND_WHAT_OPENTYPE_HAS_FOR_SOME_REASON = 57935

const decToHexWithOffsetForRanges = (int: number): string => {
    let str = (int + OFFSET_BETWEEN_CSP_AND_WHAT_OPENTYPE_HAS_FOR_SOME_REASON).toString(16).toUpperCase()
    while (str.length < 4) {
        str = "0" + str
    }
    return `U+${str}`
}

const processRanges = (ranges: any): any => {
    return ranges && ranges.map((range: any): any => {
        return {
            ...range,
            start: decToHexWithOffsetForRanges(range.start),
            end: decToHexWithOffsetForRanges(range.end),
        }
    })
}

const processedLookupTables = JSON.parse(lookupTablesJson).map((lookupTable: any, index: number): any => {
    return {
        ...lookupTable,
        subtables: lookupTable.subtables.map((subtable: any): any => {
            console.log(`subtable for lookup table ${index} has coverage glyphs ${subtable.coverage.glyphs} and ranges ${JSON.stringify(processRanges(subtable.coverage.ranges))} and ligature sets length ${subtable.ligatureSets.length} and ligature set lengths ${subtable.ligatureSets.map((ligatureSet: any): number => ligatureSet.length)}`)
            return {
                ...subtable,
                coverage: {
                    ...subtable.coverage,
                    glyphs: subtable.coverage.glyphs && subtable.coverage.glyphs.map((glyph: any): any => {
                        return decToHex(glyph)
                    }),
                    ranges: processRanges(subtable.coverage.ranges),
                },
                ligatureSets: subtable.ligatureSets.map((ligatureSet: any): any => {
                    return ligatureSet.map((ligature: any): any => {
                        return {
                            ligGlyph: decToHex(ligature.ligGlyph),
                            components: ligature.components.map((component: any): any => {
                                return decToHex(component)
                            }),
                        }
                    })
                }),
            }
        }),
    }
})

fs.writeFileSync("src/scripts/processedLookupTables.json", JSON.stringify(processedLookupTables, null, 2))
