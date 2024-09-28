// ordered according to the order they should appear on the Xen wiki page
enum DiagramType {
    GENERAL,
    EVO,
    REVO,
    ALTERNATE_EVO,
    EVO_SZ,
}

enum DifferenceCase {
    _1_ALL_DIFFERENT,
    _1A_ALL_DIFFERENT_REVO_COULD_BE_EVO,
    _2_NONE_DIFFERENT,
    _3_REVO_DIFFERENT,
    _3A_REVO_DIFFERENT_REVO_COULD_BE_EVO,
    _4_EVO_SZ_DIFFERENT,
}

export {
    DiagramType,
    DifferenceCase,
}
