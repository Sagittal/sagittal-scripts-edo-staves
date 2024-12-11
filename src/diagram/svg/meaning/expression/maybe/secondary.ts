import { Comma, Io, Name } from "@sagittal/general"
import { computeIsDown } from "../../../../../comma"
import { computeCommaExpressionPart } from "./part"

const computeMaybeSecondaryCommaDirectionOverride = ({
    isPrimaryDown,
    isSecondaryDown,
}: {
    isPrimaryDown: boolean
    isSecondaryDown: boolean
}): Io => (isPrimaryDown === isSecondaryDown ? "" : isSecondaryDown ? " up" : " down")

const computeSecondaryCommaExpressionPart = (
    secondaryCommaName: Name<Comma>,
    { isPrimaryDown }: { isPrimaryDown: boolean },
) => {
    const isSecondaryDown: boolean = computeIsDown(secondaryCommaName)
    const maybeSecondaryCommaDirectionOverride: Io = computeMaybeSecondaryCommaDirectionOverride({
        isPrimaryDown,
        isSecondaryDown,
    })
    const directedSecondaryCommaName: Name<Comma> = (secondaryCommaName +
        maybeSecondaryCommaDirectionOverride) as Name<Comma>
    const secondaryCommaExpressionPart: Io = computeCommaExpressionPart(directedSecondaryCommaName, {
        isSecondary: true,
    })

    return secondaryCommaExpressionPart
}

const computeSecondaryCommasExpressionPart = (
    secondaryCommaNames: Name<Comma>[],
    { isPrimaryDown }: { isPrimaryDown: boolean },
) =>
    secondaryCommaNames.reduce(
        (secondaryCommaExpressionPart: Io, secondaryCommaName: Name<Comma>): Io =>
            (secondaryCommaExpressionPart +
                computeSecondaryCommaExpressionPart(secondaryCommaName, {
                    isPrimaryDown,
                })) as Io,
        "" as Io,
    )

export { computeSecondaryCommasExpressionPart }
