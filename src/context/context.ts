import * as fs from "fs"
import { Edo, EdoName } from "@sagittal/system"
import { Subsection } from "./types"
import { Io, isUndefined, Maybe, saveLog } from "@sagittal/general"
import {
    computeEquivalentNotationsLine,
    computeRelatedEdosLine,
    computeDiagramLine,
    computeSubsectionHeadingLine,
} from "./lines"

const generateContext = (edo: Edo, subsections: Subsection[], dryRun: boolean = false): void => {
    let lines: Maybe<Io>[] = ["===Sagittal notation==="]

    subsections.forEach(
        ({ diagramType, notation, isSecondBestNotation }: Subsection): void => {
            lines.push(computeSubsectionHeadingLine({ diagramType }))
            lines.push(
                computeDiagramLine({ edo, diagramType, isSecondBestNotation }),
            )
            lines.push(
                computeRelatedEdosLine(
                    isSecondBestNotation
                        ? (`${edo}b` as EdoName)
                        : (edo.toString() as EdoName),
                ),
            )
            lines.push(computeEquivalentNotationsLine({ notation }))
        },
    )

    lines = lines.filter((line: Maybe<Io>): boolean => !isUndefined(line))

    const output: Io = lines.join("\n")
    saveLog(`${output}\n`)

    if (dryRun) return

    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync(`dist/${edo}_context.txt`, output)
}

export { generateContext }
