import { unlinkSync, writeFileSync } from "fs"
import { Filename, Io, readLines, runScriptAndGetConsoleOutput } from "@sagittal/general"
import { MAX_PERIODIC_TABLE_EDO } from "../../../src/constants"

describe("generate-all-edo-staves", (): void => {
    it("generates the correct notations with the correct titles", (): void => {
        const actual: Io[] = runScriptAndGetConsoleOutput(
            `npm run generate-all-edo-staves -- --dry-run --max-edo ${MAX_PERIODIC_TABLE_EDO}` as Io,
        )
        writeFileSync("spec/edoDiagramsActual.txt", actual.join("\n"))

        const expected: Io[] = readLines("spec/edoDiagramsExpected.txt" as Filename)

        expect(actual).toEqual(expected)

        if (
            actual.every(
                (actualLine: Io, actualLineIndex: number): boolean =>
                    actualLine === expected[actualLineIndex],
            )
        ) {
            unlinkSync("spec/edoDiagramsActual.txt")
        }
    })
})
