import { max, min, Px } from "@sagittal/general"
import { NodeElement } from "./types"
import { computeExistingTransform } from "./shift"

const PATH_COMMANDS_RELEVANT_TO_X_POSITION: string[] = ["M", "L", "H", "C"]

const getGroupWithOnlyOnePathWidth = (
    groupElement: NodeElement<SVGGElement>,
    { includeLefthandWhitespace }: { includeLefthandWhitespace: boolean },
): Px => {
    const pathElement: NodeElement<SVGPathElement> =
        groupElement.getElementsByTagName(
            "path",
        )[0] as NodeElement<SVGPathElement>
    const dAttribute: string = pathElement.getAttribute("d")!
    const pathCommands: RegExpMatchArray =
        dAttribute.match(/[a-zA-Z][^a-zA-Z]*/g)!

    if (pathCommands === null) return 0 as Px

    let minX: Px = Infinity as Px
    let maxX: Px = -Infinity as Px

    pathCommands.forEach((pathCommand: string): void => {
        const pathCommandType: string = pathCommand[0]
        const pathCommmandX: Px = pathCommand
            .slice(1)
            .trim()
            .split(/[\s,]+/)
            .map(Number)[0] as Px

        if (PATH_COMMANDS_RELEVANT_TO_X_POSITION.includes(pathCommandType)) {
            minX = min(minX, pathCommmandX)
            maxX = max(maxX, pathCommmandX)
        }
    })

    return (maxX - (includeLefthandWhitespace ? 0 : minX)) as Px
}

const getGroupWidth = (
    groupElement: NodeElement<SVGGElement>,
    { includeLefthandWhitespace }: { includeLefthandWhitespace: boolean } = {
        includeLefthandWhitespace: false,
    },
): Px => {
    const groupElements: NodeElement<SVGGElement>[] = Array.from(
        groupElement.getElementsByTagName("g"),
    ) as NodeElement<SVGGElement>[]

    if (groupElements.length === 0)
        return getGroupWithOnlyOnePathWidth(groupElement, {
            includeLefthandWhitespace,
        })

    const widths: Px[] = groupElements.map(
        (groupElement: NodeElement<SVGGElement>): Px =>
            getGroupWithOnlyOnePathWidth(groupElement, {
                includeLefthandWhitespace: true,
            }),
    )
    const transforms: { existingX: Px; existingY: Px }[] = groupElements.map(
        computeExistingTransform,
    )

    let minX = Infinity
    let maxX = -Infinity

    widths.forEach((width: Px, widthIndex: number): void => {
        const tranformX: Px = transforms[widthIndex].existingX
        minX = min(minX, tranformX)
        maxX = max(maxX, tranformX + width)
    }, 0 as Px)

    return (maxX - minX) as Px
}

export { getGroupWidth }
