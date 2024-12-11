import { addVectors, APOTOME, Comma, deepEquals, invertVector, Name, ScaledVector } from "@sagittal/general"
import {
    CommaClass,
    computeCommaName,
    computeSymbolClassIdAndSectionFromSagittal,
    DirectedWord,
    getCommaClass,
    parseSagitype,
    Sagittal,
    Sagitype,
    SECTION_P1T,
    SYMBOL_CLASSES,
    SymbolClass,
} from "@sagittal/system"

// TODO: shouldn't this just compute the comma since we need that too, and elsewhere get the name when need be?
const computePrimaryCommaName = (sagitype: Sagitype): Name<Comma> => {
    const sagittal: Sagittal = parseSagitype(sagitype)
    const [symbolClassId, section] = computeSymbolClassIdAndSectionFromSagittal(sagittal)
    const { commaClassId }: SymbolClass = SYMBOL_CLASSES[symbolClassId]
    const { pitch }: CommaClass = getCommaClass(commaClassId)

    const primaryComma: Comma = deepEquals(section, SECTION_P1T)
        ? ({ vector: addVectors(APOTOME.vector, invertVector(pitch.vector)) } as ScaledVector as Comma)
        : pitch

    const primaryCommaName: Name<Comma> = computeCommaName(primaryComma, { directedWord: DirectedWord.NEVER })

    return primaryCommaName
}

export { computePrimaryCommaName }
