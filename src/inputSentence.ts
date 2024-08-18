// TODO: CLEANUP make sure all `xit` tests are turned to `it`
import { Io, Sentence, Cents, computeRange, Maybe, Index, Count } from "@sagittal/general"
import { Flavor, Accidental, Sagitype, computeAccidentalSagitype, parseSagitype } from "@sagittal/system"
import { computeSymbolClassIdAndSectionFromSagittal } from "../../../system/src/accidental/pitch/symbolClassIdAndSectionFromSagittal"
import { computeRevoAccidentalFromCaptureZone } from "../../../system/src/accidental/flavor/revo"  // TODO: CLEANUP properly import all these sorts of things
// import { apotomeShift } from "../../../system/src/accidental/sagittal"
import { EdoStepNotation, Edo, Link, EdoStep, EdoStepNotationPossibilities, Whorl, Nominal } from "./types"
import { LINKS, JI_FIFTH_SIZE, FIFTHS_UNTIL_SHARP, NOTES_PER_SYSTEM, REVO_VERSION_OF_WHORL } from "./constants"
import { EDOS as EDO_SAGITYPES } from "./edos"
import { Section } from "@sagittal/system/dist/cjs/notation"
import { SECTION_N1A, SECTION_N1T, SECTION_N2A, SECTION_N2T, SECTION_P1A, SECTION_P1T, SECTION_P2A, SECTION_P2T } from "@sagittal/system/dist/cjs/notation/sections"
import { computeApotomeComplement, Shafts } from "@sagittal/system/dist/cjs/accidental/sagittal"

const addEdoStepNotationPossibility = (
    edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[],
    step: EdoStep,
    stepNotationPossibility: EdoStepNotation
): void => {
    if (edoStepNotationPossibilitiesList[step] == null) edoStepNotationPossibilitiesList[step] = []
    edoStepNotationPossibilitiesList[step].push(stepNotationPossibility)
}

const computePositiveOrNegativeOrNullSagittal = (sagittals: Accidental[], sagittalIndex: Index<Accidental>): Maybe<Accidental> => {
    if (sagittalIndex > 0) return sagittals[sagittalIndex - 1]
    else if (sagittalIndex < 0) {
        const wth = { ...sagittals[-sagittalIndex - 1], down: true }
        // console.log("WTH? ", wth)
        return wth
    }

    return undefined
}

// TODO: CLEANUP there seems to be something wrong about having this link index that combines nominal and whorl, and then getting the whorl index from it
// like there should be some way to do it without a link index, only a nominal index and a whorl index
// const computeWhorlIndex = (linkIndex: Index<Link>): Index<Whorl> => {
//     // let adjustedSagitalIndex: Index<Accidental> = sagittalIndex as Index<Accidental>

//     // if (adjustedSagitalIndex <= 0) {
//     if (linkIndex > 3 && linkIndex < 10) return 1 as Index<Whorl> // sharp
//     else if (linkIndex > 10) return 2 as Index<Whorl> // double-sharp
//     // } else {
//     else if (linkIndex < -3 && linkIndex > -10) return -1 as Index<Whorl> // flat
//     else if (linkIndex < -10) return -2 as Index<Whorl> // double-flat
//     else return 0 as Index<Whorl> // natural

//     // return adjustedSagitalIndex
// }

const computeAdjustedSagittalIndex = ({ sagittalIndex, linkIndex }: EdoStepNotation, sharpStep: EdoStep): Index<Accidental> => {
    let adjustedSagitalIndex: Index<Accidental> = sagittalIndex as Index<Accidental>

    if (sagittalIndex <= 0) { // sagittal is down
        if (linkIndex > 3 || linkIndex < -3) adjustedSagitalIndex = adjustedSagitalIndex - sharpStep as Index<Accidental>
        if (linkIndex > 10 || linkIndex < -10) adjustedSagitalIndex = adjustedSagitalIndex - sharpStep as Index<Accidental>
    } else {
        if (linkIndex > 3 || linkIndex < -3) adjustedSagitalIndex = adjustedSagitalIndex + sharpStep as Index<Accidental>
        if (linkIndex > 10 || linkIndex < -10) adjustedSagitalIndex = adjustedSagitalIndex + sharpStep as Index<Accidental>
    }
    // const whorlIndex = computeWhorlIndex(linkIndex)


    // console.log("sagittal index: ", sagittalIndex, " link index: ", linkIndex, " adjusted: ", adjustedSagitalIndex)

    // return sagittalIndex + whorlIndex * sharpStep as Index<Accidental>
    return adjustedSagitalIndex
}

