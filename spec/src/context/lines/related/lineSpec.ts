import { EdoNotationName } from "@sagittal/system"
import { computeRelatedEdosLine } from "../../../../../src/context/lines/related/line"

describe("computeRelatedEdosLine", (): void => {
    it("computes the correct sets line for 22-EDO, an example with all three of same sagittal sequences, subset notations, and superset notations", (): void => {
        const edoNotationName = "22" as EdoNotationName
        const setsLine = computeRelatedEdosLine(edoNotationName)

        expect(setsLine).toBe(
            "This notation uses the same sagittal sequence as EDOs [[15edo#Sagittal notation|15]] and [[29edo#Sagittal notation|29]], is a subset of the notations for EDOs [[44edo#Sagittal notation|44]] and [[66edo#Sagittal notation|66]], and is a superset of the notation for [[11edo#Sagittal notation|11-EDO]].",
        )
    })

    it("computes the correct sets line for 7-EDO, an example with only same sagittal sequences and superset notations (no subset notations)", (): void => {
        const edoNotationName = "17" as EdoNotationName
        const setsLine = computeRelatedEdosLine(edoNotationName)

        expect(setsLine).toBe(
            "This notation uses the same sagittal sequence as EDOs [[24edo#Sagittal notation|24]], [[31edo#Sagittal notation|31]], and [[38edo#Sagittal notation|38]], and is a subset of the notation for [[34edo#Sagittal notation|34-EDO]].",
        )
    })

    it("computes the correct sets line for 25-EDO, an example with only same sagittal sequences and subset notations (no superset notations)", (): void => {
        const edoNotationName = "25" as EdoNotationName
        const setsLine = computeRelatedEdosLine(edoNotationName)

        expect(setsLine).toBe(
            "This notation uses the same sagittal sequence as [[32edo#Sagittal notation|32-EDO]], and is a superset of the notation for [[5edo#Sagittal notation|5-EDO]].",
        )
    })

    it("computes the correct sets line for 26-EDO, an example with only subset and superset notations (no same sagittal sequences)", (): void => {
        const edoNotationName = "26" as EdoNotationName
        const setsLine = computeRelatedEdosLine(edoNotationName)

        expect(setsLine).toBe(
            "This notation is a subset of the notation for [[52edo#Sagittal notation|52-EDO]] and a superset of the notation for [[13edo#Sagittal notation|13-EDO]].",
        )
    })

    it("computes the correct sets line for 42-EDO, an example with only same sagittal sequences (no subset or superset notations)", (): void => {
        const edoNotationName = "42" as EdoNotationName
        const setsLine = computeRelatedEdosLine(edoNotationName)

        expect(setsLine).toBe(
            "This notation uses the same sagittal sequence as [[35edo#Sagittal notation|35b]].",
        )
    })

    it("computes the correct sets line for 20-EDO, an example with only subset notations (no same sagittal sequences or superset notations)", (): void => {
        const edoNotationName = "20" as EdoNotationName
        const setsLine = computeRelatedEdosLine(edoNotationName)

        expect(setsLine).toBe(
            "This notation is a superset of the notations for EDOs [[10edo#Sagittal notation|10]] and [[5edo#Sagittal notation|5]].",
        )
    })

    it("computes the correct sets line for 5-EDO, an example with only superset notations (no same sagittal sequences or subset notations)", (): void => {
        const edoNotationName = "5" as EdoNotationName
        const setsLine = computeRelatedEdosLine(edoNotationName)

        expect(setsLine).toBe(
            "This notation is a subset of the notations for EDOs [[10edo#Sagittal notation|10]], [[15edo#Sagittal notation|15]], [[20edo#Sagittal notation|20]], [[25edo#Sagittal notation|25]], [[30edo#Sagittal notation|30]], and [[35edo#Sagittal notation|35b]].",
        )
    })
})
