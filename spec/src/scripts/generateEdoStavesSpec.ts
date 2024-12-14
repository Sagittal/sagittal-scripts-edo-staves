import { Io, runScriptAndGetConsoleOutput } from "@sagittal/general"

describe("generate-edo-staves", (): void => {
    it("can generate a diagram without crashing", (): void => {
        runScriptAndGetConsoleOutput(`npm run generate-edo-staves -- --dry-run --edo 12 --flavor evo` as Io)
    })

    it("can generate another diagram without crashing", (): void => {
        runScriptAndGetConsoleOutput(`npm run generate-edo-staves -- --dry-run --edo 13 --flavor evo` as Io)
    })

    it("can generate yet another diagram without crashing", (): void => {
        runScriptAndGetConsoleOutput(
            `npm run generate-edo-staves -- --dry-run --edo 89 --flavor evo-sz` as Io,
        )
    })

    it("can generate yet yet another diagram without crashing", (): void => {
        runScriptAndGetConsoleOutput(`npm run generate-edo-staves -- --edo 45 --flavor evo-sz` as Io)
    })

    it("can generate yet yet yet another diagram without crashing", (): void => {
        runScriptAndGetConsoleOutput(`npm run generate-edo-staves -- --edo 17 --flavor evo` as Io)
    })
})