// const computeOtherThing = ({ sagittalIndex, linkIndex }: EdoStepNotation, sharpStep: EdoStep): Index<Accidental> => {
//     const whorlIndex = computeWhorlIndex(linkIndex)
//     return sagittalIndex + whorlIndex * sharpStep as Index<Accidental>
// }

// const computeRevoSagitypeBetweenEvoSagitypesAndSharp = (evoSagitypeOnWhichToBaseRevoSagitype: Sagitype): Sagitype => {
//     const accidental: Accidental = parseSagitype(evoSagitypeOnWhichToBaseRevoSagitype)
//     const [symbolClassId, _] = computeSymbolClassIdAndSectionFromSagittal(accidental)
//     const revo = computeRevoAccidentalFromCaptureZone(symbolClassId, SECTION_BETWEEN_EVO_SAGITTALS_AND_SHARP)

//     return computeAccidentalSagitype(revo)
// }

// const shiftedSagitypes = (sagitypes: Sagitype[]): Sagitype[] => {
//     return sagitypes
//         .map(parseSagitype)
//         .map(apotomeShift)
//         .map(computeAccidentalSagitype)
// }

// const computeRevoSagitypes = (sagitypes: Sagitype[], sharpStep: EdoStep): Sagitype[] => {
//     let revoSagitypes: Sagitype[] = sagitypes.slice()
//     let evoSagitypeOnWhichToBaseRevoSagitypeIndex = 0

//     // -1 to account for 0-indexing, and a further -1 to account for this array beginning with the 1st actual sagittal, not the plain nominal
//     for (
//         let missingSagitypeBetweenEvoSagitypesAndSharpIndex = sharpStep - 2;
//         missingSagitypeBetweenEvoSagitypesAndSharpIndex >= sagitypes.length;
//         missingSagitypeBetweenEvoSagitypesAndSharpIndex--
//     ) {
//         const evoSagitypeOnWhichToBaseRevoSagitype = sagitypes[evoSagitypeOnWhichToBaseRevoSagitypeIndex]
//         const revoSagitypeBetweenEvoSagitypesAndSharp = computeRevoSagitypeBetweenEvoSagitypesAndSharp(evoSagitypeOnWhichToBaseRevoSagitype)
//         evoSagitypeOnWhichToBaseRevoSagitypeIndex++;

//         revoSagitypes[missingSagitypeBetweenEvoSagitypesAndSharpIndex] = revoSagitypeBetweenEvoSagitypesAndSharp
//     }

//     revoSagitypes[sharpStep - 1] = "/||\\" as Sagitype

//     revoSagitypes = revoSagitypes.concat(shiftedSagitypes(revoSagitypes))

//     return revoSagitypes
// }

const computeFifthStep = (edo: Edo): EdoStep => {
    const stepSize: Cents = 1200 / edo as Cents
    const stepSizes: Cents[] = computeRange(edo as Edo).map(step => step * stepSize as Cents)

    let bestFifthError: Cents = 1200 as Cents
    let bestFifthStep: EdoStep = edo
    stepSizes.forEach((stepSize: Cents, index: number): void => {
        const fifthError: Cents = Math.abs(JI_FIFTH_SIZE - stepSize) as Cents
        if (fifthError < bestFifthError) {
            bestFifthError = fifthError
            bestFifthStep = index as EdoStep
        }
    })

    return bestFifthStep
}

const addEdoStepNotationPossibilityForLink = (
    edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[],
    linkStep: EdoStep,
    dIsZeroLinkIndex: Index<Link>,
) => {
    addEdoStepNotationPossibility(
        edoStepNotationPossibilitiesList,
        linkStep,
        {
            linkIndex: dIsZeroLinkIndex,
            sagittalIndex: 0 as Index<Accidental>,
        }
    )
}

