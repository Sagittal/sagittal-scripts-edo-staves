import { APOTOME, Cents, computeRange, Decimal, Ed, Filename, Io, Sentence, textToSvg } from "@sagittal/general"
import { Flavor, SymbolClassId, Accidental, HeadId, Sagitype, computeAccidentalSagitype, parseSagitype, Compatible } from "@sagittal/system"
import { computeSagittalFromSymbolClassId } from "../../../../system/src/accidental"
import { computeSymbolClassIdAndSectionFromSagittal } from "../../../../system/src/accidental/pitch/symbolClassIdAndSectionFromSagittal"
import { computeRevoAccidentalFromCaptureZone } from "../../../../system/src/accidental/flavor/revo"
import * as fs from "fs"
import { computeInputSentenceUnicode } from "staff-code"

const font = "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextSC.otf" as Filename

interface Edo {
    sagittals: Sagitype[],
    n: number
}

interface StepNotation {
    linkIndex: Decimal<{ integer: true }> // 35 possibilities, -17 to 17, for FCGDAEB flanked by sharps and flats and doubles thereof
    sagittalIndex: Decimal<{ integer: true }> // 0 is none, 1 is the first sagittal in the sequence
}

// for convenience, these values are the ones used by StaffCode
enum Apotome {
    DOUBLE_SHARP = "x",
    SHARP = "#",
    NATURAL = " ",
    FLAT = "b",
    DOUBLE_FLAT = "B"
}

enum Nominal {
    F = "f",
    C = "c",
    G = "g",
    D = "d",
    A = "a",
    E = "e",
    B = "b"
}

const LINKS: Link[] = Object.values(Apotome).map(apotome => {
    return Object.values(Nominal).map(nominal => ({
        apotome, nominal
    }))
}).flat()
// console.log(LINKS)

interface Link {
    nominal: Nominal,
    apotome: Apotome
}

const notation: StepNotation[][] = []

const updateNotation = (step: Decimal<{ integer: true }>, stepNotation: StepNotation) => {
    if (notation[step] == null) notation[step] = []
    notation[step].push(stepNotation)
}

const getNegativeSagittal = (sagitype: Sagitype): Sagitype => {
    // console.log("need to flip: ", sagitype)
    const accidental: Accidental = parseSagitype(sagitype)
    accidental.down = true

    // const sagittal = computeAccidental({headId: HeadId.ARC_AND_BOATHOOK, down: true})
    // console.log(sagittal)
    const result = computeAccidentalSagitype(accidental)
    // console.log("flipped: ", result)
    return result
    // console.log(parseSagitype("\\!/" as Sagitype))
}

const getSagittal = (edo: Edo, sagittalIndex: Decimal<{ integer: true }>): Sagitype => {
    if (sagittalIndex == 0) return "" as Sagitype
    else if (sagittalIndex > 0) return edo.sagittals[sagittalIndex - 1]
    // console.log('what')

    return getNegativeSagittal(edo.sagittals[-sagittalIndex - 1])
}

const getRevoSagittal = (edo: Edo, sagittalIndex: Decimal<{ integer: true }>, apotome: Apotome): Sagitype => {
    if (sagittalIndex == 0) return apotome as Sagitype
    else if (sagittalIndex > 0) {
        const accidental: Accidental = parseSagitype(edo.sagittals[sagittalIndex - 1])
        if (apotome != Apotome.NATURAL) accidental.compatible = COMPATIBLE_FOR_APOTOME[apotome]
        // convert to Revo!
        console.log(accidental)
        const [symbolClassId, section] = computeSymbolClassIdAndSectionFromSagittal(accidental)
        const revo = computeRevoAccidentalFromCaptureZone(symbolClassId, section)
        console.log("REVO!!!! ", revo)

        return computeAccidentalSagitype(revo)
    }

    const accidental: Accidental = parseSagitype(edo.sagittals[-sagittalIndex - 1])
    accidental.down = true
    if (apotome != Apotome.NATURAL) accidental.compatible = COMPATIBLE_FOR_APOTOME[apotome]
    // convert to Revo!
    return computeAccidentalSagitype(accidental)
}

const COMPATIBLE_FOR_APOTOME = {
    [Apotome.DOUBLE_SHARP]: Compatible.DOUBLE_SHARP,
    [Apotome.SHARP]: Compatible.SHARP,
    [Apotome.NATURAL]: Compatible.NATURAL,
    [Apotome.FLAT]: Compatible.FLAT,
    [Apotome.DOUBLE_FLAT]: Compatible.DOUBLE_FLAT
}

