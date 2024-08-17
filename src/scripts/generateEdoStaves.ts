import { APOTOME, Cents, computeRange, Decimal, Ed, Filename, Io, Sentence, textToSvg, Maybe } from "@sagittal/general"
import { Flavor, SymbolClassId, Accidental, HeadId, Sagitype, computeAccidentalSagitype, parseSagitype, Compatible } from "@sagittal/system"
import { computeSagittalFromSymbolClassId } from "../../../../system/src/accidental"
import { computeSymbolClassIdAndSectionFromSagittal } from "../../../../system/src/accidental/pitch/symbolClassIdAndSectionFromSagittal"
import { computeRevoAccidentalFromCaptureZone } from "../../../../system/src/accidental/flavor/revo"
import * as fs from "fs"
import { computeInputSentenceUnicode } from "staff-code"
import { Sagittal } from "@sagittal/system/dist/cjs/accidental"
import { SECTION_N1A, SECTION_N1T, SECTION_N2A, SECTION_N2T, SECTION_P1A, SECTION_P1T, SECTION_P2A, SECTION_P2T } from "@sagittal/system/dist/cjs/notation/sections"
import { apotomeShift } from "../../../../system/src/accidental/sagittal"

const font = "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextSC.otf" as Filename

interface Edo {
    sagitypes: Sagitype[],
    // revo: Sagitype[],
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

const ONLY_NOMINALS: Nominal[] = Object.values(Nominal)

interface Link {
    nominal: Nominal,
    apotome: Apotome
}

const notation: StepNotation[][] = []

const updateNotation = (step: Decimal<{ integer: true }>, stepNotation: StepNotation) => {
    if (notation[step] == null) notation[step] = []
    notation[step].push(stepNotation)
}

// const getNegativeSagittal = (sagittal: Sagittal): Sagittal => {
//     // console.log("need to flip: ", sagitype)
//     // const accidental: Accidental = parseSagitype(sagitype)
//     // sagittal.down = true

//     // const sagittal = computeAccidental({headId: HeadId.ARC_AND_BOATHOOK, down: true})
//     // console.log(sagittal)
//     // const result = computeAccidentalSagitype(sagittal)
//     // console.log("flipped: ", result)
//     // return result
//     // console.log(parseSagitype("\\!/" as Sagitype))
//     return {...sagittal, down: true}
// }

const getSagittal = (sagittals: Sagittal[], sagittalIndex: Decimal<{ integer: true }>): Maybe<Sagittal> => {
    if (sagittalIndex > 0) return sagittals[sagittalIndex - 1]
    // console.log('what')

    else if (sagittalIndex < 0) return { ...sagittals[-sagittalIndex - 1], down: true }

    return undefined
}

const computeTrueSagittalIndex = ({ sagittalIndex, linkIndex }: StepNotation, edo: Edo) => {
    let trueSagitalIndex: Decimal<{ integer: true }> = sagittalIndex as Decimal<{ integer: true }>
    const stepsToApotome: Decimal<{ integer: true }> = edo.sagitypes.length as Decimal<{ integer: true }>
    if (trueSagitalIndex <= 0) {
        if (linkIndex > 3 || linkIndex < -3) trueSagitalIndex = trueSagitalIndex - stepsToApotome as Decimal<{ integer: true }>
        if (linkIndex > 10 || linkIndex < -10) trueSagitalIndex = trueSagitalIndex - stepsToApotome as Decimal<{ integer: true }>
    } else {
        if (linkIndex > 3 || linkIndex < -3) trueSagitalIndex = trueSagitalIndex + stepsToApotome as Decimal<{ integer: true }>
        if (linkIndex > 10 || linkIndex < -10) trueSagitalIndex = trueSagitalIndex + stepsToApotome as Decimal<{ integer: true }>
    }

    return trueSagitalIndex
}

const JI_FIFTH_SIZE: Cents = 701.955000865 as Cents


const revoSagittal = (sagitype: Sagitype/*, sagittalIndex: number, apotome: Apotom*/): Sagittal => {
    // if (sagittalIndex == 0) return apotome as Sagitype
    // else if (sagittalIndex > 0) {
        const accidental: Accidental = parseSagitype(sagitype)
    // if (apotome != Apotome.NATURAL) sagittal.compatible = COMPATIBLE_FOR_APOTOME[apotome]
    //     // convert to Revo!
    //     console.log(accidental)
    const [symbolClassId, _] = computeSymbolClassIdAndSectionFromSagittal(accidental)
    // console.log(section)
    let section
    // if (apotome == Apotome.DOUBLE_FLAT) {
    //     // if (sagittal.down) {
    //     //     section = SECTION_N2T
    //     // } else {
    //         section = SECTION_N2T
    //     // }
    // } else if (apotome == Apotome.FLAT) {
    //     if (sagittalIndex < 0) {
    //         section = SECTION_N2A
    //     } else {
    //         section = SECTION_N1T
    //     }
    // } else if (apotome == Apotome.NATURAL) {
    //     if (sagittalIndex < 0) {
    //         section = SECTION_N1A
    //     } else {
    //         section = SECTION_P1A
    //     }
    // } else if (apotome == Apotome.SHARP) {
        // if (sagittalIndex < 0) {
            section = SECTION_P1T
    //     } else {
    //         section = SECTION_P2A
    //     }
    // } else {
    //     section = SECTION_P2T
    // }

    const revo = computeRevoAccidentalFromCaptureZone(symbolClassId, section)

    return revo
    //     console.log("REVO!!!! ", revo)

    //     return computeAccidentalSagitype(revo)
    // }

    // const accidental: Accidental = parseSagitype(edo.sagitypes[-sagittalIndex - 1])
    // accidental.down = true
    // if (apotome != Apotome.NATURAL) accidental.compatible = COMPATIBLE_FOR_APOTOME[apotome]
    // // convert to Revo!
    // return computeAccidentalSagitype(accidental)
}

const shiftedSagitypes = (sagitypes: Sagitype[]) => {
    return sagitypes.map(parseSagitype).map(apotomeShift).map(computeAccidentalSagitype)
}

const computeRevoSagitypes = (edo: Edo, fifthStep: number): Sagitype[] => {
    // edo.sagitypes
    // edo.revo
    
    // determine sharpness
    const sharpStep = fifthStep * 7 % edo.n
    console.log("sharp step: ", sharpStep)
    console.log("sagitypes.lenght: ", edo.sagitypes.length)
    let sagitypes = edo.sagitypes.slice()
    let j = 0
    if (sharpStep - 2 > sagitypes.length) {
        for (let i = sharpStep - 2; i >= sagitypes.length - 2; i--) {
            const thing = revoSagittal(sagitypes[j])
            j++;
            const newthing = computeAccidentalSagitype(thing)
            console.log(i, j, sagitypes[j], newthing)

            sagitypes[i] = newthing
        }
    }
    sagitypes[sharpStep - 1] = "/||\\" as Sagitype

    sagitypes = sagitypes.concat(shiftedSagitypes(sagitypes))

    console.log("revo sagitypes: ", sagitypes)
    return sagitypes
}

const computeNotation = (edo: Edo, flavor: Flavor) => {
    const stepSize: Cents = 1200 / edo.n as Cents
    const stepSizes: Cents[] = computeRange(edo.n as Decimal<{ integer: true }>).map(step => step * stepSize as Cents)


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


    const sagitypes: Sagitype[] = flavor == Flavor.REVO ?
        computeRevoSagitypes(edo, fifthStep) :
        edo.sagitypes
    const sagittals: Sagittal[] = sagitypes.map(parseSagitype)
    console.log("sagittals: ", sagittals)

    const cBasedNominalRange = flavor == Flavor.EVO ?
        computeRange(-15 as Decimal<{ integer: true }>, 20 as Decimal<{ integer: true }>) :
        computeRange(-1 as Decimal<{ integer: true }>, 6 as Decimal<{ integer: true }>)
    // console.log("c-based nominal range: ", cBasedNominalRange)
    const nominalSteps = cBasedNominalRange
        .map(linkIndex => linkIndex * fifthStep % edo.n)
        .map(nominalStep => nominalStep < 0 ? nominalStep + edo.n : nominalStep)
    // console.log("nominal steps: ", nominalSteps)

    nominalSteps.forEach((nominalStep, fDoubleFlatBasedNominalIndex) => {
        const dBasedNominalIndex: Decimal<{ integer: true }> = flavor == Flavor.EVO ?
            fDoubleFlatBasedNominalIndex - 17 as Decimal<{ integer: true }> :
            fDoubleFlatBasedNominalIndex - 3 as Decimal<{ integer: true }>

        updateNotation(
            nominalStep as Decimal<{ integer: true }>,
            { linkIndex: dBasedNominalIndex, sagittalIndex: 0 as Decimal<{ integer: true }> }
        )

        computeRange(sagittals.length as Decimal<{ integer: true }>)
            .map(sagittalIndex => sagittalIndex + 1 as Decimal<{ integer: true }>)
            .forEach((sagittalIndex: Decimal<{ integer: true }>) => {
                const step = (nominalStep + sagittalIndex) % edo.n as Decimal<{ integer: true }>
                updateNotation(
                    step,
                    { linkIndex: dBasedNominalIndex, sagittalIndex }
                )
            })

        computeRange(sagittals.length as Decimal<{ integer: true }>)
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
        // let maybeSagittal = getSagittal(sagittals, sagittalIndex)
        // let sagitype
        const maybeSagittal = getSagittal(sagittals, sagittalIndex)

        if (flavor == Flavor.REVO) {
            if (maybeSagittal) {
                const accidental: Accidental = maybeSagittal
                // if (link.apotome != Apotome.NATURAL) accidental.compatible = COMPATIBLE_FOR_APOTOME[link.apotome]
                const result = computeAccidentalSagitype(accidental)
                console.log("result: ", result)
                return `${link.nominal} ${result}`
            } else {
                if (link.apotome == Apotome.NATURAL) {
                    return `${link.nominal} `
                } else {
                    // @ts-ignore
                    const result = computeAccidentalSagitype({ compatible: COMPATIBLE_FOR_APOTOME[link.apotome] })
                    return `${link.nominal} ${result}`
                }
            }
        } else {
            // const maybeSagittal = getSagittal(sagittals, sagittalIndex)
            const sagitype = maybeSagittal ?
                computeAccidentalSagitype(maybeSagittal) :
                " "
            return `${link.nominal}${link.apotome}${sagitype}`
        }


        // if (maybeSagittal) {
        //     if (flavor == Flavor.REVO) {
        //         // console.log("yeah did it...")
        //         maybeSagittal = revoSagittal(maybeSagittal, sagittalIndex, link.apotome)
        //         sagitype = computeAccidentalSagitype(maybeSagittal)
        //         return `${link.nominal} ${sagitype}`
        //     } else {
        //         sagitype = computeAccidentalSagitype(maybeSagittal)
        //         return `${link.nominal}${link.apotome}${sagitype}`
        //     }
        // } else {
        //     // sagitype = " "
        //     return `${link.nominal}${link.apotome}`

        // }

        // if (flavor == Flavor.EVO) {



        // } else {
        //     return `${link.nominal} ${getRevoSagittal(edo, sagittalIndex, link.apotome)}`
        // }
        // return `${link.nominal}${link.apotome}${sagitype}`
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

const COMPATIBLE_FOR_APOTOME = {
    [Apotome.DOUBLE_SHARP]: Compatible.DOUBLE_SHARP,
    [Apotome.SHARP]: Compatible.SHARP,
    [Apotome.NATURAL]: Compatible.NATURAL,
    [Apotome.FLAT]: Compatible.FLAT,
    [Apotome.DOUBLE_FLAT]: Compatible.DOUBLE_FLAT
}

const edo5: Edo = { sagitypes: [], /*revo: [],*/ n: 5 }
const edo12: Edo = { sagitypes: [], /*revo: [],*/ n: 12 }
const edo15: Edo = { sagitypes: ["/|"] as Sagitype[], /*revo: [],*/ n: 15 }
const edo31: Edo = { sagitypes: ["/|\\"] as Sagitype[], /*revo: [],*/ n: 31 }
const edo67: Edo = { sagitypes: [")|(", "/|)"] as Sagitype[], n: 67}
const edo72: Edo = { sagitypes: ["/|", "|)", "/|\\"] as Sagitype[], /* revo: ["||)", "||\\"] as Sagitype[], */ n: 72 }
// const revo72: Edo = { sagitypes: ["/|", "|)", "/|\\", "||)", "||\\", "/||\\"] as Sagitype[], n: 72 }

const inputSentence = computeNotation(edo67, Flavor.REVO)
// console.log("\ninput sentence:\n")
// console.log(inputSentence)

const unicodeSentence = computeInputSentenceUnicode(inputSentence as Io & Sentence)

const asyncGenerateEdoStaves = async (): Promise<void> => {
    const svgString = await textToSvg(unicodeSentence, { font })
    fs.writeFileSync("dist/edoStaves.svg", svgString)
}

asyncGenerateEdoStaves().then()
