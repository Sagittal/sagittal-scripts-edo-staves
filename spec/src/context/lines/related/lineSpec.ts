import { EdoNotationName } from "@sagittal/system"
import { computeRelatedEdosLine } from "../../../../../src/context/lines/related/line"

describe("computeRelatedEdosLine", (): void => {
    it("computes the correct sets line for 22-EDO, an example with all three of same sagittal sequences, subset notations, and superset notations", (): void => {
        const edoNotationName = "22" as EdoNotationName
        const setsLine = computeRelatedEdosLine(edoNotationName)

        expect(setsLine).toBe(
            "This notation uses the same sagittal sequence as EDOs [[15-EDO#Sagittal notation|15]] and [[29-EDO#Sagittal notation|29]], is a subset of the notations for EDOs [[44-EDO#Sagittal notation|44]] and [[66-EDO#Sagittal notation|66]], and is a superset of the notation for [[11-EDO#Sagittal notation|11-EDO]].",
        )
    })

    it("computes the correct sets line for 7-EDO, an example with only same sagittal sequences and superset notations (no subset notations)", (): void => {
        const edoNotationName = "17" as EdoNotationName
        const setsLine = computeRelatedEdosLine(edoNotationName)

        expect(setsLine).toBe(
            "This notation uses the same sagittal sequence as EDOs [[24-EDO#Sagittal notation|24]], [[31-EDO#Sagittal notation|31]], and [[38-EDO#Sagittal notation|38]], and is a subset of the notation for [[34-EDO#Sagittal notation|34-EDO]].",
        )
    })

    it("computes the correct sets line for 25-EDO, an example with only same sagittal sequences and subset notations (no superset notations)", (): void => {
        const edoNotationName = "25" as EdoNotationName
        const setsLine = computeRelatedEdosLine(edoNotationName)

        expect(setsLine).toBe(
            "This notation uses the same sagittal sequence as [[32-EDO#Sagittal notation|32-EDO]], and is a superset of the notation for [[5-EDO#Sagittal notation|5-EDO]].",
        )
    })

    it("computes the correct sets line for 26-EDO, an example with only subset and superset notations (no same sagittal sequences)", (): void => {
        const edoNotationName = "26" as EdoNotationName
        const setsLine = computeRelatedEdosLine(edoNotationName)

        expect(setsLine).toBe(
            "This notation is a subset of the notation for [[52-EDO#Sagittal notation|52-EDO]] and a superset of the notation for [[13-EDO#Sagittal notation|13-EDO]].",
        )
    })

    it("computes the correct sets line for 42-EDO, an example with only same sagittal sequences (no subset or superset notations)", (): void => {
        const edoNotationName = "42" as EdoNotationName
        const setsLine = computeRelatedEdosLine(edoNotationName)

        expect(setsLine).toBe(
            "This notation uses the same sagittal sequence as [[35-EDO#Sagittal notation|35b]].",
        )
    })

    it("computes the correct sets line for 20-EDO, an example with only subset notations (no same sagittal sequences or superset notations)", (): void => {
        const edoNotationName = "20" as EdoNotationName
        const setsLine = computeRelatedEdosLine(edoNotationName)

        expect(setsLine).toBe(
            "This notation is a superset of the notations for EDOs [[10-EDO#Sagittal notation|10]] and [[5-EDO#Sagittal notation|5]].",
        )
    })

    it("computes the correct sets line for 5-EDO, an example with only superset notations (no same sagittal sequences or subset notations)", (): void => {
        const edoNotationName = "5" as EdoNotationName
        const setsLine = computeRelatedEdosLine(edoNotationName)

        expect(setsLine).toBe(
            "This notation is a subset of the notations for EDOs [[10-EDO#Sagittal notation|10]], [[15-EDO#Sagittal notation|15]], [[20-EDO#Sagittal notation|20]], [[25-EDO#Sagittal notation|25]], [[30-EDO#Sagittal notation|30]], and [[35-EDO#Sagittal notation|35b]].",
        )
    })
})
