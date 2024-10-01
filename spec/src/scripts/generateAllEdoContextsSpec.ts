import { Filename, Io, readLines, runScriptAndGetConsoleOutput } from "@sagittal/general"
import { unlinkSync, writeFileSync } from "fs"
import { MAX_PERIODIC_TABLE_EDO } from "../../../src/constants"

describe("generate-all-edo-contexts", (): void => {
    it("generates the correct contexts", (): void => {
        const actual: Io[] = runScriptAndGetConsoleOutput(`npm run generate-all-edo-contexts -- --dry-run --max-edo ${MAX_PERIODIC_TABLE_EDO}` as Io)
        writeFileSync("spec/edoContextsActual.txt", actual.join("\n"))

        const expected: Io[] = readLines("spec/edoContextsExpected.txt" as Filename)

        expect(actual).toEqual(expected)
        
        if (actual.every((actualLine: Io, actualLineIndex: number): boolean => actualLine === expected[actualLineIndex])) {
            unlinkSync("spec/edoContextsActual.txt")
        }
    })
})