const addEdoStepNotationPossibilitiesAboveLink = (
    edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[],
    linkStep: EdoStep,
    dIsZeroLinkIndex: Index<Link>,
    edo: Edo,
    sagittals: Accidental[]
) => {
    computeRange(sagittals.length as Index<Accidental>)
        .map((sagittalIndex: Index<Accidental>): Index<Accidental> => sagittalIndex + 1 as Index<Accidental>)
        .forEach((sagittalIndex: Index<Accidental>): void => {
            const step = (linkStep + sagittalIndex) % edo as EdoStep
            addEdoStepNotationPossibility(
                edoStepNotationPossibilitiesList,
                step,
                {
                    linkIndex: dIsZeroLinkIndex,
                    sagittalIndex
                }
            )
        })
}

const addEdoStepNotationPossibilitiesBelowLink = (
    edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[],
    linkStep: EdoStep,
    dIsZeroLinkIndex: Index<Link>,
    edo: Edo,
    sagittals: Accidental[]
) => {
    computeRange(sagittals.length as Index<Accidental>)
        .map((sagittalIndex: Index<Accidental>): Index<Accidental> => sagittalIndex + 1 as Index<Accidental>)
        .forEach((sagittalIndex: Index<Accidental>): void => {
            const step = sagittalIndex > linkStep ?
                edo - sagittalIndex as EdoStep :
                linkStep - sagittalIndex as EdoStep
            addEdoStepNotationPossibility(
                edoStepNotationPossibilitiesList,
                step,
                {
                    linkIndex: dIsZeroLinkIndex,
                    sagittalIndex: -sagittalIndex as Index<Accidental>
                }
            )
        })
}

const addEdoStepNotationPossibilities = (
    edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[],
    linkStep: EdoStep,
    fDoubleFlatIsZeroLinkIndex: Index<Link>,
    edo: Edo,
    sagittals: Accidental[],
    flavor: Flavor
) => {
    // d is zero here because it's the center of FCGDAEB and so if we want to trim the nominals F and B first for low EDOs, we need them at the extremes
    const dIsZeroLinkIndex: Index<Link> =
        // flavor == Flavor.EVO ?
        fDoubleFlatIsZeroLinkIndex - 17 as Index<Link> // :
    // fDoubleFlatIsZeroLinkIndex - 3 as Index<Link>

    addEdoStepNotationPossibilityForLink(edoStepNotationPossibilitiesList, linkStep, dIsZeroLinkIndex)
    addEdoStepNotationPossibilitiesAboveLink(edoStepNotationPossibilitiesList, linkStep, dIsZeroLinkIndex, edo, sagittals)
    addEdoStepNotationPossibilitiesBelowLink(edoStepNotationPossibilitiesList, linkStep, dIsZeroLinkIndex, edo, sagittals)
}

const computeEdoStepNotationPossibilitesList = (edo: Edo, flavor: Flavor, fifthStep: EdoStep, sagittals: Accidental[]) => {
    const edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[] = []

    const cIsZeroLinkIndexRange = computeRange(-15 as Index<Link>, 20 as Index<Link>)

    // c is zero here because we want the notation to be based on c 
    const linkSteps: EdoStep[] = cIsZeroLinkIndexRange
        .map((linkIndex: Index<Link>): EdoStep => linkIndex * fifthStep % edo as EdoStep)
        .map((linkStep: EdoStep): EdoStep => linkStep < 0 ? linkStep + edo as EdoStep : linkStep)

    // console.log("do i not have them here? ", sagittals)

    // TODO: CLEANUP this comment is likely to become a lie, so come back and check on it
    // f (revo) or f double flat (evo) is zero here because that's the link in the master list corresponding to the first of these link steps 
    linkSteps.forEach((linkStep: EdoStep, fDoubleFlatIsZeroLinkIndex: number): void => {
        addEdoStepNotationPossibilities(edoStepNotationPossibilitiesList, linkStep, fDoubleFlatIsZeroLinkIndex as Index<Link>, edo, sagittals, flavor)
    })

    // TODO: CLEANUP constantize this and the other magic numbered link indices around here
    const concludingEdoNotationOnC: EdoStepNotation = { linkIndex: -2 as Index<Link>, sagittalIndex: 0 as Index<Accidental> }
    edoStepNotationPossibilitiesList.push([concludingEdoNotationOnC])

    return edoStepNotationPossibilitiesList
}

