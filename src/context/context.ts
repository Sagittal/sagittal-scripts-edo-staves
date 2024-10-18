import * as fs from "fs"
import { Edo, EdoNotationName } from "@sagittal/system"
import { Subsection } from "./types"
import { Io, isUndefined, Maybe, saveLog } from "@sagittal/general"
import {
    computeEquivalentNotationsLine,
    computeRelatedEdosLine,
    computeDiagramLine,
    computeSubsectionHeadingLine,
    computeApproximationExplanationLine,
} from "./lines"

const generateContext = (
    edo: Edo,
    subsectionsForEachFifth: Subsection[][],
    dryRun: boolean = false,
): void => {
    let lines: Maybe<Io>[] = ["===Sagittal notation==="]

    const hasSecondBestFifthNotation: boolean =
        subsectionsForEachFifth.length === 2

    const approximationsExplanationLine: Maybe<Io> =
        computeApproximationExplanationLine(edo)
    lines.push(approximationsExplanationLine)

    subsectionsForEachFifth.forEach(
        (subsections: Subsection[], subsectionsIndex: number): void => {
            const isSecondBestFifthNotation: boolean = subsectionsIndex === 1

            if (hasSecondBestFifthNotation) {
                lines.push(
                    isSecondBestFifthNotation
                        ? "====Second best fifth notation===="
                        : "====Best fifth notation====",
                )
            }

            const relatedEdosLine: Maybe<Io> = computeRelatedEdosLine(
                isSecondBestFifthNotation
                    ? (`${edo}b` as EdoNotationName)
                    : (edo.toString() as EdoNotationName),
            )

            if (
                !hasSecondBestFifthNotation &&
                !isUndefined(approximationsExplanationLine) &&
                !isUndefined(relatedEdosLine)
            ) {
                lines.push("")
            }

            lines.push(relatedEdosLine)

            subsections.forEach(
                ({ diagramType, notation }: Subsection): void => {
                    lines.push(
                        computeSubsectionHeadingLine({
                            diagramType,
                            hasSecondBestFifthNotation,
                        }),
                    )
                    lines.push(
                        computeDiagramLine({
                            edo,
                            diagramType,
                            isSecondBestFifthNotation,
                        }),
                    )
                    lines.push(
                        computeEquivalentNotationsLine({
                            notation,
                            diagramType,
                        }),
                    )
                },
            )
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
