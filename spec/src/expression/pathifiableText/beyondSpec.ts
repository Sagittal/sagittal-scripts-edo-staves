import { deepClone, Index, Io, Px } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { BRAVURA_Y_OFFSET, MEANINGS_FONTS } from "../../../../src/constants"
import { computeExpressionsBeyondHalfApotomePathifiableTexts } from "../../../../src/diagram/svg/meaning/expression"
import { DiagramType, Font, PathifiableTexts } from "../../../../src/types"

describe("computeExpressionsBeyondHalfApotomePathifiableTexts", (): void => {
    describe("Revo cases", (): void => {
        describe("with a half-apotome symbol (even sharpness)", (): void => {
            it("31-EDO", (): void => {
                const edoNotationName: EdoNotationName = "31" as EdoNotationName
                const diagramType: DiagramType = DiagramType.REVO

                const actual: PathifiableTexts = computeExpressionsBeyondHalfApotomePathifiableTexts({
                    edoNotationName,
                    diagramType,
                })

                const expected: PathifiableTexts = {
                    /* eslint-disable prettier/prettier */
                    texts: [
                        ", ",
                        "  ",       // /||\
                        " = ",
                        "   ",      // #
                    ] as Io[],
                    /* eslint-ensable prettier/prettier */
                    fonts: deepClone(MEANINGS_FONTS),
                    fontIndices: [1, 0, 1, 0] as Index<Font>[],
                    additionalYOffsets: [
                        BRAVURA_Y_OFFSET,
                        0,
                        BRAVURA_Y_OFFSET,
                        0,
                    ] as Px[],
                }
                expect(actual).toEqual(expected)
            })
        
            it("55-EDO", (): void => {
                const edoNotationName: EdoNotationName = "55" as EdoNotationName
                const diagramType: DiagramType = DiagramType.REVO
        
                const actual: PathifiableTexts = computeExpressionsBeyondHalfApotomePathifiableTexts({
                    edoNotationName,
                    diagramType,
                })
        
                const expected: PathifiableTexts = {
                    /* eslint-disable prettier/prettier */
                    texts: [
                        ", ",
                        "  ",       // //||
                        " = ",
                        "    ",    // )!(# 
                        ", ",
                        "  ",       // /||\
                        " = ",
                        "   ",      // #
                    ] as Io[],
                    /* eslint-ensable prettier/prettier */
                    fonts: deepClone(MEANINGS_FONTS),
                    fontIndices: [1, 0, 1, 0, 1, 0, 1, 0] as Index<Font>[],
                    additionalYOffsets: [
                        BRAVURA_Y_OFFSET,
                        0,
                        BRAVURA_Y_OFFSET,
                        0,
                        BRAVURA_Y_OFFSET,
                        0,
                        BRAVURA_Y_OFFSET,
                        0,
                    ] as Px[],
                }
                expect(actual).toEqual(expected)
            })
        })

        describe("without a half-apotome symbol (odd sharpness)", (): void => {
            it("50-EDO", (): void => {
                const edoNotationName: EdoNotationName = "50" as EdoNotationName
                const diagramType: DiagramType = DiagramType.REVO

                const actual: PathifiableTexts = computeExpressionsBeyondHalfApotomePathifiableTexts({
                    edoNotationName,
                    diagramType,
                })

                const expected: PathifiableTexts = {
                    /* eslint-disable prettier/prettier */
                    texts: [
                        ", ",
                        "  ",      // (|\
                        " = ",
                        "    ",   // \!)#
                        ", ",
                        "  ",      // /||\
                        " = ",
                        "   ",     // #
                    ] as Io[],
                    /* eslint-ensable prettier/prettier */
                    fonts: deepClone(MEANINGS_FONTS),
                    fontIndices: [1, 0, 1, 0, 1, 0, 1, 0] as Index<Font>[],
                    additionalYOffsets: [
                        BRAVURA_Y_OFFSET,
                        0,
                        BRAVURA_Y_OFFSET,
                        0,
                        BRAVURA_Y_OFFSET,
                        0,
                        BRAVURA_Y_OFFSET,
                        0,
                    ] as Px[],
                }
                expect(actual).toEqual(expected)
            })
    
            it("67-EDO", (): void => {
                const edoNotationName: EdoNotationName = "67" as EdoNotationName
                const diagramType: DiagramType = DiagramType.REVO
    
                const actual: PathifiableTexts = computeExpressionsBeyondHalfApotomePathifiableTexts({
                    edoNotationName,
                    diagramType,
                })
    
                const expected: PathifiableTexts = {
                    /* eslint-disable prettier/prettier */
                    texts: [
                        ", ",
                        "  ",      // (|\
                        " = ",
                        "    ",   // \!)#
                        ", ",
                        "  ",      // //||
                        " = ",
                        "    ",   // )!(#
                        ", ",
                        "  ",      // /||\
                        " = ",
                        "   ",     // #
                    ] as Io[],
                    /* eslint-ensable prettier/prettier */
                    fonts: deepClone(MEANINGS_FONTS),
                    fontIndices: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0] as Index<Font>[],
                    additionalYOffsets: [
                        BRAVURA_Y_OFFSET,
                        0,
                        BRAVURA_Y_OFFSET,
                        0,
                        BRAVURA_Y_OFFSET,
                        0,
                        BRAVURA_Y_OFFSET,
                        0,
                        BRAVURA_Y_OFFSET,
                        0,
                        BRAVURA_Y_OFFSET,
                        0,
                    ] as Px[],
                }
                expect(actual).toEqual(expected)
            })
        })
    })
    
    describe("Evo cases", (): void => {
        describe("without any single-shaft symbol that has a single-shaft apotome complement, there are never any additional meanings past the half-apotome", (): void => {
            it("36-EDO", (): void => {
                const edoNotationName: EdoNotationName = "36" as EdoNotationName
                const diagramType: DiagramType = DiagramType.EVO
        
                const actual: PathifiableTexts = computeExpressionsBeyondHalfApotomePathifiableTexts({
                    edoNotationName,
                    diagramType,
                })
        
                const expected: PathifiableTexts = {
                    texts: [] as Io[],
                    fonts: deepClone(MEANINGS_FONTS),
                    fontIndices: [] as Index<Font>[],
                    additionalYOffsets: [] as Px[],
                }
                expect(actual).toEqual(expected)
            })
        })
    
        describe("with at least one single-shaft symbol that has a single-shaft apotome complement", (): void => {
            describe("with a half-apotome (even sharpness)", (): void => {
                it("31-EDO", (): void => {
                    const edoNotationName: EdoNotationName = "55" as EdoNotationName
                    const diagramType: DiagramType = DiagramType.EVO
            
                    const actual: PathifiableTexts = computeExpressionsBeyondHalfApotomePathifiableTexts({
                        edoNotationName,
                        diagramType,
                    })
            
                    const expected: PathifiableTexts = {
                        texts: [] as Io[],
                        fonts: deepClone(MEANINGS_FONTS),
                        fontIndices: [] as Index<Font>[],
                        additionalYOffsets: [] as Px[],
                    }
                    expect(actual).toEqual(expected)
                })

                it("55-EDO", (): void => {
                    const edoNotationName: EdoNotationName = "55" as EdoNotationName
                    const diagramType: DiagramType = DiagramType.EVO
            
                    const actual: PathifiableTexts = computeExpressionsBeyondHalfApotomePathifiableTexts({
                        edoNotationName,
                        diagramType,
                    })
            
                    const expected: PathifiableTexts = {
                        texts: [] as Io[],
                        fonts: deepClone(MEANINGS_FONTS),
                        fontIndices: [] as Index<Font>[],
                        additionalYOffsets: [] as Px[],
                    }
                    expect(actual).toEqual(expected)
                })

                it("54-EDO, an interesting example with more than one single-shaft symbol", (): void => {
                    const edoNotationName: EdoNotationName = "54" as EdoNotationName
                    const diagramType: DiagramType = DiagramType.EVO
            
                    const actual: PathifiableTexts = computeExpressionsBeyondHalfApotomePathifiableTexts({
                        edoNotationName,
                        diagramType,
                    })
            
                    const expected: PathifiableTexts = {
                        texts: [
                            ", ",
                            "  ",      // (|)
                            " = ",
                            "    ",   // \!/#
                        ] as Io[],
                        fonts: deepClone(MEANINGS_FONTS),
                        fontIndices: [1, 0, 1, 0] as Index<Font>[],
                        additionalYOffsets: [
                            BRAVURA_Y_OFFSET,
                            0,
                            BRAVURA_Y_OFFSET,
                            0,
                        ] as Px[],
                    }
                    expect(actual).toEqual(expected)
                })
            })

            describe("without a half-apotome symbol (odd sharpness)", (): void => {
                it("50-EDO", (): void => {
                    const edoNotationName: EdoNotationName = "50" as EdoNotationName
                    const diagramType: DiagramType = DiagramType.EVO
            
                    const actual: PathifiableTexts = computeExpressionsBeyondHalfApotomePathifiableTexts({
                        edoNotationName,
                        diagramType,
                    })
            
                    const expected: PathifiableTexts = {
                        /* eslint-disable prettier/prettier */
                        texts: [
                            ", ",
                            "  ",      // (|\
                            " = ",
                            "    ",   // \!)#
                        ] as Io[],
                        /* eslint-ensable prettier/prettier */
                        fonts: deepClone(MEANINGS_FONTS),
                        fontIndices: [1, 0, 1, 0] as Index<Font>[],
                        additionalYOffsets: [
                            BRAVURA_Y_OFFSET,
                            0,
                            BRAVURA_Y_OFFSET,
                            0,
                        ] as Px[],
                    }
                    expect(actual).toEqual(expected)
                })
            
                it("67-EDO", (): void => {
                    const edoNotationName: EdoNotationName = "67" as EdoNotationName
                    const diagramType: DiagramType = DiagramType.EVO
            
                    const actual: PathifiableTexts = computeExpressionsBeyondHalfApotomePathifiableTexts({
                        edoNotationName,
                        diagramType,
                    })
            
                    const expected: PathifiableTexts = {
                        /* eslint-disable prettier/prettier */
                        texts: [
                            ", ",
                            "  ",      // (|\
                            " = ",
                            "    ",   // \!)#
                        ] as Io[],
                        /* eslint-ensable prettier/prettier */
                        fonts: deepClone(MEANINGS_FONTS),
                        fontIndices: [1, 0, 1, 0] as Index<Font>[],
                        additionalYOffsets: [
                            BRAVURA_Y_OFFSET,
                            0,
                            BRAVURA_Y_OFFSET,
                            0,
                        ] as Px[],
                    }
                    expect(actual).toEqual(expected)
                })
            })
        })
    })
})
