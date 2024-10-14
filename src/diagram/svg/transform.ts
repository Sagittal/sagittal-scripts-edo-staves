import { Index, isUndefined, Px, round } from "@sagittal/general"
import { NodeElement, Scaler } from "./types"

const INDEX_OF_SCALE: Index = 1 as Index

const INDEX_OF_X_TRANSLATION: Index = 1 as Index
const INDEX_OF_Y_TRANSLATION: Index = 2 as Index

const computeExistingScale = (svgElement: NodeElement<SVGElement>): Scaler => {
    const existingTransform: null | string =
        svgElement.getAttribute("transform")

    const scaleMatch: undefined | null | RegExpMatchArray =
        existingTransform?.match(/scale\(([^)]+)\)/)

    return scaleMatch
        ? (parseFloat(scaleMatch[INDEX_OF_SCALE]) as Scaler)
        : (1 as Scaler)
}

const computeExistingTranslation = (
    svgElement: NodeElement<SVGElement>,
): { xTranslationExisting: Px; yTranslationExisting: Px } => {
    const existingTransform: null | string =
        svgElement.getAttribute("transform")

    const existingXAndYTranslationRegExpMatches:
        | undefined
        | null
        | RegExpMatchArray = existingTransform?.match(
        /translate\((-?\d+\.?\d*)\s+(-?\d+\.?\d*)\)/,
    )

    const xTranslationExisting: Px = existingXAndYTranslationRegExpMatches
        ? (parseFloat(
              existingXAndYTranslationRegExpMatches[INDEX_OF_X_TRANSLATION],
          ) as Px)
        : (0 as Px)
    const yTranslationExisting: Px = existingXAndYTranslationRegExpMatches
        ? (parseFloat(
              existingXAndYTranslationRegExpMatches[INDEX_OF_Y_TRANSLATION],
          ) as Px)
        : (0 as Px)

    return { xTranslationExisting, yTranslationExisting }
}

const setTransform = (
    svgElement: NodeElement<SVGElement>,
    {
        xTranslation,
        yTranslation,
        scale,
    }: { xTranslation?: Px; yTranslation?: Px; scale?: Scaler },
): void => {
    const { xTranslationExisting, yTranslationExisting } =
        computeExistingTranslation(svgElement)
    const existingScale: Scaler = computeExistingScale(svgElement)

    const xTranslationToApply: Px = isUndefined(xTranslation)
        ? xTranslationExisting
        : xTranslation
    const yTranslationToApply: Px = isUndefined(yTranslation)
        ? yTranslationExisting
        : yTranslation
    const scaleToApply: Scaler = isUndefined(scale) ? existingScale : scale

    svgElement.setAttribute(
        "transform",
        `translate(${xTranslationToApply} ${yTranslationToApply}) scale(${scaleToApply})`,
    )
}

const furtherTransform = (
    svgElement: NodeElement<SVGElement>,
    {
        xTranslation,
        yTranslation,
        scale,
    }: { xTranslation?: Px; yTranslation?: Px; scale?: Scaler },
): void => {
    const { xTranslationExisting, yTranslationExisting } =
        computeExistingTranslation(svgElement)
    const existingScale: Scaler = computeExistingScale(svgElement)

    const xTranslationToApply: Px = isUndefined(xTranslation)
        ? xTranslationExisting
        : ((xTranslationExisting + xTranslation) as Px)
    const yTranslationToApply: Px = isUndefined(yTranslation)
        ? yTranslationExisting
        : ((yTranslationExisting + yTranslation) as Px)
    const scaleToApply: Scaler = isUndefined(scale)
        ? existingScale
        : ((existingScale * scale) as Scaler)

    svgElement.setAttribute(
        "transform",
        `translate(${xTranslationToApply} ${yTranslationToApply}) scale(${scaleToApply})`,
    )
}

const roundTransform = (svgElement: NodeElement<SVGElement>) => {
    const {
        xTranslationExisting,
        yTranslationExisting,
    }: { xTranslationExisting: Px; yTranslationExisting: Px } =
        computeExistingTranslation(svgElement)

    const xTranslation: Px = round(xTranslationExisting)
    const yTranslation: Px = round(yTranslationExisting)

    setTransform(svgElement, { xTranslation, yTranslation })
}

export {
    setTransform,
    computeExistingTranslation,
    furtherTransform,
    roundTransform,
}
