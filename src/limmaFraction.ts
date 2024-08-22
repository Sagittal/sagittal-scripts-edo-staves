import { Edo, NonSubsetNotationDefinition } from "./types";
import { EDO_NOTATION_DEFINITIONS } from "./definitions"; 

const computeIsLimmaFraction = (notationEdo: Edo): boolean => 
    !!(<NonSubsetNotationDefinition>EDO_NOTATION_DEFINITIONS[notationEdo]).isLimmaFraction

export {
    computeIsLimmaFraction,
}
