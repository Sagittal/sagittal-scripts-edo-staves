import * as fs from "fs"
import { Edo, EdoName } from "@sagittal/system"
import { Subsection } from "./types"
import { Io, Maybe } from "@sagittal/general"
import { DiagramType } from "../types"
import { computeSetsLine } from "./lines"

const SUBSECTION_HEADINGS: Record<DiagramType, Maybe<Io>> = {
    [DiagramType.GENERAL]: undefined,
    [DiagramType.EVO]: "====Evo flavor====",
    [DiagramType.REVO]: "====Revo flavor====",
    [DiagramType.ALTERNATE_EVO]: "====Alternate Evo flavor====",
    [DiagramType.EVO_SZ]: "====Evo-SZ flavor====",
}

const generateContext = (edo: Edo, subsections: Subsection[]): void => {
    const lines: Maybe<Io>[] = ["===Sagittal notation==="]

    subsections.forEach(({diagramType, notation, isSecondBestNotation}: Subsection): void => {
        lines.push(SUBSECTION_HEADINGS[diagramType])
        lines.push(computeSetsLine(isSecondBestNotation ? `${edo}b` as EdoName : edo.toString() as EdoName))
    })

    // TODO: filter undefineds

    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync(`dist/${edo}_context.txt`, lines.join("\n"))
}

export { generateContext }
