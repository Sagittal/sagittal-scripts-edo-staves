import { Cents, computeRange, Decimal, Ed, Filename, Io, Sentence, textToSvg } from "@sagittal/general"
import * as fs from "fs"
import { computeInputSentenceUnicode } from "staff-code"

const font = "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextSC.otf" as Filename

// TODO: When it gets to the finesse stage, Dave says there should be ~7; between the notes.
const manualInputSentence = `
ston

Gcl ;
c4                 7; nt ;  3; /| ; nt ;
7; bl ;
d4  3; \\! ; nt ;  7; nt ;  3; /| ; nt ;
7; bl ;
e4  3; \\! ; nt ;  7; nt ;  3; /| ; nt ;
7; bl ;
g4  3; \\! ; nt ;  7; nt ;  3; /| ; nt ;
7; bl ;
a4  3; \\! ; nt ;  7; nt ;  3; /| ; nt ;
7; bl ;
c5  3; \\! ; nt ;  7; nt ;
en; bl
nl;


Gcl ;
c4                 7; nt ;  3; /| ; nt ;
7; bl ;
d4  3; \\! ; nt ;  7; nt ;  3; /| ; nt ;
7; bl ;
e4  3; \\! ; nt ;  7; nt ;  3; /| ; nt ;
7; bl ;
g4  3; \\! ; nt ;  7; nt ;  3; /| ; nt ;
7; bl ;
a4  3; \\! ; nt ;  7; nt ;  3; /| ; nt ;
7; bl ;
c5  3; \\! ; nt ;  7; nt ;
en; bl
`
// const unicodeSentence = computeInputSentenceUnicode(inputSentence as Io & Sentence)

// const asyncGenerateEdoStaves = async (): Promise<void> => {
//     const svgString = await textToSvg(unicodeSentence, { font })

//     fs.writeFileSync("dist/edoStaves.svg", svgString)
// }

// asyncGenerateEdoStaves().then()


interface Edo {
    evo: string[],
    // revo: string[],
    n: Decimal<{ integer: true }>
}

interface StepNotation {
    nominalIndex: Decimal<{ integer: true }> // -3 to 3 for FCGDAEB
    sagittalIndex: Decimal<{ integer: true }> // 0 is none, 1 is the first sagittal in the sequence
}

const nominals = [
    "fB", "cB", "gB", "dB", "aB", "eB", "bB",
    "fb", "cb", "gb", "db", "ab", "eb", "bb",
    "f-", "c-", "g-", "d-", "a-", "e-", "b-",
    "f#", "c#", "g#", "d#", "a#", "e#", "b#",
    "fx", "cx", "gx", "dx", "ax", "ex", "bx",
]

// Enum SagittalKeys = ["/|"]
// const NEGATIVE_SAGITTALS = {
//     "/|": "\\!"
// }
// console.log(Object.keys(NEGATIVE_SAGITTALS))

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

const computeTrueSagittalIndex = ({ sagittalIndex, nominalIndex }, edo) => {
    if (sagittalIndex == 0) return 0
    let trueSagitalIndex = sagittalIndex
    const stepsToApotome = edo.evo.length
    if (trueSagitalIndex < 0) {
        if (nominalIndex > 3 || nominalIndex < -3) trueSagitalIndex -= stepsToApotome
        if (nominalIndex > 10 || nominalIndex < -10) trueSagitalIndex -= stepsToApotome    
    } else {
        if (nominalIndex > 3 || nominalIndex < -3) trueSagitalIndex += stepsToApotome
        if (nominalIndex > 10 || nominalIndex < -10) trueSagitalIndex += stepsToApotome    
    }
    
    return trueSagitalIndex
}

