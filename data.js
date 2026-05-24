// ============================================================
// CEAT TYRES — TYRE FINISHING PRO  |  Central Data Store
// Nashik Plant  |  Version 3  |  23 May 2026
// All data persisted in localStorage under key 'ceat_data'
// ============================================================

const DEFAULT_DATA = {

  // ── SHEET 1: Master Data — NTB Angles ──────────────────────
  ntbAngles: [
    { gtCode: "101610GM", angle: 58 },
    { gtCode: "1016510LDRP", angle: 55 },
    { gtCode: "10168GM", angle: 58 },
    { gtCode: "1016GMHD", angle: null },
    { gtCode: "165D13MXL", angle: 54 },
    { gtCode: "165D13MXLRB", angle: 54 },
    { gtCode: "165D13X3D", angle: 54 },
    { gtCode: "165D13X3R", angle: 54 },
    { gtCode: "165D14MXL", angle: 51 },
    { gtCode: "165D14MXLRB", angle: 51 },
    { gtCode: "185D14 X3R", angle: 56 },
    { gtCode: "185D14MXL", angle: 56 },
    { gtCode: "185D14MXLRB", angle: 56 },
    { gtCode: "195D15BMXL", angle: 54 },
    { gtCode: "195D15BMXLR", angle: 54 },
    { gtCode: "205D14MXL", angle: 57 },
    { gtCode: "500124AYUP", angle: 58 },
    { gtCode: "5154FRMX", angle: 56 },
    { gtCode: "5154SMT", angle: 55 },
    { gtCode: "52146AYU", angle: 58 },
    { gtCode: "55164FRMX", angle: 59 },
    { gtCode: "600124AYUP", angle: 61 },
    { gtCode: "60012AYUSH+R1W", angle: 63 },
    { gtCode: "6164FRMX", angle: 58 },
    { gtCode: "6168GR", angle: 63 },
    { gtCode: "616AUSHMAN", angle: 58 },
    { gtCode: "616AUSHMANP", angle: 58 },
    { gtCode: "616HT", angle: 63 },
    { gtCode: "616SM", angle: 58 },
    { gtCode: "616TRIB", angle: 63 },
    { gtCode: "616VARDHN", angle: 58 },
    { gtCode: "65110ELV", angle: 61 },
    { gtCode: "65112ELV", angle: 61 },
    { gtCode: "651606FMXR1", angle: 56 },
    { gtCode: "651608AYU", angle: 58 },
    { gtCode: "65164FRMX", angle: 61 },
    { gtCode: "65410RXL", angle: 61 },
    { gtCode: "6548FM", angle: 61 },
    { gtCode: "65610FM", angle: 61 },
    { gtCode: "69910ELV", angle: 61 },
    { gtCode: "71212ELV", angle: 61 },
    { gtCode: "71214ELV", angle: 61 },
    { gtCode: "71216ELV", angle: 61 },
    { gtCode: "71510BMXLRB", angle: 61 },
    { gtCode: "71510FLM", angle: 61 },
    { gtCode: "71510FM", angle: 61 },
    { gtCode: "71512BMXLTL", angle: 63 },
    { gtCode: "71512HT", angle: 61 },
    { gtCode: "71512LUGPRO", angle: 63 },
    { gtCode: "71512MXL", angle: 63 },
    { gtCode: "71512RBPRO", angle: 63 },
    { gtCode: "71512X3D", angle: 61 },
    { gtCode: "71512X3R", angle: 63 },
    { gtCode: "71614ALRF", angle: 61 },
    { gtCode: "71614BMXLRB", angle: 61 },
    { gtCode: "716FM", angle: 61 },
    { gtCode: "716FMS", angle: 61 },
    { gtCode: "716LXL", angle: 61 },
    { gtCode: "7501514MXLRB", angle: 61 },
    { gtCode: "7501614LXL+HD", angle: 59 },
    { gtCode: "7501614MXLSL+HD", angle: 59 },
    { gtCode: "7501616LXLBUL", angle: 61 },
    { gtCode: "7501616MXLSL", angle: 59 },
    { gtCode: "750168VRDN", angle: 61 },
    { gtCode: "75016BULMXL", angle: 59 },
    { gtCode: "75016X3D", angle: 54 },
    { gtCode: "750610HFRMX", angle: 60 },
    { gtCode: "75168FRMX", angle: 61 },
    { gtCode: "7516HSXL", angle: 61 },
    { gtCode: "7516LXL", angle: 61 },
    { gtCode: "75612FMS", angle: 61 },
    { gtCode: "75612FMSDF", angle: 61 },
    { gtCode: "75612SM", angle: 66 },
    { gtCode: "75614FMS", angle: 61 },
    { gtCode: "75614MXLSL", angle: 61 },
    { gtCode: "75616FMS", angle: 61 },
    { gtCode: "7568AYU", angle: 61 },
    { gtCode: "7568SM", angle: 61 },
    { gtCode: "756FMS+HD", angle: 54 },
    { gtCode: "756HT", angle: 61 },
    { gtCode: "756LFMXRIB", angle: 61 },
    { gtCode: "756LUGPRO", angle: 59 },
    { gtCode: "756MXLRIB", angle: 61 },
    { gtCode: "756MXLSLSB", angle: 61 },
    { gtCode: "756RIBHD", angle: 54 },
    { gtCode: "756RIBPRO", angle: 61 },
    { gtCode: "756RXL", angle: 63 },
    { gtCode: "756STH", angle: 61 },
    { gtCode: "76510FIMP", angle: 58 },
    { gtCode: "82512ELV", angle: 61 },
    { gtCode: "8251618HCLS", angle: 56 },
    { gtCode: "82516BULMXL", angle: 56 },
    { gtCode: "82516ELV", angle: 61 },
    { gtCode: "82516LYFMX3R", angle: 61 },
    { gtCode: "825LUGPRO", angle: 56 },
    { gtCode: "825LYFMX3D", angle: 56 },
    { gtCode: "825RIBPRO", angle: 61 },
    { gtCode: "826BMXLRB", angle: 61 },
    { gtCode: "826FLM", angle: 61 },
    { gtCode: "826FMS", angle: 61 },
    { gtCode: "826LXL", angle: 61 },
    { gtCode: "826ST", angle: 61 },
    { gtCode: "F7854HT", angle: 56 }
  ],

  // ── SHEET 1: Master Data — Compound Gauge/Thickness ────────
  compounds: [
    { code: "CARTO",   gauge: "K-27",  thickness: 0.86 },
    { code: "TORINO",  gauge: "B24",   thickness: 1.00 },
    { code: "CARPE",   gauge: "K-27",  thickness: 0.86 },
    { code: "COHINO",  gauge: "K-27",  thickness: 0.94 },
    { code: "CARA",    gauge: "KU72",  thickness: 0.94 },
    { code: "CRIMI",   gauge: "K-27",  thickness: 1.12 },
    { code: "CRIB",    gauge: "K-27",  thickness: 1.08 },
    { code: "CITRA",   gauge: "K-27",  thickness: 1.08 },
    { code: "CRISH",   gauge: "K-27",  thickness: 1.12 },
    { code: "TRISH",   gauge: "B-24",  thickness: 1.12 },
    { code: "CAMEO",   gauge: "K-27",  thickness: 1.08 },
    { code: "CISCO",   gauge: "K27",   thickness: 1.20 },
    { code: "TISCO",   gauge: "B24",   thickness: 1.20 },
    { code: "CASMI",   gauge: "K-27",  thickness: 0.90 },
    { code: "AUGIO",   gauge: "SU40",  thickness: 1.20 },
    { code: "NINTO",   gauge: "B-34",  thickness: 1.20 },
    { code: "NIVEA",   gauge: "SU40",  thickness: 0.95 },
    { code: "BOSSIA",  gauge: "SU25",  thickness: 1.05 },
    { code: "BRANTO",  gauge: "SU25",  thickness: 0.90 },
    { code: "BRADO",   gauge: "SU25",  thickness: 1.15 },
    { code: "CAMPOLY", gauge: "K425",  thickness: 1.00 },
    { code: "CASTRO",  gauge: "K425",  thickness: 1.00 },
    { code: "NF66",    gauge: "K425",  thickness: 0.90 },
    { code: "CAMPLY",  gauge: "K425",  thickness: 0.90 },
    { code: "CANYLO",  gauge: "K425",  thickness: 1.20 },
    { code: "CIKA",    gauge: "K-27",  thickness: 1.05 },
    { code: "CINEA",   gauge: "KU72",  thickness: 1.05 },
    { code: "TIKA",    gauge: "B-24",  thickness: 1.05 },
    { code: "CARLI",   gauge: "K27",   thickness: 1.05 },
    { code: "TERLI",   gauge: "B24",   thickness: 1.05 },
    { code: "TREMO",   gauge: "",      thickness: 0.00 },
    { code: "CANARA",  gauge: "",      thickness: 0.00 }
  ],

  // ── SHEET 2: CONST Config ──────────────────────────────────
  constConfig: [
    { sl: 1,   gtCode: "101610GM",         drumDia: 452,    const_: "4 + 0B", plies: 4, breakers: 0, angle: 58, cmpd: ["COHINO","COHINO","COHINO","","COHINO","TIKA"] },
    { sl: 2,   gtCode: "1016510LDRP",      drumDia: 452,    const_: "4 + 0B", plies: 4, breakers: 0, angle: 55, cmpd: ["CIKA","CIKA","CIKA","","CIKA",""] },
    { sl: 3,   gtCode: "10168GM",          drumDia: 452,    const_: "4 + 0B", plies: 4, breakers: 0, angle: 58, cmpd: ["CARTO","CARTO","CARTO","","CARTO",""] },
    { sl: 4,   gtCode: "1016GMHD",         drumDia: 452,    const_: "4 + 0B", plies: 4, breakers: 0, angle: null,cmpd: ["CARA","CARA","CARA","","CARA",""] },
    { sl: 5,   gtCode: "165D13MXL",        drumDia: 363,    const_: "4 + 1B", plies: 4, breakers: 1, angle: 54, cmpd: ["CITRA","CITRA","CITRA","","TREMO",""] },
    { sl: 6,   gtCode: "165D13MXLRB",      drumDia: 363,    const_: "4 + 1B", plies: 4, breakers: 1, angle: 54, cmpd: ["CITRA","CITRA","CITRA","","TREMO",""] },
    { sl: 7,   gtCode: "165D13X3D",        drumDia: 363,    const_: "4 + 1B", plies: 4, breakers: 1, angle: 54, cmpd: ["CITRA","CITRA","CITRA","","TREMO",""] },
    { sl: 8,   gtCode: "165D13X3R",        drumDia: 363,    const_: "4 + 1B", plies: 4, breakers: 1, angle: 54, cmpd: ["CITRA","CITRA","CITRA","","TREMO",""] },
    { sl: 9,   gtCode: "165D14MXL",        drumDia: 378.5,  const_: "4 + 1B", plies: 4, breakers: 1, angle: 51, cmpd: ["CITRA","CITRA","CITRA","","TREMO",""] },
    { sl: 10,  gtCode: "165D14MXLRB",      drumDia: 378.5,  const_: "4 + 1B", plies: 4, breakers: 1, angle: 51, cmpd: ["CITRA","CITRA","CITRA","","TREMO",""] },
    { sl: 11,  gtCode: "165D14X3D",        drumDia: 378.5,  const_: "4 + 1B", plies: 4, breakers: 1, angle: null,cmpd: ["CITRA","CITRA","CITRA","","TREMO",""] },
    { sl: 12,  gtCode: "165D14X3R",        drumDia: 378.5,  const_: "4 + 1B", plies: 4, breakers: 1, angle: null,cmpd: ["CITRA","CITRA","CITRA","","TREMO",""] },
    { sl: 13,  gtCode: "185D14 X3D",       drumDia: 378.5,  const_: "4 + 1B", plies: 4, breakers: 1, angle: null,cmpd: ["CITRA","CITRA","CITRA","","TREMO",""] },
    { sl: 14,  gtCode: "185D14 X3R",       drumDia: 378.5,  const_: "4 + 1B", plies: 4, breakers: 1, angle: 56, cmpd: ["CITRA","CITRA","CITRA","","TREMO",""] },
    { sl: 15,  gtCode: "185D14MXL",        drumDia: 378.5,  const_: "4 + 1B", plies: 4, breakers: 1, angle: 56, cmpd: ["CITRA","CITRA","CITRA","","TREMO",""] },
    { sl: 16,  gtCode: "185D14MXLRB",      drumDia: 378.5,  const_: "4 + 1B", plies: 4, breakers: 1, angle: 56, cmpd: ["CITRA","CITRA","CITRA","","TREMO",""] },
    { sl: 17,  gtCode: "195D15BMXLR",      drumDia: 425,    const_: "4 + 2B", plies: 4, breakers: 2, angle: 54, cmpd: ["CIKA","CIKA","CIKA","","TREMO",""] },
    { sl: 18,  gtCode: "205D14MXL",        drumDia: 378.5,  const_: "4 + 1B", plies: 4, breakers: 1, angle: 57, cmpd: ["COHINO","COHINO","COHINO","","CANARA",""] },
    { sl: 19,  gtCode: "4194FRMX",         drumDia: 526.2,  const_: "2 + 0B", plies: 2, breakers: 0, angle: null,cmpd: ["CARA","CARA","","","",""] },
    { sl: 20,  gtCode: "500124AYUP",       drumDia: 327.5,  const_: "2 + 0B", plies: 2, breakers: 0, angle: 58, cmpd: ["CARTO","CARTO","","","",""] },
    { sl: 21,  gtCode: "5154FRMX",         drumDia: 370,    const_: "4 + 0B", plies: 4, breakers: 0, angle: 56, cmpd: ["CARA","CARA","CARA","CARA","",""] },
    { sl: 22,  gtCode: "5154SMT",          drumDia: 370,    const_: "4 + 0B", plies: 4, breakers: 0, angle: 55, cmpd: ["CARTO","CARTO","CARTO","CARTO","",""] },
    { sl: 23,  gtCode: "519BULPLUS",       drumDia: 526,    const_: "3 + 0B", plies: 3, breakers: 0, angle: null,cmpd: ["CARTO","CARTO","","","CARTO",""] },
    { sl: 24,  gtCode: "52146AYU",         drumDia: 378.5,  const_: "4 + 0B", plies: 4, breakers: 0, angle: 58, cmpd: ["CARTO","CARTO","CARTO","","CARTO",""] },
    { sl: 25,  gtCode: "55164FRMX",        drumDia: 350,    const_: "4 + 0B", plies: 4, breakers: 0, angle: 59, cmpd: ["CARTO","CARTO","CARTO","","TORINO",""] },
    { sl: 26,  gtCode: "600124AYUP",       drumDia: 327.5,  const_: "2 + 1B", plies: 2, breakers: 1, angle: 61, cmpd: ["CARTO","CARTO","","","",""] },
    { sl: 27,  gtCode: "60012AYUSH+R1W",   drumDia: 327.5,  const_: "2 + 1B", plies: 2, breakers: 1, angle: 63, cmpd: ["CARTO","CARTO","","","",""] },
    { sl: 28,  gtCode: "61606THRSHR",      drumDia: 390,    const_: "4 + 1B", plies: 4, breakers: 1, angle: null,cmpd: ["CARTO","CARTO","CARTO","","",""] },
    { sl: 29,  gtCode: "6164FRMX",         drumDia: 450,    const_: "4 + 1B", plies: 4, breakers: 1, angle: 58, cmpd: ["CARTO","CARTO","CARTO","","TORINO",""] },
    { sl: 30,  gtCode: "6168GR",           drumDia: 450,    const_: "4 + 1B", plies: 4, breakers: 1, angle: 63, cmpd: ["TORINO","TORINO","TORINO","","TORINO","TRISH"] },
    { sl: 31,  gtCode: "616AUSHMAN",       drumDia: 450,    const_: "4 + 1B", plies: 4, breakers: 1, angle: 58, cmpd: ["CARTO","CARTO","CARTO","","TORINO",""] },
    { sl: 32,  gtCode: "616AUSHMANP",      drumDia: 450,    const_: "4 + 1B", plies: 4, breakers: 1, angle: 58, cmpd: ["CARTO","CARTO","CARTO","","TORINO",""] },
    { sl: 33,  gtCode: "616HT",            drumDia: 450,    const_: "4 + 1B", plies: 4, breakers: 1, angle: 63, cmpd: ["TORINO","TORINO","TORINO","","TORINO","TRISH"] },
    { sl: 34,  gtCode: "616SM",            drumDia: 450,    const_: "4 + 1B", plies: 4, breakers: 1, angle: 58, cmpd: ["CARPE","CARPE","CARPE","","CARPE",""] },
    { sl: 35,  gtCode: "616TRIB",          drumDia: 450,    const_: "4 + 1B", plies: 4, breakers: 1, angle: 63, cmpd: ["TIKA","TIKA","TIKA","TIKA","TIKA","TRISH"] },
    { sl: 36,  gtCode: "616VARDHN",        drumDia: 450,    const_: "4 + 1B", plies: 4, breakers: 1, angle: 58, cmpd: ["CARTO","CARTO","CARTO","","TORINO",""] },
    { sl: 37,  gtCode: "619BULPLUS",       drumDia: 540,    const_: "3 + 1B", plies: 3, breakers: 1, angle: null,cmpd: ["CARTO","CARTO","","","CARTO",""] },
    { sl: 38,  gtCode: "65110ELV",         drumDia: 292,    const_: "4 + 0B", plies: 4, breakers: 0, angle: 61, cmpd: ["CINEA","CINEA","CINEA","","TIKA","TRISH"] },
    { sl: 39,  gtCode: "65112ELV",         drumDia: 292,    const_: "6 + 0B", plies: 6, breakers: 0, angle: 61, cmpd: ["CINEA","CINEA","CINEA","","TRISH","TRISH"] },
    { sl: 40,  gtCode: "651606FMXR1",      drumDia: 450,    const_: "4 + 0B", plies: 4, breakers: 0, angle: 56, cmpd: ["CARA","CARA","CARA","","TORINO",""] },
    { sl: 41,  gtCode: "651608AYU",        drumDia: 450,    const_: "4 + 0B", plies: 4, breakers: 0, angle: 58, cmpd: ["CARTO","CARTO","CARTO","","TORINO",""] },
    { sl: 42,  gtCode: "65164FRMX",        drumDia: 450,    const_: "4 + 0B", plies: 4, breakers: 0, angle: 61, cmpd: ["CARTO","CARTO","CARTO","","TORINO",""] },
    { sl: 43,  gtCode: "65410RXL",         drumDia: 378.5,  const_: "4 + 2B", plies: 4, breakers: 2, angle: 61, cmpd: ["CRISH","CRISH","CRISH","","TRISH","TORINO"] },
    { sl: 44,  gtCode: "6548FM",           drumDia: 378.5,  const_: "4 + 2B", plies: 4, breakers: 2, angle: 61, cmpd: ["TORINO","TORINO","TORINO","","TORINO","TRISH"] },
    { sl: 45,  gtCode: "65610FM",          drumDia: 450,    const_: "4 + 2B", plies: 4, breakers: 2, angle: 61, cmpd: ["CRISH","CRISH","CRISH","","TRISH","TORINO"] },
    { sl: 46,  gtCode: "69910ELV",         drumDia: 272.293,const_: "4 + 0B", plies: 4, breakers: 0, angle: 61, cmpd: ["CINEA","CINEA","CINEA","","TIKA","TRISH"] },
    { sl: 47,  gtCode: "71212ELV",         drumDia: 355.6,  const_: "4 + 0B", plies: 4, breakers: 0, angle: 61, cmpd: ["CINEA","CINEA","CINEA","","TIKA","TRISH"] },
    { sl: 48,  gtCode: "71214ELV",         drumDia: 355.6,  const_: "4 + 1B", plies: 4, breakers: 1, angle: 61, cmpd: ["CINEA","CINEA","CINEA","","TIKA","TORINO"] },
    { sl: 49,  gtCode: "71216ELV",         drumDia: 355.6,  const_: "4 + 1B", plies: 4, breakers: 1, angle: 61, cmpd: ["CRISH","CRISH","CRISH","","CANARA","TIKA"] },
    { sl: 50,  gtCode: "71510BMXLRB",      drumDia: 425,    const_: "5 + 2B", plies: 5, breakers: 2, angle: 61, cmpd: ["CRISH","CRISH","CRISH","CRISH","TRISH","TRISH"] },
    { sl: 51,  gtCode: "71510FLM",         drumDia: 425,    const_: "5 + 2B", plies: 5, breakers: 2, angle: 61, cmpd: ["CRISH","CRISH","CRISH","CRISH","TRISH","TRISH"] },
    { sl: 52,  gtCode: "71510FM",          drumDia: 425,    const_: "5 + 2B", plies: 5, breakers: 2, angle: 61, cmpd: ["CRISH","CRISH","CRISH","CRISH","TRISH","CISCO"] },
    { sl: 53,  gtCode: "71512BMXLTL",      drumDia: 425,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 63, cmpd: ["CRISH","CRISH","CRISH","CRISH","TRISH","TRISH"] },
    { sl: 54,  gtCode: "71512HT",          drumDia: 425,    const_: "5 + 2B", plies: 5, breakers: 2, angle: 61, cmpd: ["CRISH","CRISH","CRISH","CRISH","TRISH","CISCO"] },
    { sl: 55,  gtCode: "71512LUGPRO",      drumDia: 425,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 63, cmpd: ["CRISH","CRISH","CRISH","CRISH","TRISH","TRISH"] },
    { sl: 56,  gtCode: "71512MXL",         drumDia: 425,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 63, cmpd: ["COHINO","COHINO","COHINO","","TORINO","TORINO"] },
    { sl: 57,  gtCode: "71512RBPRO",       drumDia: 425,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 63, cmpd: ["CRISH","CRISH","CRISH","CRISH","TRISH","TRISH"] },
    { sl: 58,  gtCode: "71512X3D",         drumDia: 425,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CISCO","CISCO","CISCO","CISCO","CISCO","CISCO"] },
    { sl: 59,  gtCode: "71512X3R",         drumDia: 425,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 63, cmpd: ["CRISH","CRISH","CRISH","CRISH","TRISH","TRISH"] },
    { sl: 60,  gtCode: "71614ALRF",        drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["COHINO","COHINO","COHINO","","TORINO","TORINO"] },
    { sl: 61,  gtCode: "71614BMXLRB",      drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CRISH","CRISH","CRISH","CRISH","TRISH","TRISH"] },
    { sl: 62,  gtCode: "716FM",            drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CRISH","CRISH","CRISH","CRISH","TRISH","TRISH"] },
    { sl: 63,  gtCode: "716FMS",           drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CRISH","CRISH","CRISH","CRISH","TRISH","TRISH"] },
    { sl: 64,  gtCode: "716LXL",           drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CRISH","CRISH","CRISH","CRISH","TRISH","TRISH"] },
    { sl: 65,  gtCode: "719BUL",           drumDia: 526.2,  const_: "4 + 0B", plies: 4, breakers: 0, angle: null,cmpd: ["CARTO","CARTO","CARTO","","TORINO",""] },
    { sl: 66,  gtCode: "719BULPLUS",       drumDia: 526.2,  const_: "4 + 0B", plies: 4, breakers: 0, angle: null,cmpd: ["CARTO","CARTO","CARTO","","CARTO",""] },
    { sl: 67,  gtCode: "7501514MXLRB",     drumDia: 425,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TIKA","CISCO"] },
    { sl: 68,  gtCode: "7501614LXL+HD",    drumDia: 508.2,  const_: "6 + 2B", plies: 6, breakers: 2, angle: 59, cmpd: ["CISCO","CISCO","CISCO","CISCO","TISCO","TISCO"] },
    { sl: 69,  gtCode: "7501614MXLSL+HD",  drumDia: 508.2,  const_: "6 + 2B", plies: 6, breakers: 2, angle: 59, cmpd: ["CISCO","CISCO","CISCO","CISCO","TISCO","TISCO"] },
    { sl: 70,  gtCode: "7501616LXLBUL",    drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TIKA","CISCO"] },
    { sl: 71,  gtCode: "7501616MXLSL",     drumDia: 508.2,  const_: "6 + 2B", plies: 6, breakers: 2, angle: 59, cmpd: ["CISCO","CISCO","CISCO","CISCO","TISCO","TISCO"] },
    { sl: 72,  gtCode: "750168VRDN",       drumDia: 450,    const_: "4 + 0B", plies: 4, breakers: 0, angle: 61, cmpd: ["CARTO","CARTO","CARTO","","CANARA",""] },
    { sl: 73,  gtCode: "75016BULMXL",      drumDia: 508.2,  const_: "6 + 2B", plies: 6, breakers: 2, angle: 59, cmpd: ["CISCO","CISCO","CISCO","CISCO","TISCO","TISCO"] },
    { sl: 74,  gtCode: "75016X3D",         drumDia: 508,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 54, cmpd: ["CISCO","CISCO","CISCO","CISCO","TISCO","TISCO"] },
    { sl: 75,  gtCode: "750610HFRMX",      drumDia: 450,    const_: "4 + 0B", plies: 4, breakers: 0, angle: 60, cmpd: ["CINEA","CINEA","CINEA","","TORINO","TRISH"] },
    { sl: 76,  gtCode: "75168FRMX",        drumDia: 450,    const_: "4 + 0B", plies: 4, breakers: 0, angle: 61, cmpd: ["CARTO","CARTO","CARTO","","TORINO",""] },
    { sl: 77,  gtCode: "7516HSXL",         drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TIKA","CISCO"] },
    { sl: 78,  gtCode: "7516LXL",          drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TIKA","CISCO"] },
    { sl: 79,  gtCode: "75188FRMX",        drumDia: 530.7,  const_: "4 + 0B", plies: 4, breakers: 0, angle: null,cmpd: ["CARA","CARA","CARA","","TORINO",""] },
    { sl: 80,  gtCode: "75612FMS",         drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["COHINO","COHINO","COHINO","","TORINO","TORINO"] },
    { sl: 81,  gtCode: "75612FMSDF",       drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TIKA","CISCO"] },
    { sl: 82,  gtCode: "75612SM",          drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 66, cmpd: ["COHINO","COHINO","COHINO","","TORINO","TORINO"] },
    { sl: 83,  gtCode: "75614FMS",         drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TORINO","TRISH"] },
    { sl: 84,  gtCode: "75614MXLSL",       drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TIKA","CISCO"] },
    { sl: 85,  gtCode: "75616FMS",         drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TIKA","CISCO"] },
    { sl: 86,  gtCode: "7568AYU",          drumDia: 450,    const_: "6 + 0B", plies: 6, breakers: 0, angle: 61, cmpd: ["CARTO","CARTO","CARTO","","TORINO","CISCO"] },
    { sl: 87,  gtCode: "7568SM",           drumDia: 450,    const_: "6 + 0B", plies: 6, breakers: 0, angle: 61, cmpd: ["CARTO","CARTO","CARTO","","TORINO","CISCO"] },
    { sl: 88,  gtCode: "756FMS+HD",        drumDia: 508,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 54, cmpd: ["CISCO","CISCO","CISCO","CISCO","TISCO","TISCO"] },
    { sl: 89,  gtCode: "756HT",            drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["TIKA","TIKA","TIKA","TIKA","TIKA","TIKA"] },
    { sl: 90,  gtCode: "756LFMXRIB",       drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TIKA","TORINO"] },
    { sl: 91,  gtCode: "756LUGPRO",        drumDia: 508,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 59, cmpd: ["CISCO","CISCO","CISCO","CISCO","TISCO","TISCO"] },
    { sl: 92,  gtCode: "756MXLRIB",        drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TIKA","TORINO"] },
    { sl: 93,  gtCode: "756MXLSLSB",       drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TORINO","TRISH"] },
    { sl: 94,  gtCode: "756RIBHD",         drumDia: 508,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 54, cmpd: ["CISCO","CISCO","CISCO","CISCO","TISCO","TISCO"] },
    { sl: 95,  gtCode: "756RIBPRO",        drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TIKA","TORINO"] },
    { sl: 96,  gtCode: "756RXL",           drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 63, cmpd: ["CIKA","CIKA","CIKA","","TIKA","TRISH"] },
    { sl: 97,  gtCode: "756STH",           drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["TIKA","TIKA","TIKA","TIKA","TIKA","TIKA"] },
    { sl: 98,  gtCode: "76510FIMP",        drumDia: 425,    const_: "4 + 0B", plies: 4, breakers: 0, angle: 58, cmpd: ["CARTO","CARTO","CARTO","CARTO","",""] },
    { sl: 99,  gtCode: "800184AYU",        drumDia: 530.573,const_: "4 + 0B", plies: 4, breakers: 0, angle: null,cmpd: ["CARTO","CARTO","CARTO","","TORINO",""] },
    { sl: 100, gtCode: "8184AYU",          drumDia: 530.573,const_: "4 + 0B", plies: 4, breakers: 0, angle: null,cmpd: ["CARTO","CARTO","CARTO","","TORINO",""] },
    { sl: 101, gtCode: "819SM",            drumDia: 526.2,  const_: "6 + 0B", plies: 6, breakers: 0, angle: null,cmpd: ["CARTO","CARTO","CARTO","","CARTO","CISCO"] },
    { sl: 102, gtCode: "82512ELV",         drumDia: 425,    const_: "6 + 0B", plies: 6, breakers: 0, angle: 61, cmpd: ["CINEA","CINEA","CINEA","","TORINO","TORINO"] },
    { sl: 103, gtCode: "8251618HCLS",      drumDia: 508,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 56, cmpd: ["CISCO","CISCO","CISCO","CISCO","TISCO","TISCO"] },
    { sl: 104, gtCode: "82516BULMXL",      drumDia: 508.2,  const_: "6 + 2B", plies: 6, breakers: 2, angle: 56, cmpd: ["CISCO","CISCO","CISCO","CISCO","TISCO","TISCO"] },
    { sl: 105, gtCode: "82516ELV",         drumDia: 425,    const_: "6 + 0B", plies: 6, breakers: 0, angle: 61, cmpd: ["CINEA","CINEA","CINEA","","TIKA","TRISH"] },
    { sl: 106, gtCode: "82516LYFMX3R",     drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TRISH","TRISH"] },
    { sl: 107, gtCode: "825LUGPRO",        drumDia: 508,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 56, cmpd: ["CISCO","CISCO","CISCO","CISCO","TISCO","TISCO"] },
    { sl: 108, gtCode: "825LYFMX3D",       drumDia: 508,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 56, cmpd: ["CISCO","CISCO","CISCO","CISCO","TISCO","TISCO"] },
    { sl: 109, gtCode: "825RIBPRO",        drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TRISH","TRISH"] },
    { sl: 110, gtCode: "826BMXLRB",        drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TRISH","TRISH"] },
    { sl: 111, gtCode: "826FLM",           drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TRISH","TRISH"] },
    { sl: 112, gtCode: "826FMS",           drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TRISH","TRISH"] },
    { sl: 113, gtCode: "826LXL",           drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["CIKA","CIKA","CIKA","","TRISH","TIKA"] },
    { sl: 114, gtCode: "826ST",            drumDia: 450,    const_: "6 + 2B", plies: 6, breakers: 2, angle: 61, cmpd: ["TIKA","TIKA","TIKA","TIKA","TRISH","TRISH"] },
    { sl: 115, gtCode: "F7854HT",          drumDia: 425,    const_: "4 + 0B", plies: 4, breakers: 0, angle: 56, cmpd: ["CASMI","CASMI","CASMI","","CASMI",""] }
  ],

  // ── Tyre Finishing rows (up to 100) ────────────────────────
  tyreFinishingRows: Array.from({length: 100}, (_, i) => ({
    sl: i + 1,
    gtCode: "",
    noOfTyres: "",
    servicer: ["","","","","",""],
    buildup: "",
    inventoryServicer: "",
    inventoryLetoff: "",
    inventoryFloor: "",
    inventoryBias: ""
  }))
};

// ── Storage helpers ─────────────────────────────────────────
function loadData() {
  try {
    const raw = localStorage.getItem('ceat_data');
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
    const saved = JSON.parse(raw);
    // Merge so new defaults fill missing keys
    return Object.assign(JSON.parse(JSON.stringify(DEFAULT_DATA)), saved);
  } catch(e) {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData(data) {
  localStorage.setItem('ceat_data', JSON.stringify(data));
}

// ── Core calculation engine ─────────────────────────────────
function getThickness(compounds, code) {
  if (!code || code.trim() === "") return 0;
  const c = compounds.find(x => x.code === code.trim());
  return c ? c.thickness : 0;
}

function calcPlyCuts(drumDia, angle, plies, thicknesses, noOfTyres) {
  if (!drumDia || !angle || !plies || !noOfTyres) return Array(6).fill(0);
  const rad = angle * Math.PI / 180;
  const sinA = Math.sin(rad);
  const result = [];
  let cumThick = 0;
  for (let i = 0; i < 6; i++) {
    if (i < plies) {
      const effDia = drumDia + 2 * cumThick;
      const cuts = (1400 * sinA) / (effDia * Math.PI) * noOfTyres;
      result.push(Math.round(cuts * 100) / 100);
      cumThick += (thicknesses[i] || 0);
    } else {
      result.push(null);
    }
  }
  return result;
}

function getConstConfig(data, gtCode) {
  return data.constConfig.find(r => r.gtCode === gtCode) || null;
}

function computeThicknesses(data, cfg) {
  if (!cfg) return [0,0,0,0,0,0];
  return cfg.cmpd.map(c => getThickness(data.compounds, c));
}
