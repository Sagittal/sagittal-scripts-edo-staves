import { Document } from "@xmldom/xmldom"
import { HexColor, Index, Io, Px, Sentence } from "@sagittal/general"
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
    WHOLE_TONE_Y_OFFSET,
} from "../constants"
import { addText, textsToSvgGroupElement } from "../text"
import { Font, Justification, NodeElement } from "../types"
import { computeInputSentenceUnicode } from "staff-code"
import { getGroupWidth } from "../width"

const LIMMA_COLOR: HexColor = "#769200" as HexColor
const WHOLE_TONE_COLOR: HexColor = "#C00000" as HexColor
const SHARP_COLOR: HexColor = "#0070C0" as HexColor

const equalsPositiveOrLessThanZero = (step: EdoStep): Io =>
    step < 0 ? "<0" : `=${step}`

const addWholeTone = async (
    tileGroupElement: NodeElement<SVGGElement>,
    { edo, fifthStep }: { edo: Edo; fifthStep: EdoStep },
): Promise<void> => {
    const wholeToneStep: EdoStep = computeWholeToneStep(edo, fifthStep)

    await addText(
        tileGroupElement,
        `CD${equalsPositiveOrLessThanZero(wholeToneStep)}`,
        {
            fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
            fontSize: STEP_FONT_SIZE,
            xOffset: WHOLE_TONE_X_OFFSET,
            yOffset: WHOLE_TONE_Y_OFFSET,
            color: WHOLE_TONE_COLOR,
            justification: Justification.RIGHT,
        },
    )
}

const addLimma = async (
    tileGroupElement: NodeElement<SVGGElement>,
    { edo, fifthStep }: { edo: Edo; fifthStep: EdoStep },
): Promise<void> => {
    const limmaStep: EdoStep = computeLimmaStep(edo, fifthStep)

    await addText(
        tileGroupElement,
        `EF${equalsPositiveOrLessThanZero(limmaStep)}`,
        {
            fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
            fontSize: STEP_FONT_SIZE,
            xOffset: 0 as Px,
            yOffset: (TILE_SIZE + LIMMA_AND_SHARP_Y_OFFSET) as Px,
            color: LIMMA_COLOR,
            justification: Justification.CENTER,
        },
    )
}

const addSharp = async (
    tileGroupElement: NodeElement<SVGGElement>,
    {
        edo,
        fifthStep,
        svgDocument,
        flavor,
    }: { edo: Edo; fifthStep: EdoStep; svgDocument: Document; flavor: Flavor },
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
        `translate(${TILE_SIZE - groupWidth / 2} ${
            TILE_SIZE + LIMMA_AND_SHARP_Y_OFFSET
        })`,
    )

    tileGroupElement.appendChild(sharpStepGroupElement)
}

const addFifth = async (
    tileGroupElement: NodeElement<SVGGElement>,
    { fifthStep }: { fifthStep: EdoStep },
): Promise<void> => {
    await addText(
        tileGroupElement,
        `CG${equalsPositiveOrLessThanZero(fifthStep)}`,
        {
            fontFile: OPEN_SANS_REGULAR_FONT_FILE,
            fontSize: STEP_FONT_SIZE,
            // xOffset: (TILE_SIZE / 2) as Px,
            // yOffset: -27 as Px,
            xOffset: TILE_SIZE + 24 as Px,
            yOffset: WHOLE_TONE_Y_OFFSET, // TODO: rename if this works, and clean up above
            justification: Justification.CENTER,
        },
    )
}

const addSteps = async (
    tileGroupElement: NodeElement<SVGGElement>,
    {
        edoName,
        svgDocument,
        flavor,
    }: { edoName: EdoName; svgDocument: Document; flavor: Flavor },
): Promise<void> => {
    if (isSubsetNotation(EDO_NOTATION_DEFINITIONS[edoName])) return

    const fifthStep: EdoStep = computeFifthStep(edoName)
    const edo: Edo = parseEdoName(edoName).edo

    await addFifth(tileGroupElement, { fifthStep })
    await addWholeTone(tileGroupElement, { edo, fifthStep })
    await addLimma(tileGroupElement, { edo, fifthStep })
    await addSharp(tileGroupElement, { edo, fifthStep, svgDocument, flavor })
}

export { addSteps }