const computeSagittals = (sagitypes: Sagitype[], flavor: Flavor, sharpStep: EdoStep): Accidental[] => {
    // return (
    //     // flavor == Flavor.REVO ?
    //     //     computeRevoSagitypes(sagitypes, sharpStep) :
    //     sagitypes
    // ).map(parseSagitype)

    const sagittals: Accidental[] = sagitypes.map(parseSagitype)

    const implicitSingleShaftSagittalsFromApotomeComplements: Accidental[] = sagittals
        .map(computeApotomeComplement)
        .reverse()
        // .filter((maybeSagittal: Maybe<Accidental>): boolean => )
        .filter((maybeSagittal: Maybe<Accidental>): boolean => {
            // console.log(maybeSagittal)
            if (!maybeSagittal) return true
            return maybeSagittal.shafts == Shafts.SINGLE
        }) as Accidental[]
    
    // console.log(implicitSingleShaftSagittalsFromApotomeComplements)
    const result = sagittals.concat(implicitSingleShaftSagittalsFromApotomeComplements).slice(0, Math.ceil(sharpStep / 2))
    // console.log(result)
    return result
}

// TODO: CLEANUP switch from Accidental type to Sagittal type

// const possibilitiesHelper = (edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[], sagittals: Accidental[]) => {
//     return edoStepNotationPossibilitiesList.map((edoStepNotationPossibilities: EdoStepNotation[]) => {
//         return edoStepNotationPossibilities.map(({ linkIndex, sagittalIndex }: EdoStepNotation) => {
//             const link = LINKS[linkIndex + 17]
//             // @ts-ignore
//             const sagitype = computeAccidentalSagitype(computePositiveOrNegativeOrNullSagittal(sagittals, sagittalIndex))
//             return `${link.nominal}${link.whorl}${sagitype}`
//         })
//     })
// }

const makeSenseOfPossibility = ({ linkIndex, sagittalIndex }: EdoStepNotation, sagittals: Accidental[]) => {
    const link = LINKS[linkIndex + 17]
    const sagitype = computeAccidentalSagitype(
        // @ts-ignore
        computePositiveOrNegativeOrNullSagittal(sagittals, sagittalIndex)
    ).replace(/\(\|\/\/\|\)/g, "")
        
    return `${link.nominal}${link.whorl.replace(/n/g, "")}${sagitype}`
}

