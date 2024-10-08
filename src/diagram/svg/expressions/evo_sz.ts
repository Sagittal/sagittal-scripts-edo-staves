import { Index, Io } from "@sagittal/general"
import {
    computeFifthStep,
    computeSharpStep,
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    EdoNotationDefinition,
    EdoStep,
    isSubsetNotation,
    parseEdoNotationName,
    Sagitype,
} from "@sagittal/system"
import { computeIsSagittalSemisharpTheHalfApotome } from "../../../halfApotome"

const SAGITTAL_SEMISHARP_SMUFL_UNICODE_MATCHER: RegExp = //g
const SZ_SEMISHARP_SMUFL_UNICODE = ""

const SAGITTAL_SEMIFLAT_SMUFL_UNICODE_MATCHER: RegExp = //g
const SZ_SEMIFLAT_SMUFL_UNICODE = ""

const handleSzForExpressions = (
    texts: Io[],
    { edoNotationName }: { edoNotationName: EdoNotationName },
): void => {
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edoNotationName]
    if (isSubsetNotation(edoNotationDefinition)) return

    const sagitypes: Sagitype[] = edoNotationDefinition.sagitypes
    const edo: Edo = parseEdoNotationName(edoNotationName).edo
    const fifthStep: EdoStep = computeFifthStep(edoNotationName)
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
    const sagittalSemisharpIsTheHalfApotome: boolean =
        computeIsSagittalSemisharpTheHalfApotome(sagitypes, sharpStep)
    if (!sagittalSemisharpIsTheHalfApotome) return

    for (
        let textsIndex: Index = 0 as Index;
        textsIndex < texts.length;
        textsIndex++
    ) {
        texts[textsIndex] = texts[textsIndex].replace(
            SAGITTAL_SEMISHARP_SMUFL_UNICODE_MATCHER,
            SZ_SEMISHARP_SMUFL_UNICODE,
        )
        texts[textsIndex] = texts[textsIndex].replace(
            SAGITTAL_SEMIFLAT_SMUFL_UNICODE_MATCHER,
            SZ_SEMIFLAT_SMUFL_UNICODE,
        )
    }
}

export { handleSzForExpressions }
