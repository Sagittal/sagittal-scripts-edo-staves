import { Document } from "@xmldom/xmldom"
import { Count, HexColor, Index, Io, Px, Sentence } from "@sagittal/general"
import {
    computeFifthStep,
    computeLimmaStep,
    computeSharpStep,
    computeWholeToneStep,
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoName,
    EdoStep,
    Flavor,
    isSubsetNotation,
    parseEdoName,
} from "@sagittal/system"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_FONT_SIZE_FOR_SHARP_IN_STEPS,
    LIMMA_AND_SHARP_Y_OFFSET,
    OPEN_SANS_REGULAR_FONT_FILE,
    OPEN_SANS_SEMIBOLD_FONT_FILE,
    SHARP_SYMBOL_Y_OFFSET,
    SHARP_TEXT_Y_OFFSET,
    STEP_FONT_SIZE,
    TILE_SIZE,
    WHOLE_TONE_X_OFFSET,
    FIFTH_X_ADDITIONAL_OFFSET,
    WHOLE_TONE_AND_FIFTH_Y_ADDITIONAL_OFFSET,
} from "../constants"
import { addText, textsToSvgGroupElement } from "../text"
import { Font, Justification, NodeElement } from "../types"
import { computeInputSentenceUnicode } from "staff-code"
import { getGroupWidth } from "../width"
import { computeTileRowCountScaleFactor } from "./rowCount"

const LIMMA_COLOR: HexColor = "#769200" as HexColor
const WHOLE_TONE_COLOR: HexColor = "#C00000" as HexColor
const SHARP_COLOR: HexColor = "#0070C0" as HexColor

const equalsPositiveOrLessThanZero = (step: EdoStep): Io =>
    step < 0 ? "<0" : `=${step}`

const addWholeTone = async (
    tileWrapperGroupElement: NodeElement<SVGGElement>,
    {
        edo,
        fifthStep,
        tileRowCountScaleFactor,
    }: { edo: Edo; fifthStep: EdoStep; tileRowCountScaleFactor: number },
): Promise<void> => {
    const wholeToneStep: EdoStep = computeWholeToneStep(edo, fifthStep)

    await addText(
        tileWrapperGroupElement,
        `CD${equalsPositiveOrLessThanZero(wholeToneStep)}`,
        {
            fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
            fontSize: STEP_FONT_SIZE,
            xOffset: WHOLE_TONE_X_OFFSET,
            yOffset: (WHOLE_TONE_AND_FIFTH_Y_ADDITIONAL_OFFSET +
                (TILE_SIZE / 2) * tileRowCountScaleFactor) as Px,
            color: WHOLE_TONE_COLOR,
            justification: Justification.RIGHT,
        },
    )
}

const addLimma = async (
    tileWrapperGroupElement: NodeElement<SVGGElement>,
    {
        edo,
        fifthStep,
        tileRowCountScaleFactor,
    }: { edo: Edo; fifthStep: EdoStep; tileRowCountScaleFactor: number },
): Promise<void> => {
    const limmaStep: EdoStep = computeLimmaStep(edo, fifthStep)

    await addText(
        tileWrapperGroupElement,
        `EF${equalsPositiveOrLessThanZero(limmaStep)}`,
        {
            fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
            fontSize: STEP_FONT_SIZE,
            xOffset: 0 as Px,
            yOffset: (TILE_SIZE * tileRowCountScaleFactor +
                LIMMA_AND_SHARP_Y_OFFSET) as Px,
            color: LIMMA_COLOR,
            justification: Justification.CENTER,
        },
    )
}

const addSharp = async (
    tileWrapperGroupElement: NodeElement<SVGGElement>,
    {
        edo,
        fifthStep,
        svgDocument,
        flavor,
        tileRowCountScaleFactor,
    }: {
        edo: Edo
        fifthStep: EdoStep
        svgDocument: Document
        flavor: Flavor
        tileRowCountScaleFactor: number
    },
): Promise<void> => {
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)

    const texts: Io[] = [
        computeInputSentenceUnicode(
            (flavor === Flavor.REVO ? "/||\\;" : "#;") as Io & Sentence,
        ),
        equalsPositiveOrLessThanZero(sharpStep),
    ]
    const fonts: Font[] = [
        {
            fontFile: BRAVURA_TEXT_SC_FONT_FILE,
            fontSize: BRAVURA_TEXT_SC_FONT_SIZE_FOR_SHARP_IN_STEPS as Px,
        },
        {
            fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
            fontSize: STEP_FONT_SIZE,
        },
    ]
    const fontIndices: Index<Font>[] = [0, 1] as Index<Font>[]
    const additionalYOffsets: Px[] = [
        SHARP_SYMBOL_Y_OFFSET,
        SHARP_TEXT_Y_OFFSET,
    ] as Px[]
    const sharpStepGroupElement: NodeElement<SVGGElement> =
        await textsToSvgGroupElement(
            svgDocument,
            texts,
            fonts,
            fontIndices,
            additionalYOffsets,
        )

    sharpStepGroupElement.setAttribute("fill", SHARP_COLOR)

    const groupWidth = getGroupWidth(sharpStepGroupElement)
    sharpStepGroupElement.setAttribute(
        "transform",
        `translate(${TILE_SIZE * tileRowCountScaleFactor - groupWidth / 2} ${
            TILE_SIZE * tileRowCountScaleFactor + LIMMA_AND_SHARP_Y_OFFSET
        })`,
    )

    tileWrapperGroupElement.appendChild(sharpStepGroupElement)
}

const addFifth = async (
    tileWrapperGroupElement: NodeElement<SVGGElement>,
    {
        fifthStep,
        tileRowCountScaleFactor,
    }: { fifthStep: EdoStep; tileRowCountScaleFactor: number },
): Promise<void> => {
    await addText(
        tileWrapperGroupElement,
        `CG${equalsPositiveOrLessThanZero(fifthStep)}`,
        {
            fontFile: OPEN_SANS_REGULAR_FONT_FILE,
            fontSize: STEP_FONT_SIZE,
            xOffset: (FIFTH_X_ADDITIONAL_OFFSET +
                TILE_SIZE * tileRowCountScaleFactor) as Px,
            yOffset: (WHOLE_TONE_AND_FIFTH_Y_ADDITIONAL_OFFSET +
                (TILE_SIZE / 2) * tileRowCountScaleFactor) as Px,
            justification: Justification.LEFT,
        },
    )
}

const addSteps = async (
    svgDocument: Document,
    {
        edoName,
        tileWrapperGroupElement,
        flavor,
        tileRowCount,
    }: {
        edoName: EdoName
        tileWrapperGroupElement: NodeElement<SVGGElement>
        flavor: Flavor
        tileRowCount: Count
    },
): Promise<void> => {
    if (isSubsetNotation(EDO_NOTATION_DEFINITIONS[edoName])) return

    const fifthStep: EdoStep = computeFifthStep(edoName)
    const edo: Edo = parseEdoName(edoName).edo
    const tileRowCountScaleFactor: number =
        computeTileRowCountScaleFactor(tileRowCount)

    await addFifth(tileWrapperGroupElement, {
        fifthStep,
        tileRowCountScaleFactor,
    })
    await addWholeTone(tileWrapperGroupElement, {
        edo,
        fifthStep,
        tileRowCountScaleFactor,
    })
    await addLimma(tileWrapperGroupElement, {
        edo,
        fifthStep,
        tileRowCountScaleFactor,
    })
    await addSharp(tileWrapperGroupElement, {
        edo,
        fifthStep,
        svgDocument,
        flavor,
        tileRowCountScaleFactor,
    })
}

export { addSteps }