const chooseOneEdoStepNotationPerEdoStep = (edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[], sharpStep: EdoStep, sagittals: Accidental[]) => {
    // if there's only 1 edo step notation possibility for this edo step, then take it
    // if not, then

    // oh shit, tho, unless consider this: it's a positive sagittal tied with a negative sagittal, but the positive one is against a flat
    // and the negative one is against a sharp,
    
    // console.log("edoStepNotationPossibilitiesList: ", possibilitiesHelper(edoStepNotationPossibilitiesList, sagittals))

    return edoStepNotationPossibilitiesList.map((edoStepNotationPossibilities: EdoStepNotation[]): EdoStepNotation => {
        // console.log("\npossibilities: ", edoStepNotationPossibilities.map(possibility => makeSenseOfPossibility(possibility, sagittals)))
        return edoStepNotationPossibilities.reduce((chosenEdoStepNotation: EdoStepNotation, candidateEdoStepNotation: EdoStepNotation): EdoStepNotation => {
            const candidateAdjustedSagittalIndex: Index<Accidental> = computeAdjustedSagittalIndex(candidateEdoStepNotation, sharpStep)
            const chosenAdjustedSagittalIndex: Index<Accidental> = computeAdjustedSagittalIndex(chosenEdoStepNotation, sharpStep)
            // const candidateSagittalIndex: Index<Accidental> = candidateEdoStepNotation.sagittalIndex
            // const chosenSagittalIndex: Index<Accidental> = chosenEdoStepNotation.sagittalIndex

            // const candidateLinkIndex = candidateEdoStepNotation.linkIndex
            // const chosenLinkIndex = chosenEdoStepNotation.linkIndex

            // const candidateWhorlIndex = computeOtherThing(candidateEdoStepNotation, sharpStep)
            // const chosenWhorlIndex = computeOtherThing(chosenEdoStepNotation, sharpStep)

            // console.log("chosen: ", makeSenseOfPossibility(chosenEdoStepNotation, sagittals), " adjusted: ", chosenAdjustedSagittalIndex, " whorl thing: ", chosenWhorlIndex)
            // console.log("candidate: ", makeSenseOfPossibility(candidateEdoStepNotation, sagittals), " adjusted: ", candidateAdjustedSagittalIndex, " whorl thing: ", candidateWhorlIndex)



            // take the possibility with the adjusted sagittal index that has the lowest absolute value
            if (Math.abs(candidateAdjustedSagittalIndex) < Math.abs(chosenAdjustedSagittalIndex)) {
                // console.log("chosen here: ", makeSenseOfPossibility(candidateEdoStepNotation, sagittals))
                return candidateEdoStepNotation
            } else if (Math.abs(candidateAdjustedSagittalIndex) > Math.abs(chosenAdjustedSagittalIndex)) {
                // console.log("chosen here: ", makeSenseOfPossibility(chosenEdoStepNotation, sagittals))
                return chosenEdoStepNotation
            } else {
                // // // if more than one possibility is tied for the adjusted sagittal index with the lowest absolute value, then take the one with the positive whorl index, but only if there's also a sagittal there
                //     if (/*candidateEdoStepNotation.sagittalIndex != 0 && */Math.abs(candidateWhorlIndex) < Math.abs(chosenWhorlIndex)) {
                     // console.log("chosen here: ", makeSenseOfPossibility(candidateEdoStepNotation, sagittals))
                //         return candidateEdoStepNotation
                //     } else if (/*candidateEdoStepNotation.sagittalIndex != 0 && */Math.abs(candidateWhorlIndex) > Math.abs(chosenWhorlIndex)) { // TODO: CLEANUP if these only ever matter as abs val, then return them from dedicated compute fun as such
                     // console.log("chosen here: ", makeSenseOfPossibility(chosenEdoStepNotation, sagittals))
                //         return chosenEdoStepNotation
                //     } else {
                        // if the whorl indices are also tied, take the one with the positive sagittal index
                        if (candidateAdjustedSagittalIndex > chosenAdjustedSagittalIndex) {
                            // console.log("chosen here: ", makeSenseOfPossibility(candidateEdoStepNotation, sagittals))
                            return candidateEdoStepNotation
                        } else if (candidateAdjustedSagittalIndex < chosenAdjustedSagittalIndex) {
                            // console.log("chosen here: ", makeSenseOfPossibility(chosenEdoStepNotation, sagittals))
                            return chosenEdoStepNotation
                        } else {
                            // if there's more than one positive sagittal index in this way, then take the possibility with the link index that has the lowest absolute value
                            if (Math.abs(candidateEdoStepNotation.linkIndex) < Math.abs(chosenEdoStepNotation.linkIndex)) {
                                // console.log("chosen here: ", makeSenseOfPossibility(candidateEdoStepNotation, sagittals))
                                return candidateEdoStepNotation
                            } else {
                                // console.log("chosen here: ", makeSenseOfPossibility(chosenEdoStepNotation, sagittals))
                                return chosenEdoStepNotation
                            }
                        }
                    // }
                // }
            }
        });
    })
}

