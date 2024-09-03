import { computeRange, Io, Sentence } from "@sagittal/general"
import {
    Flavor,
    Sagittal,
    Sagitype,
    EdoStepNotation,
    Edo,
    EdoStep,
    EdoNotationDefinition,
    Nominal,
    computeFifthStep,
    computeSharpStep,
    EDO_NOTATION_DEFINITIONS,
    computeSagittals,
    isSubsetNotation,
    computeSubsetSagitypes,
    computeSubsetEdoStepNotations
} from "@sagittal/system"
import { computeEdoStepNotations } from "./edoStepNotations"
import { resolveEdoStepNotationsToIntermediateStringFormsOfActualFinalVisualNotation } from "./resolve"
import { assembleAsStaffCodeInputSentence } from "./staffCode"
import { computeCodeWordWidth } from "staff-code"

const computeSagitypes = (edoNotationDefinition: EdoNotationDefinition): Sagitype[] =>
    isSubsetNotation(edoNotationDefinition) ?
        computeSubsetSagitypes(edoNotationDefinition) :
        edoNotationDefinition.sagitypes

const computeStaffCodeInputSentence = (inputEdo: Edo, flavor: Flavor, { root }: { root: Nominal } = { root: Nominal.C }): Io & Sentence => {
    const edoNotationDefinition: EdoNotationDefinition = EDO_NOTATION_DEFINITIONS[inputEdo]
    const sagitypes: Sagitype[] = computeSagitypes(edoNotationDefinition)
    const edo: Edo = isSubsetNotation(edoNotationDefinition) ? edoNotationDefinition.supersetEdo : inputEdo
    const fifthStep: EdoStep = computeFifthStep(edo)
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals({ sagitypes, flavor, sharpStep })

    let edoStepNotations: EdoStepNotation[] = computeEdoStepNotations({ edo, fifthStep, sagittals, flavor, root })
    if (isSubsetNotation(edoNotationDefinition)) edoStepNotations = computeSubsetEdoStepNotations({ edo, subsetEdo: inputEdo, edoStepNotations })

    const intermediateStringForms = resolveEdoStepNotationsToIntermediateStringFormsOfActualFinalVisualNotation(edoStepNotations, { sagittals, flavor })

    // TODO: here is where we'd:
    // - compute which alignment pattern this EDO will use
    // - arrange the intermediate stringform into an array of arrays according to it
    // - for each column, determine the max width
    // - then modify the `assemble...` function below to take this width and staff breaks into account
    // and then possibly in resolveEdoStepNotationsToIntermediateStringFormsOfActualFinalVisualNotation also possibly 
    // handle the c4 vs c5 stuff, so that everything there is actually at least a staffcode Word. 
    // but then the sagitype string would actually need to be a list thereof, and accents be handled there too. 
    // and maybe it is better that nominal is left as a Nominal so the next layer can determine whether a nominal staffcode word is required...

    const subsetFactor = edo / inputEdo

    const wholeStep = 2 * fifthStep % edo
    const limmaStep = (wholeStep + edo - sharpStep) % edo
    const THING = [
        { whole: 1, limma: 0 }, // large
        { whole: 1, limma: 1 }, // medium-large
        { whole: 2, limma: 1 }, // medium-medium
        { whole: 3, limma: 1 }, // medium-small
        { whole: 5, limma: 2 }, // small
    ]
    const MAX = 18
    const THING_TYPES = ["large", "large-medium", "medium-medium", "small-medium", "small"]

    let chosenThingIndex = 0
    THING.forEach((thing, thingIndex) => {
        // TODO: probably need to redo how/when subset notations are taken, 
        // like compute this w / r / t to the superset and wait to drop half until the end, 
        // and leave lots of awkward blanks I guess so it actually look slike the 2n or 3n edo 
        // but with notes deleted from it like a checkerboard if the first row is odd or whatever
        if ((thing.whole * wholeStep + thing.limma * limmaStep) / subsetFactor <= MAX) {
            chosenThingIndex = thingIndex
        }
    })

    const PATTERNS = [
        [
            1 * wholeStep + 0 * limmaStep,
            1 * wholeStep + 0 * limmaStep,
            0 * wholeStep + 1 * limmaStep,
            1 * wholeStep + 0 * limmaStep,
            1 * wholeStep + 0 * limmaStep,
            1 * wholeStep + 0 * limmaStep,
            0 * wholeStep + 1 * limmaStep,
        ],

        [
            1 * wholeStep + 0 * limmaStep,
            1 * wholeStep + 1 * limmaStep,
            1 * wholeStep + 0 * limmaStep,
            1 * wholeStep + 0 * limmaStep,
            1 * wholeStep + 1 * limmaStep,
        ],
        [
            2 * wholeStep + 1 * limmaStep,
            1 * wholeStep,
            2 * wholeStep + 1 * limmaStep,
        ],

        [
            3 * wholeStep + 1 * limmaStep,
            2 * wholeStep + 1 * limmaStep,
        ],
        [
            5 * wholeStep + 2 * limmaStep,
        ],
    ]

    const pattern = PATTERNS[chosenThingIndex]
    // console.log("pattern: ", pattern)
    const output = [[]]
    let i = 0
    let patternI = 0
    intermediateStringForms.forEach(intermediateStringForm => {
        output[patternI].push(intermediateStringForm)
        i++
        if (i == pattern[patternI]) {
            patternI++
            output[patternI] = []
            i = 0
        }
    })
    // console.log(output)

    const maxLineLength = Math.max(...output.map(line => line.length))
    const colWidths = computeRange(maxLineLength).map(colIndex => {
        // console.log("col index ", colIndex)
        return output.reduce(
            (acc, line) => {
                if (!line[colIndex]) return acc
                const { whorlString, sagitypeString } = line[colIndex]
                const whorlWidth = whorlString ? computeCodeWordWidth(whorlString) : 0
                const sagitypeWidth = sagitypeString ? computeCodeWordWidth(sagitypeString) : 0 // TODO: handle accents; maybe just need to move handleDiacritics here sooner?
                return Math.max(acc, whorlWidth + sagitypeWidth)
            },
            0)
    })

    // console.log(colWidths)


    return assembleAsStaffCodeInputSentence(intermediateStringForms, { root, colWidths, pattern })
}

export {
    computeStaffCodeInputSentence,
}
