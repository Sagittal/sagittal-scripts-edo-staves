import { EdoName } from "@sagittal/system"
import { computeSetsLine } from "../../../src/context/lines"

describe("computeSetsLine", (): void => {
    it("computes the correct sets line for 22-EDO", (): void => {
        const edoName = "22" as EdoName
        const setsLine = computeSetsLine(edoName)

        expect(setsLine).toBe(
            "This notation uses the same sagittal sequence as EDOs [[15-EDO#Sagittal notation|15]] and [[29-EDO#Sagittal notation|29]], is a subset of the notations for EDOs [[44-EDO#Sagittal notation|44]] and [[66-EDO#Sagittal notation|66]], and is a superset of the notation for [[11-EDO#Sagittal notation|11-EDO]].",
        )
    })

    it("computes the correct sets line for 7-EDO", (): void => {
        const edoName = "17" as EdoName
        const setsLine = computeSetsLine(edoName)

        expect(setsLine).toBe(
            "This notation uses the same sagittal sequence as EDOs [[24-EDO#Sagittal notation|24]], [[31-EDO#Sagittal notation|31]], and [[38-EDO#Sagittal notation|38]], and is a subset of the notation for [[34-EDO#Sagittal notation|34-EDO]].",
        )
    })

    it("computes the correct sets line for 38-EDO", (): void => {
        const edoName = "38" as EdoName
        const setsLine = computeSetsLine(edoName)

        expect(setsLine).toBe(
            "This notation uses the same sagittal sequence as EDOs [[17-EDO#Sagittal notation|17]], [[24-EDO#Sagittal notation|24]], and [[31-EDO#Sagittal notation|31]], and is a superset of the notation for [[19-EDO#Sagittal notation|19-EDO]].",
        )
    })

    it("computes the correct sets line for 26-EDO", (): void => {
        const edoName = "26" as EdoName
        const setsLine = computeSetsLine(edoName)

        expect(setsLine).toBe(
            "This notation is a subset of the notation for [[52-EDO#Sagittal notation|52-EDO]] and a superset of the notation for [[13-EDO#Sagittal notation|13-EDO]].",
        )
    })

    it("computes the correct sets line for 42-EDO", (): void => {
        const edoName = "42" as EdoName
        const setsLine = computeSetsLine(edoName)

        expect(setsLine).toBe(
            "This notation uses the same sagittal sequence as [[35-EDO#Sagittal notation|35b]].",
        )
    })

    it("computes the correct sets line for 20-EDO", (): void => {
        const edoName = "20" as EdoName
        const setsLine = computeSetsLine(edoName)

        expect(setsLine).toBe(
            "This notation is a superset of the notations for EDOs [[10-EDO#Sagittal notation|10]] and [[5-EDO#Sagittal notation|5]].",
        )
    })

    it("computes the correct sets line for 5-EDO", (): void => {
        const edoName = "5" as EdoName
        const setsLine = computeSetsLine(edoName)

        expect(setsLine).toBe(
            "This notation is a subset of the notations for EDOs [[10-EDO#Sagittal notation|10]], [[15-EDO#Sagittal notation|15]], [[20-EDO#Sagittal notation|20]], [[25-EDO#Sagittal notation|25]], [[30-EDO#Sagittal notation|30]], and [[35-EDO#Sagittal notation|35b]].",
        )
    })
})