const computeSagitypeString = (sagittal: Accidental, flavor: Flavor, whorl: Whorl): string => {
    if (flavor == Flavor.EVO) {
        return computeAccidentalSagitype(sagittal)
    }

    // console.log("oh shit i bet you fucking mutate it huh BEFORE ", sagittal)
    let [symbolClassId, section] = computeSymbolClassIdAndSectionFromSagittal({ ...sagittal }) // TODO: CLEANUP bug in here, it fucking mutates this shit, which is why I have to clone it here
    // console.log("oh shit i bet you fucking mutate it huh AFTER ", sagittal)
    // console.log("oh ho, section", section)
    // if (section.mirrored) {
    // }

    // let revo: Accidental = sagittal

    // if (whorl == Whorl.SHARP) {
    //     if (sagittal.down) {

    //     }
    // }
    // if (sagittal.down && whorl == Whorl.SHARP) {
    // } else if (whorl == Whorl.SHARP) {

    // }
    let targetSection: Section
    if (whorl == Whorl.DOUBLE_FLAT) {
        targetSection = { ...SECTION_N2T }
    } else if (whorl == Whorl.FLAT) {
        if (sagittal.down) {
            targetSection = { ...SECTION_N2A }
        } else {
            targetSection = { ...SECTION_N1T }
        }
    } else if (whorl == Whorl.NATURAL) {
        if (sagittal.down) {
            targetSection = { ...SECTION_N1A }
        } else {
            targetSection = { ...SECTION_P1A }
        }
    } else if (whorl == Whorl.SHARP) {
        if (sagittal.down) {
            targetSection = { ...SECTION_P1T }
        } else {
            targetSection = { ...SECTION_P2A }
        }
    } else {
        targetSection = { ...SECTION_P2T }
    }


    console.log("\n")
    console.log("target section before: ", targetSection)
    // if (sagittal.down) {
        if (section.mirrored) {
    //         console.log("SECTION WAS MIRRORED FOR DOWN SO SET TARGET SECTION MIRRORED TO TRUE")
            targetSection.mirrored = !targetSection.mirrored
        }
    // } else {
    //     if (section.mirrored) {
    //         console.log("SECTION WAS MIRRORED SO SET TARGET SECTION MIRRORED TO TRUE")
    //         // if (sagittal.down) {
    //         //     targetSection.mirrored = true
    //         // } else {
    //         targetSection.mirrored = true
    //         // }
    //     }
    // }


    const revo = computeRevoAccidentalFromCaptureZone(symbolClassId, { ...targetSection })
    // console.log("\nwhorl: ", whorl, " symbolClassId: ", symbolClassId, " target section: ", targetSection, " sagittal: ", sagittal, " revo sagittal: ", revo, " section: ", section)
    console.log("REVO SAGITTAL: ", revo)
    console.log("sagittal: ", sagittal)
    console.log("symbolClassId: ", symbolClassId)
    console.log("whorl: ", whorl)
    console.log("section: ", section)
    console.log("target section: ", targetSection)

    return computeAccidentalSagitype(revo)
}

const convertToSagitypeStrings = (edoStepNotations: EdoStepNotation[], sagittals: Accidental[], flavor: Flavor): Record<any, string>[] => {
    let currentNominal: Nominal
    let naturalRequiredOnPlainNominal: boolean
    return edoStepNotations.map(({ linkIndex, sagittalIndex }: EdoStepNotation): Record<any, string> => {
        // console.log("sagittalIndex: ", sagittalIndex)
        const maybeSagittal: Maybe<Accidental> = computePositiveOrNegativeOrNullSagittal(sagittals, sagittalIndex)
        // console.log("hav eyou arleady lost it here??? ", maybeSagittal)
        const { nominal, whorl }: Link = LINKS[linkIndex + 17] // TODO: CLEANUP another magic number

        if (nominal != currentNominal) {
            currentNominal = nominal
            naturalRequiredOnPlainNominal = false
        }
        if (maybeSagittal || whorl != Whorl.NATURAL) naturalRequiredOnPlainNominal = true

        const sagitypeString: string = maybeSagittal ? computeSagitypeString(maybeSagittal, flavor, whorl) : ""

        // TODO: CLEANUP this is super gnarly, please clean up
        const whorlString: string = flavor == Flavor.EVO ?
            whorl == Whorl.NATURAL ?
                naturalRequiredOnPlainNominal && !maybeSagittal ?
                    whorl :
                    " " :
                whorl :
            whorl == Whorl.NATURAL ?
                naturalRequiredOnPlainNominal && !maybeSagittal ?
                    whorl :
                    " " :
                maybeSagittal ?
                    " " :
                    REVO_VERSION_OF_WHORL[whorl]


        // TODO: CLEANUP consider making this a map with three keys, rather than this crappy string, which you immediately parse anyway. something like:
        // return {
        //     nominal: nominal,
        //     compatible: compatibleString,
        //     sagitype:
        // }
        // return `${nominal}${whorlString}${sagitype}`
        return {
            nominalString: nominal,
            whorlString,
            sagitypeString,
        }
    })
}

