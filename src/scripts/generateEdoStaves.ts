import { Cents, computeRange, Decimal, Ed, Filename, Io, Sentence, textToSvg } from "@sagittal/general"
import * as fs from "fs"
import { computeInputSentenceUnicode } from "staff-code"

const font = "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextSC.otf" as Filename

interface Edo {
    evo: string[],
    // revo: string[],
    n: number
}

interface StepNotation {
    nominalIndex: Decimal<{ integer: true }> // 35 possibilities, -17 to 17, for FCGDAEB flanked by sharps and flats and doubles thereof
    sagittalIndex: Decimal<{ integer: true }> // 0 is none, 1 is the first sagittal in the sequence
}

const NOMINALS = [
    "fB", "cB", "gB", "dB", "aB", "eB", "bB",
    "fb", "cb", "gb", "db", "ab", "eb", "bb",
    "f-", "c-", "g-", "d-", "a-", "e-", "b-",
    "f#", "c#", "g#", "d#", "a#", "e#", "b#",
    "fx", "cx", "gx", "dx", "ax", "ex", "bx",
]

const NEGATIVE_SAGITTALS = {
    "/|": "\\!",
    "|)": "!)",
    "/|\\": "\\!/",
}

const notation: StepNotation[][] = []

const updateNotation = (step: Decimal<{ integer: true }>, stepNotation: StepNotation) => {
    if (notation[step] == null) notation[step] = []
    notation[step].push(stepNotation)
}

const getSagittal = (edo: Edo, sagittalIndex: Decimal<{ integer: true }>) => {
    if (sagittalIndex == 0) return ""
    if (sagittalIndex > 0) return edo.evo[sagittalIndex - 1]
    // @ts-ignore
    if (sagittalIndex < 0) return NEGATIVE_SAGITTALS[edo.evo[-sagittalIndex - 1]]
}

const computeTrueSagittalIndex = ({ sagittalIndex, nominalIndex }: StepNotation, edo: Edo) => {
    let trueSagitalIndex: Decimal<{ integer: true }> = sagittalIndex as Decimal<{ integer: true }>
    const stepsToApotome: Decimal<{ integer: true }> = edo.evo.length as Decimal<{ integer: true }>
    if (trueSagitalIndex <= 0) {
        if (nominalIndex > 3 || nominalIndex < -3) trueSagitalIndex = trueSagitalIndex - stepsToApotome as Decimal<{ integer: true }>
        if (nominalIndex > 10 || nominalIndex < -10) trueSagitalIndex = trueSagitalIndex - stepsToApotome as Decimal<{ integer: true }>
    } else {
        if (nominalIndex > 3 || nominalIndex < -3) trueSagitalIndex = trueSagitalIndex + stepsToApotome as Decimal<{ integer: true }>
        if (nominalIndex > 10 || nominalIndex < -10) trueSagitalIndex = trueSagitalIndex + stepsToApotome as Decimal<{ integer: true }>
    }

    return trueSagitalIndex
}

