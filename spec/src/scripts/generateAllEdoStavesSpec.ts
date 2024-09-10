import { Filename, Io, readLines, runScriptAndGetConsoleOutput, slowTestOnlyRunInFullSuite } from "@sagittal/general"
import { unlinkSync, writeFileSync } from "fs"

describe("generate-all-edo-staves", (): void => {
    it("generates the correct notations with the correct titles", (): void => {
        const actual: Io[] = runScriptAndGetConsoleOutput("npm run generate-all-edo-staves -- --dry-run" as Io)
        writeFileSync("spec/edoDiagramsActual.txt", actual.join("\n"))

        const expected: Io[] = readLines("spec/edoDiagramsExpected.txt" as Filename)

        expect(actual).toEqual(expected)
        
        if (actual.every((actualLine: Io, actualLineIndex: number): boolean => actualLine === expected[actualLineIndex])) {
            unlinkSync("spec/edoDiagramsActual.txt")
        }
    })
})
