import {Io, onlyRunInCi, runScriptAndGetConsoleOutput} from "@sagittal/general"

describe("generate-edo-staves-text-to-svg", (): void => {
    // tslint:disable-next-line:ban
    xit("generates a set of staves for each EDO showing its notation in both Evo and Revo flavors, and a chromatic scale plus alterations of a single nominal", (): void => {
        onlyRunInCi()

        const actual = runScriptAndGetConsoleOutput("npm run generate-edo-staves-text-to-svg")

        const expected = [] as Io[]
        expect(actual).toEqual(expected)
    })
})