const computeNotation = (edo: Edo) => {
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
    console.log("fifth step: ", fifthStep)

    const cBasedNominalRange = computeRange(-15 as Decimal<{ integer: true }>, 20 as Decimal<{ integer: true }>)
    console.log("c-based nominal range: ", cBasedNominalRange)
    const nominalSteps = cBasedNominalRange
        .map(nominalIndex => nominalIndex * fifthStep % edo.n)
        .map(nominalStep => nominalStep < 0 ? nominalStep + edo.n : nominalStep)
    console.log("nominal steps: ", nominalSteps)

    nominalSteps.forEach((nominalStep, fDoubleFlatBasedNominalIndex) => {
        const dBasedNominalIndex: Decimal<{ integer: true }> = fDoubleFlatBasedNominalIndex - 17 as Decimal<{ integer: true }>;

        updateNotation(
            nominalStep as Decimal<{ integer: true }>,
            { nominalIndex: dBasedNominalIndex, sagittalIndex: 0 as Decimal<{ integer: true }> }
        )

        computeRange(edo.evo.length as Decimal<{ integer: true }>)
            .map(sagittalIndex => sagittalIndex + 1 as Decimal<{ integer: true }>)
            .forEach((sagittalIndex: Decimal<{ integer: true }>) => {
                const step = (nominalStep + sagittalIndex) % edo.n as Decimal<{ integer: true }>
                updateNotation(
                    step,
                    { nominalIndex: dBasedNominalIndex, sagittalIndex }
                )
            })

        computeRange(edo.evo.length as Decimal<{ integer: true }>)
            .map(sagittalIndex => sagittalIndex + 1 as Decimal<{ integer: true }>)
            .forEach((sagittalIndex: Decimal<{ integer: true }>) => {
                const step = sagittalIndex > nominalStep ?
                    edo.n - sagittalIndex as Decimal<{ integer: true }> :
                    nominalStep - sagittalIndex as Decimal<{ integer: true }>
                updateNotation(
                    step,
                    {
                        nominalIndex: dBasedNominalIndex,
                        sagittalIndex: -sagittalIndex as Decimal<{ integer: true }>
                    }
                )
            })
    })

    console.log("notation: ", notation)


    const finalNotation: StepNotation[] = notation.map((stepNotations: StepNotation[]): StepNotation => {
        // if only 1 step notation, take it
        // if not, then take the one with lowest abs value sagittal index
        // if tied, take the positive one
        // if more than one positive one, then take the nominal with the lowest abs val index
        console.log("\nstepNotations: ", stepNotations)
        const result = stepNotations.reduce((selected, current) => {
            const currentSagittalIndex = computeTrueSagittalIndex(current, edo)
            const selectedSagittalIndex = computeTrueSagittalIndex(selected, edo)
            console.log("selected notation: ", selected)
            console.log("current notation: ", current)
            console.log("selected 'true' sag index: ", selectedSagittalIndex, "current 'true' sag index: ", currentSagittalIndex)

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
                    if (Math.abs(current.nominalIndex) < Math.abs(selected.nominalIndex)) {
                        return current;
                    } else {
                        return selected;
                    }
                }
            }
        });
        console.log("result notation: ", result, "\n")
        return result
    })
    console.log("final notation: ", finalNotation)

    const stringNotation: string[] = finalNotation.map(({ nominalIndex, sagittalIndex }: StepNotation): string => `${NOMINALS[nominalIndex + 17]}${getSagittal(edo, sagittalIndex)}`)
    console.log("string notation: ", stringNotation)

    let output = "ston \n5; Gcl ; 5; \nc4 5; "
    let currentNominal = "c"
    let noteCount = 0
    let newlineTracker = 27
    stringNotation.forEach(stepStringNotation => {
        const nominal = stepStringNotation[0]
        if (nominal != currentNominal) {
            currentNominal = nominal
            let octave = currentNominal == "c" ? 5 : 4
            output += `\n9; en; bl \n${nominal}${octave} `
            if (noteCount > newlineTracker && nominal != "c") {
                newlineTracker += 20
                output += "nl;\n5; Gcl ; 5; "
            } else {
                output += "; 5;"
            }
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

const edo5: Edo = { evo: [], n: 5 }

const edo12: Edo = { evo: [], /* revo: ["||\\"], */ n: 12 }
const edo15: Edo = { evo: ["/|"], /* revo: ["||\\"], */ n: 15 }
const edo31: Edo = { evo: ["/|\\"], n: 31 }
const edo72: Edo = { evo: ["/|", "|)", "/|\\"], n: 72 }

const inputSentence = computeNotation(edo31)
console.log("\ninput sentence:\n")
console.log(inputSentence)

const unicodeSentence = computeInputSentenceUnicode(inputSentence as Io & Sentence)

const asyncGenerateEdoStaves = async (): Promise<void> => {
    const svgString = await textToSvg(unicodeSentence, { font })
    fs.writeFileSync("dist/edoStaves.svg", svgString)
}

asyncGenerateEdoStaves().then()
