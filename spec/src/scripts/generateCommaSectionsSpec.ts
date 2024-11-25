import { unlinkSync, writeFileSync } from "fs"
import { Filename, Io, readLines, runScriptAndGetConsoleOutput } from "@sagittal/general"

describe("generate-comma-sections", (): void => {
    xit("generates the correct Sagittal notation sections to comma pages on the Xen wiki", (): void => {
        const actual: Io[] = runScriptAndGetConsoleOutput(`npm run generate-comma-sections` as Io)
        writeFileSync("spec/commaSectionsActual.txt", actual.join("\n"))

        const expected: Io[] = readLines("spec/commaSectionsExpected.txt" as Filename)

        expect(actual).toEqual(expected)

        if (
            actual.every(
                (actualLine: Io, actualLineIndex: number): boolean =>
                    actualLine === expected[actualLineIndex],
            )
        ) {
            unlinkSync("spec/commaSectionsActual.txt")
        }
    })
})