const computeTrueSagittalIndex = ({ sagittalIndex, linkIndex }: StepNotation, edo: Edo) => {
    let trueSagitalIndex: Decimal<{ integer: true }> = sagittalIndex as Decimal<{ integer: true }>
    const stepsToApotome: Decimal<{ integer: true }> = edo.sagittals.length as Decimal<{ integer: true }>
    if (trueSagitalIndex <= 0) {
        if (linkIndex > 3 || linkIndex < -3) trueSagitalIndex = trueSagitalIndex - stepsToApotome as Decimal<{ integer: true }>
        if (linkIndex > 10 || linkIndex < -10) trueSagitalIndex = trueSagitalIndex - stepsToApotome as Decimal<{ integer: true }>
    } else {
        if (linkIndex > 3 || linkIndex < -3) trueSagitalIndex = trueSagitalIndex + stepsToApotome as Decimal<{ integer: true }>
        if (linkIndex > 10 || linkIndex < -10) trueSagitalIndex = trueSagitalIndex + stepsToApotome as Decimal<{ integer: true }>
    }

    return trueSagitalIndex
}

const computeNotation = (edo: Edo, flavor: Flavor) => {
    const stepSize: Cents = 1200 / edo.n as Cents
    const stepSizes: Cents[] = computeRange(edo.n as Decimal<{ integer: true }>).map(step => step * stepSize as Cents)

    const JI_FIFTH_SIZE: Cents = 701.955000865 as Cents

    let bestFifthError: Cents = 1200 as Cents
    let bestFifthStep: Decimal<{ integer: true }> = edo.n as Decimal<{ integer: true }>
    stepSizes.forEach((stepSize: Cents, index) => {
        const fifthError: Cents = Math.abs(JI_FIFTH_SIZE - stepSize) as Cents
        if (fifthError < bestFifthError) {
            bestFifthError = fifthError
            bestFifthStep = index as Decimal<{ integer: true }>
        }
    })

    const fifthStep: Decimal<{ integer: true }> = bestFifthStep
    // console.log("fifth step: ", fifthStep)

    const cBasedNominalRange = computeRange(-15 as Decimal<{ integer: true }>, 20 as Decimal<{ integer: true }>)
    // console.log("c-based nominal range: ", cBasedNominalRange)
    const nominalSteps = cBasedNominalRange
        .map(linkIndex => linkIndex * fifthStep % edo.n)
        .map(nominalStep => nominalStep < 0 ? nominalStep + edo.n : nominalStep)
    // console.log("nominal steps: ", nominalSteps)

    nominalSteps.forEach((nominalStep, fDoubleFlatBasedNominalIndex) => {
        const dBasedNominalIndex: Decimal<{ integer: true }> = fDoubleFlatBasedNominalIndex - 17 as Decimal<{ integer: true }>;

        updateNotation(
            nominalStep as Decimal<{ integer: true }>,
            { linkIndex: dBasedNominalIndex, sagittalIndex: 0 as Decimal<{ integer: true }> }
        )

        computeRange(edo.sagittals.length as Decimal<{ integer: true }>)
            .map(sagittalIndex => sagittalIndex + 1 as Decimal<{ integer: true }>)
            .forEach((sagittalIndex: Decimal<{ integer: true }>) => {
                const step = (nominalStep + sagittalIndex) % edo.n as Decimal<{ integer: true }>
                updateNotation(
                    step,
                    { linkIndex: dBasedNominalIndex, sagittalIndex }
                )
            })

        computeRange(edo.sagittals.length as Decimal<{ integer: true }>)
            .map(sagittalIndex => sagittalIndex + 1 as Decimal<{ integer: true }>)
            .forEach((sagittalIndex: Decimal<{ integer: true }>) => {
                const step = sagittalIndex > nominalStep ?
                    edo.n - sagittalIndex as Decimal<{ integer: true }> :
                    nominalStep - sagittalIndex as Decimal<{ integer: true }>
                updateNotation(
                    step,
                    {
                        linkIndex: dBasedNominalIndex,
                        sagittalIndex: -sagittalIndex as Decimal<{ integer: true }>
                    }
                )
            })
    })

    // console.log("notation: ", notation)

    const finalNotation: StepNotation[] = notation.map((stepNotations: StepNotation[]): StepNotation => {
        // if only 1 step notation, take it
        // if not, then take the one with lowest abs value sagittal index
        // if tied, take the positive one
        // if more than one positive one, then take the nominal with the lowest abs val index
        // console.log("\nstepNotations: ", stepNotations)
        const result = stepNotations.reduce((selected, current) => {
            const currentSagittalIndex = computeTrueSagittalIndex(current, edo)
            const selectedSagittalIndex = computeTrueSagittalIndex(selected, edo)
            // console.log("selected notation: ", selected)
            // console.log("current notation: ", current)
            // console.log("selected 'true' sag index: ", selectedSagittalIndex, "current 'true' sag index: ", currentSagittalIndex)

            if (Math.abs(currentSagittalIndex) < Math.abs(selectedSagittalIndex)) {
                return current;
            } else if (Math.abs(currentSagittalIndex) > Math.abs(selectedSagittalIndex)) {
                return selected;
            } else {
                if (currentSagittalIndex > selectedSagittalIndex) {
                    return current;
                } else if (currentSagittalIndex < selectedSagittalIndex) {
                    return selected;
                } else {
                    if (Math.abs(current.linkIndex) < Math.abs(selected.linkIndex)) {
                        return current;
                    } else {
                        return selected;
                    }
                }
            }
        });
        // console.log("result notation: ", result, "\n")
        return result
    })
    // console.log("final notation: ", finalNotation)

    const stringNotation: string[] = finalNotation.map(({ linkIndex, sagittalIndex }: StepNotation): string => {
        const link: Link = LINKS[linkIndex + 17]
        // console.log("link.nominal: ", link.nominal)
        // console.log("link.apotome: ", link.apotome)
        if (flavor == Flavor.EVO) {
            return `${link.nominal}${link.apotome}${getSagittal(edo, sagittalIndex)}`
        } else {
            return `${link.nominal} ${getRevoSagittal(edo, sagittalIndex, link.apotome)}`
        }
    })
    // console.log("string notation: ", stringNotation)

    let output = "ston \n5; Gcl ; 5; \nc4 5; "
    let currentNominal = "c"
    let noteCount = 0
    let newlineTracker = 27
    stringNotation.forEach(stepStringNotation => {
        const nominal = stepStringNotation[0]
        if (nominal != currentNominal) {
            currentNominal = nominal
            let octave = currentNominal == "c" ? 5 : 4
            output += `\n9; en; bl \n`
            if (noteCount > newlineTracker && nominal != "c") {
                newlineTracker += 20
                output += "nl;\n5; Gcl ; 5; "
            } else {
                output += "; 5; "
            }
            output += `${nominal}${octave} `
        }

        if (stepStringNotation.length > 2) {
            const sagittal = stepStringNotation.slice(2)
            output += `5; ${sagittal} ; `
        } else {
            output += "9; "
        }

        if (stepStringNotation[1] == "#") output += "# ; "
        if (stepStringNotation[1] == "x") output += ".x ; "
        if (stepStringNotation[1] == "b") output += "b ; "
        if (stepStringNotation[1] == "B") output += "bb ; "

        output += "nt ; "
        noteCount++
    })
    if (currentNominal != "c") output += "9; bl ;\nc5 "
    output += "9; nt ;\n3; en; bl\nnl;"

    return output
}

const evo5: Edo = { sagittals: [], n: 5 }
const evo12: Edo = { sagittals: [], n: 12 }
const evo15: Edo = { sagittals: ["/|"] as Sagitype[], n: 15 }
const evo31: Edo = { sagittals: ["/|\\"] as Sagitype[], n: 31 }
const evo72: Edo = { sagittals: ["/|", "|)", "/|\\"] as Sagitype[], n: 72 }
const revo72: Edo = { sagittals: ["/|", "|)", "/|\\", "||)", "||\\", "/||\\"] as Sagitype[], n: 72 }

const inputSentence = computeNotation(evo72, Flavor.REVO)
// console.log("\ninput sentence:\n")
// console.log(inputSentence)

const unicodeSentence = computeInputSentenceUnicode(inputSentence as Io & Sentence)

const asyncGenerateEdoStaves = async (): Promise<void> => {
    const svgString = await textToSvg(unicodeSentence, { font })
    fs.writeFileSync("dist/edoStaves.svg", svgString)
}

asyncGenerateEdoStaves().then()
