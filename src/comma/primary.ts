import { addVectors, APOTOME, Comma, deepEquals, invertVector, ScaledVector } from "@sagittal/general"
import {
    CommaClass,
    computeSymbolClassIdAndSectionFromSagittal,
    getCommaClass,
    parseSagitype,
    Sagittal,
    Sagitype,
    SECTION_P1T,
    SYMBOL_CLASSES,
    SymbolClass,
} from "@sagittal/system"

const computePrimaryComma = (sagitype: Sagitype): Comma => {
    const sagittal: Sagittal = parseSagitype(sagitype)
    const [symbolClassId, section] = computeSymbolClassIdAndSectionFromSagittal(sagittal)
    const { commaClassId }: SymbolClass = SYMBOL_CLASSES[symbolClassId]
    const { pitch }: CommaClass = getCommaClass(commaClassId)

    return deepEquals(section, SECTION_P1T)
        ? ({ vector: addVectors(APOTOME.vector, invertVector(pitch.vector)) } as ScaledVector as Comma)
        : pitch
}

export { computePrimaryComma }