const computeNotation = (edo: Edo) => {
    const stepSize: Cents = 1200 / edo.n as Cents
    const stepSizes: Cents[] = computeRange(edo.n).map(step => step * stepSize as Cents)

    const JI_FIFTH_SIZE: Cents = 701.955000865 as Cents

    let bestFifthError: Cents = 1200 as Cents
    let bestFifthStep: Decimal<{ integer: true }> = edo.n
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
        // console.log("d-based nominal index: ", dBasedNominalIndex)

        updateNotation(
            nominalStep as Decimal<{ integer: true }>,
            { nominalIndex: dBasedNominalIndex, sagittalIndex: 0 as Decimal<{ integer: true }> }
        )

        computeRange(edo.evo.length as Decimal<{ integer: true }>)
            .map(sagittalIndex => sagittalIndex + 1 as Decimal<{ integer: true }>)
            // .map(sagittalIndex => sagittalIndex > edo.n ? sagittalIndex - edo.n as Decimal<{ integer: true }> : sagittalIndex)
            .forEach((sagittalIndex: Decimal<{ integer: true }>) => {
                const step = (nominalStep + sagittalIndex) % edo.n as Decimal<{ integer: true }>

                // if (sagittalIndex < edo.n) {
                updateNotation(
                    step,
                    { nominalIndex: dBasedNominalIndex, sagittalIndex }
                )
                // }
            })

        computeRange(edo.evo.length as Decimal<{ integer: true }>)
            .map(sagittalIndex => sagittalIndex + 1 as Decimal<{ integer: true }>)
            // .map(sagittalIndex => -sagittalIndex as Decimal<{ integer: true }>)
            // .map(sagittalIndex => sagittalIndex < 0 ? sagittalIndex + edo.n as Decimal<{ integer: true }> : sagittalIndex)
            .forEach((sagittalIndex: Decimal<{ integer: true }>) => {
                const step = sagittalIndex > nominalStep ?
                    edo.n - sagittalIndex as Decimal<{ integer: true }> :
                    nominalStep - sagittalIndex as Decimal<{ integer: true }>
                // if (step >= 0) {
                updateNotation(
                    step,
                    {
                        nominalIndex: dBasedNominalIndex,
                        sagittalIndex: -sagittalIndex as Decimal<{ integer: true }>
                    }
                )
                // }
            })
    })

    console.log("notation: ", notation)


    const finalNotation: StepNotation[] = notation.map((stepNotations: StepNotation[]): StepNotation => {
        // if only 1 step notation, take it
        // if not, then take the one with lowest abs value sagittal index
        // if tied, take the positive one
        // if more than one positive one, then take the nominal with the lowest abs val index



        return stepNotations.reduce((selected, current) => {
            // const currentSagittalIndex = current.sagittalIndex 
            // const selectedSagittalIndex = selected.sagittalIndex 
            const currentSagittalIndex = computeTrueSagittalIndex(current, edo)
            const selectedSagittalIndex = computeTrueSagittalIndex(selected, edo)

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
    })
    console.log("final notation: ", finalNotation)

    const stringNotation: string[] = finalNotation.map(({ nominalIndex, sagittalIndex }: StepNotation): string => `${nominals[nominalIndex + 17]}${getSagittal(edo, sagittalIndex)}`)
    console.log("string notation: ", stringNotation)

//     const intention = `
// ston
// Gcl ;
// c4                 7; nt ;  3; /| ; nt ;
// 7; bl ;
// d4  3; \\! ; nt ;  7; nt ;  3; /| ; nt ;
// 7; bl ;
// e4  3; \\! ; nt ;  7; nt ;  3; /| ; nt ;
// 7; bl ;
// g4  3; \\! ; nt ;  7; nt ;  3; /| ; nt ;
// 7; bl ;
// a4  3; \\! ; nt ;  7; nt ;  3; /| ; nt ;
// 7; bl ;
// c5  3; \\! ; nt ;  7; nt ;
// en; bl
// nl;
// `
//     console.log(intention)

    let output = "ston \nGcl ;\nc4 3; "
    let currentNominal = "c"
    stringNotation.forEach(stepStringNotation => {
        const nominal = stepStringNotation[0]
        if (nominal != currentNominal) {
            // if (currentNominal != "c") output += ""
            currentNominal = nominal
            let octave = currentNominal == "c" ? 5 : 4
            output += `\n7; bl ;\n${nominal}${octave} `
        }

        if (stepStringNotation.length > 2) {
            const sagittal = stepStringNotation.slice(2)
            output += `3; ${sagittal} ; `
        } else {
            output += "7; "
        }

        if (stepStringNotation[1] == "#") output += "# ; "
        if (stepStringNotation[1] == "x") output += ".x ; "
        if (stepStringNotation[1] == "b") output += "b ; "
        if (stepStringNotation[1] == "B") output += "bb ; "

        output += "nt ; "
    })
    if (currentNominal != "c") output += "7; bl ;\nc5 "
    output += "7; nt ;\n3; en; bl\nnl;"

    return output
}

const NEGATIVE_SAGITTALS = {
    "/|": "\\!",
    "|)": "!)",
    "/|\\": "\\!/",
}

const edo12: Edo = {
    evo: [],
    // revo: ["||\\"],
    n: 12 as Decimal<{ integer: true }>
}
const edo15: Edo = {
    evo: ["/|"],
    // revo: ["||\\"],
    n: 15 as Decimal<{ integer: true }>
}

const edo72: Edo = {
    evo: ["/|", "|)", "/|\\"],
    n: 72 as Decimal<{ integer: true }>
}


const inputSentence = computeNotation(edo72)
console.log(inputSentence)

const unicodeSentence = computeInputSentenceUnicode(inputSentence as Io & Sentence)

const asyncGenerateEdoStaves = async (): Promise<void> => {
    const svgString = await textToSvg(unicodeSentence, { font })

    fs.writeFileSync("dist/edoStaves.svg", svgString)
}

asyncGenerateEdoStaves().then()
