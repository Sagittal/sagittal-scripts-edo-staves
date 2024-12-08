import {
    addVectors,
    APOTOME,
    Comma,
    deepEquals,
    invertVector,
    isUndefined,
    Maybe,
    Name,
    ScaledVector,
} from "@sagittal/general"
import {
    CommaClass,
    computeSymbolClassIdAndSectionFromSagittal,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationDefinition,
    getCommaClass,
    isSubsetNotation,
    parseSagitype,
    Sagittal,
    Sagitype,
    StepDefinition,
    SYMBOL_CLASSES,
    SymbolClass,
    SECTION_P1T,
    computeCommaName,
} from "@sagittal/system"

type CommaSection = { primaryCommaName?: Name<Comma> }

const computePrimaryComma = (sagitype: Sagitype): Name<Comma> => {
    const sagittal: Sagittal = parseSagitype(sagitype)
    const [symbolClassId, section] = computeSymbolClassIdAndSectionFromSagittal(sagittal)
    const { commaClassId }: SymbolClass = SYMBOL_CLASSES[symbolClassId]
    const { pitch }: CommaClass = getCommaClass(commaClassId)

    const primaryComma: Comma = deepEquals(section, SECTION_P1T)
        ? ({ vector: addVectors(APOTOME.vector, invertVector(pitch.vector)) } as ScaledVector as Comma)
        : pitch

    const primaryCommaName: Name<Comma> = computeCommaName(primaryComma)

    return primaryCommaName
}

const commaSections: Record<Name<Comma>, CommaSection> = Object.values(EDO_NOTATION_DEFINITIONS).reduce(
    (
        commaSections: Record<Name<Comma>, CommaSection>,
        edoNotationDefinition: EdoNotationDefinition,
    ): Record<Name<Comma>, CommaSection> => {
        if (isSubsetNotation(edoNotationDefinition)) return commaSections

        const { stepDefinitions } = edoNotationDefinition
        stepDefinitions.forEach((stepDefinition: StepDefinition): void => {
            const { sagitype, validCommas } = stepDefinition
            if (isUndefined(validCommas)) return

            validCommas.forEach((maybeCommaName: Maybe<Name<Comma>>, commaIndex: number): void => {
                if (isUndefined(maybeCommaName)) return

                if (commaIndex === 0) {
                    commaSections[maybeCommaName] = {}
                } else {
                    commaSections[maybeCommaName] = { primaryCommaName: computePrimaryComma(sagitype) }
                }
            })
        })

        return commaSections
    },
    {} as Record<Name<Comma>, CommaSection>,
)

console.log(commaSections)