const assembleAsStaffCodeInputSentence = (stringifiedEdoStepNotations: Record<any, string>[]): Io & Sentence => {
    let inputSentence: Io & Sentence = "ston \n5; Gcl ; 5; \nc4 5; " as Io & Sentence
    let currentNominal: Io = "c"
    let noteCount: Count = 0 as Count
    let noteCountPastWhichBreakSystem: Count = NOTES_PER_SYSTEM

    stringifiedEdoStepNotations.forEach(({ nominalString, whorlString, sagitypeString }: Record<any, string>): void => {
        // const nominalString: string = stringifiedEdoStepNotation[0]
        // const compatibleString: string = stringifiedEdoStepNotation[1]
        // const sagitype: Sagitype = stringifiedEdoStepNotation.slice(2) as Sagitype

        if (nominalString != currentNominal) {
            currentNominal = nominalString
            inputSentence = inputSentence + `\n9; en; bl \n` as Io & Sentence
            if (noteCount > noteCountPastWhichBreakSystem && nominalString != "c") {
                noteCountPastWhichBreakSystem = noteCountPastWhichBreakSystem + NOTES_PER_SYSTEM as Count
                inputSentence = inputSentence + "nl; \n5; Gcl ; 5; " as Io & Sentence
            } else {
                inputSentence = inputSentence + "5; " as Io & Sentence
            }
            inputSentence = inputSentence + `${nominalString}${currentNominal == "c" ? 5 : 4} ` as Io & Sentence
        }

        if (sagitypeString.length) {
            inputSentence = inputSentence + `5; ${sagitypeString} ; ` as Io & Sentence
        } else {
            inputSentence = inputSentence + "9; " as Io & Sentence
        }

        if (whorlString == "#") inputSentence = inputSentence + "# ; " as Io & Sentence
        else if (whorlString == "x") inputSentence = inputSentence + ".x ; " as Io & Sentence
        else if (whorlString == "n") inputSentence = inputSentence + "n ; " as Io & Sentence
        else if (whorlString == "b") inputSentence = inputSentence + "b ; " as Io & Sentence
        else if (whorlString == "B") inputSentence = inputSentence + "bb ; " as Io & Sentence
        else inputSentence = inputSentence + `${whorlString} ; ` as Io & Sentence

        inputSentence = inputSentence + "nt ; " as Io & Sentence
        noteCount++
    })

    // if (currentNominal != "c") inputSentence = inputSentence + "9; bl ; \nc5 " as Io & Sentence
    // inputSentence = inputSentence + "9; nt ; \n3; en; bl \nnl; " as Io & Sentence
    inputSentence = inputSentence + "\n3; en; bl \nnl; " as Io & Sentence

    return inputSentence as Io & Sentence
}

const computeSharpStep = (edo: Edo, fifthStep: EdoStep) =>
    fifthStep * FIFTHS_UNTIL_SHARP % edo as EdoStep

const computeStaffCodeInputSentence = (edo: Edo, flavor: Flavor): Io & Sentence => {
    const sagitypes = EDO_SAGITYPES[edo]
    const fifthStep: EdoStep = computeFifthStep(edo)
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
    const sagittals: Accidental[] = computeSagittals(sagitypes, flavor, sharpStep)
    // console.log(sagittals)
    const edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[] = computeEdoStepNotationPossibilitesList(edo, flavor, fifthStep, sagittals)
    const edoStepNotations: EdoStepNotation[] = chooseOneEdoStepNotationPerEdoStep(edoStepNotationPossibilitiesList, sharpStep, sagittals)
    // console.log(edoStepNotations)
    const stringifiedEdoStepNotations = convertToSagitypeStrings(edoStepNotations, sagittals, flavor) // TODO: CLEANUP add this type back 

    return assembleAsStaffCodeInputSentence(stringifiedEdoStepNotations)
}

export {
    computeStaffCodeInputSentence,
}
