import { max, min, Px } from "@sagittal/general"
import { computeExistingTranslation } from "./transform"
import { NodeElement } from "./types"

const PATH_COMMANDS_RELEVANT_TO_X_POSITION: string[] = ["M", "L", "H", "C"]

const getGroupWithOnlyOnePathWidth = (
    groupElement: NodeElement<SVGGElement>,
    { includeLefthandWhitespace }: { includeLefthandWhitespace: boolean },
): Px => {
    const pathElements: NodeElement<SVGPathElement>[] = groupElement.getElementsByTagName(
        "path",
    ) as unknown as NodeElement<SVGPathElement>[]

    if (pathElements.length === 0) return 0 as Px

    const pathElement: NodeElement<SVGPathElement> = pathElements[0]
    const dAttribute: string = pathElement.getAttribute("d")!
    const pathCommands: RegExpMatchArray = dAttribute.match(/[a-zA-Z][^a-zA-Z]*/g)!

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
    const translations: { xTranslationExisting: Px; yTranslationExisting: Px }[] =
        groupElements.map(computeExistingTranslation)

    let minX = Infinity
    let maxX = -Infinity

    widths.forEach((width: Px, widthIndex: number): void => {
        const xTranslation: Px = translations[widthIndex].xTranslationExisting
        minX = min(minX, xTranslation)
        maxX = max(maxX, xTranslation + width)
    }, 0 as Px)

    return (maxX - minX) as Px
}

export { getGroupWidth }
