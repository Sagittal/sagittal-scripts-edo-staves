import { Px } from "@sagittal/general"

const PATH_COMMANDS_RELEVANT_TO_X_POSITION: string[] = ["M", "L", "H"]

const getGroupWidth = (groupElement: SVGGElement): Px => {
    const pathElement: SVGPathElement =
        groupElement.getElementsByTagName("path")[0]
    const dAttribute: string = pathElement.getAttribute("d")!
    const pathCommands: RegExpMatchArray =
        dAttribute.match(/[a-zA-Z][^a-zA-Z]*/g)!

    let minX = Infinity
    let maxX = -Infinity

    pathCommands.forEach((pathCommand: string): void => {
        const pathCommandType: string = pathCommand[0]
        const pathCommmandX: number = pathCommand
            .slice(1)
            .trim()
            .split(/[\s,]+/)
            .map(Number)[0]

        if (PATH_COMMANDS_RELEVANT_TO_X_POSITION.includes(pathCommandType)) {
            minX = Math.min(minX, pathCommmandX)
            maxX = Math.max(maxX, pathCommmandX)
        }
    })

    return Math.round(maxX - minX) as Px
}

export {
    getGroupWidth,
}
