// Filter options data:

export const selectData = ["WALL", "FLOOR", "BATHROOM", "COUNTERTOP"];

// // Color Data

// import { ApplnImgType, ColorType, QualitiesType } from "./types";

// // the color dummy Data
// export const colors: ColorType[] = [
//   { color: "BEIGE", count: 105, imgUrl: "webp-crop-new/LM02725.webp" },
//   { color: "BLACK", count: 69, imgUrl: "webp-crop-new/LM02725.webp" },
//   { color: "BROWN", count: 38, imgUrl: "webp-crop-new/LM02725.webp" },
//   { color: "EXOTIC", count: 441, imgUrl: "webp-crop-new/LM02725.webp" },
//   { color: "GREY", count: 128, imgUrl: "webp-crop-new/LM02725.webp" },
//   { color: "MULTI-COLOR", count: 3, imgUrl: "webp-crop-new/LM02725.webp" },
//   { color: "MULTICOLOUR", count: 5, imgUrl: "webp-crop-new/LM02725.webp" },
//   { color: "ONYX", count: 39, imgUrl: "webp-crop-new/LM02725.webp" },
//   { color: "TRAVERTINO", count: 19, imgUrl: "webp-crop-new/LM02725.webp" },
//   { color: "WHITE", count: 392, imgUrl: "webp-crop-new/LM02725.webp" },
// ];

// // Qualities Data
// export const qualities: QualitiesType[] = [
//   // TRAVERTINO
//   {
//     color: "TRAVERTINO",
//     qualityGroup: "BEIGE TRAVERTINO",
//     count: 6,
//     imageName: "LI00853",
//   },
//   {
//     color: "TRAVERTINO",
//     qualityGroup: "EBONY TRAVERTINO",
//     count: 2,
//     imageName: "LI00853",
//   },
//   {
//     color: "TRAVERTINO",
//     qualityGroup: "MARINA TRAVERTINO",
//     count: 1,
//     imageName: "LI00853",
//   },
//   {
//     color: "TRAVERTINO",
//     qualityGroup: "RED TRAVERTINO",
//     count: 6,
//     imageName: "LI00853",
//   },
//   {
//     color: "TRAVERTINO",
//     qualityGroup: "SILVER TRAVERTINO",
//     count: 3,
//     imageName: "LI00853",
//   },
//   {
//     color: "TRAVERTINO",
//     qualityGroup: "TITANIUM",
//     count: 1,
//     imageName: "LI00853",
//   },

//   // BEIGE
//   {
//     color: "BEIGE",
//     qualityGroup: "CREMA BEIGE",
//     count: 35,
//     imageName: "LI00853",
//   },
//   {
//     color: "BEIGE",
//     qualityGroup: "BEIGE CLASSICO",
//     count: 40,
//     imageName: "LI00853",
//   },
//   {
//     color: "BEIGE",
//     qualityGroup: "DUNE BEIGE",
//     count: 30,
//     imageName: "LI00853",
//   },

//   // BLACK
//   {
//     color: "BLACK",
//     qualityGroup: "ABSOLUTE BLACK",
//     count: 28,
//     imageName: "LI00853",
//   },
//   {
//     color: "BLACK",
//     qualityGroup: "GALAXY BLACK",
//     count: 25,
//     imageName: "LI00853",
//   },
//   {
//     color: "BLACK",
//     qualityGroup: "BLACK PEARL",
//     count: 16,
//     imageName: "LI00853",
//   },

//   // BROWN
//   {
//     color: "BROWN",
//     qualityGroup: "TROPICAL BROWN",
//     count: 14,
//     imageName: "LI00853",
//   },
//   {
//     color: "BROWN",
//     qualityGroup: "MAPLE BROWN",
//     count: 12,
//     imageName: "LI00853",
//   },
//   {
//     color: "BROWN",
//     qualityGroup: "COFFEE BROWN",
//     count: 12,
//     imageName: "LI00853",
//   },

//   // EXOTIC
//   {
//     color: "EXOTIC",
//     qualityGroup: "FUSION WOW",
//     count: 170,
//     imageName: "LI00853",
//   },
//   {
//     color: "EXOTIC",
//     qualityGroup: "RAIN FOREST GREEN",
//     count: 140,
//     imageName: "LI00853",
//   },
//   {
//     color: "EXOTIC",
//     qualityGroup: "BLUE DUNES",
//     count: 131,
//     imageName: "LI00853",
//   },

//   // GREY
//   {
//     color: "GREY",
//     qualityGroup: "GRAPHITE GREY",
//     count: 45,
//     imageName: "LI00853",
//   },
//   { color: "GREY", qualityGroup: "ASH GREY", count: 45, imageName: "LI00853" },
//   {
//     color: "GREY",
//     qualityGroup: "MOONLIGHT GREY",
//     count: 38,
//     imageName: "LI00853",
//   },

//   // MULTI-COLOR
//   {
//     color: "MULTI-COLOR",
//     qualityGroup: "RAINBOW",
//     count: 1,
//     imageName: "LI00853",
//   },
//   {
//     color: "MULTI-COLOR",
//     qualityGroup: "MIXED ELEMENTS",
//     count: 1,
//     imageName: "LI00853",
//   },
//   {
//     color: "MULTI-COLOR",
//     qualityGroup: "FANTASY BLEND",
//     count: 1,
//     imageName: "LI00853",
//   },

//   // MULTICOLOUR
//   {
//     color: "MULTICOLOUR",
//     qualityGroup: "CARNIVAL MIX",
//     count: 2,
//     imageName: "LI00853",
//   },
//   {
//     color: "MULTICOLOUR",
//     qualityGroup: "EARTHY BLEND",
//     count: 2,
//     imageName: "LI00853",
//   },
//   {
//     color: "MULTICOLOUR",
//     qualityGroup: "CELESTIAL COMBO",
//     count: 1,
//     imageName: "LI00853",
//   },

//   // ONYX
//   { color: "ONYX", qualityGroup: "PINK ONYX", count: 14, imageName: "LI00853" },
//   {
//     color: "ONYX",
//     qualityGroup: "GREEN ONYX",
//     count: 13,
//     imageName: "LI00853",
//   },
//   {
//     color: "ONYX",
//     qualityGroup: "HONEY ONYX",
//     count: 12,
//     imageName: "LI00853",
//   },

//   // WHITE
//   {
//     color: "WHITE",
//     qualityGroup: "CARRARA WHITE",
//     count: 142,
//     imageName: "LI00853",
//   },
//   {
//     color: "WHITE",
//     qualityGroup: "STATUARIO",
//     count: 135,
//     imageName: "LI00853",
//   },
//   {
//     color: "WHITE",
//     qualityGroup: "THASSOS WHITE",
//     count: 115,
//     imageName: "LI00853",
//   },
// ];

// // Application Images Data
// export const applnImgs: ApplnImgType[] = [
//   // Existing TRAVERTINO
//   {
//     code: "A00297",
//     qual: "RED TRAVERTINO",
//     appln: "WALL",
//     color: "TRAVERTINO",
//     qualityGroup: "RED TRAVERTINO",
//     filename: "A00001.jpg",
//   },
//   {
//     code: "A00297",
//     qual: "RED TRAVERTINO",
//     appln: "FLOOR",
//     color: "TRAVERTINO",
//     qualityGroup: "RED TRAVERTINO",
//     filename: "A00001.jpg",
//   },
//   {
//     code: "A00297",
//     qual: "RED TRAVERTINO",
//     appln: "BATHROOM",
//     color: "TRAVERTINO",
//     qualityGroup: "RED TRAVERTINO",
//     filename: "A00001.jpg",
//   },
//   {
//     code: "A00298",
//     qual: "RED TRAVERTINO",
//     appln: "WALL",
//     color: "TRAVERTINO",
//     qualityGroup: "RED TRAVERTINO",
//     filename: "A00001.jpg",
//   },
//   {
//     code: "A00298",
//     qual: "RED TRAVERTINO",
//     appln: "FLOOR",
//     color: "TRAVERTINO",
//     qualityGroup: "RED TRAVERTINO",
//     filename: "A00001.jpg",
//   },
//   {
//     code: "A00298",
//     qual: "RED TRAVERTINO",
//     appln: "BATHROOM",
//     color: "TRAVERTINO",
//     qualityGroup: "RED TRAVERTINO",
//     filename: "A00001.jpg",
//   },

//   // BEIGE
//   {
//     code: "A00301",
//     qual: "CREMA BEIGE",
//     appln: "WALL",
//     color: "BEIGE",
//     qualityGroup: "CREMA BEIGE",
//     filename: "A00001.jpg",
//   },
//   {
//     code: "A00301",
//     qual: "CREMA BEIGE",
//     appln: "FLOOR",
//     color: "BEIGE",
//     qualityGroup: "CREMA BEIGE",
//     filename: "A00001.jpg",
//   },

//   // BLACK
//   {
//     code: "A00412",
//     qual: "GALAXY BLACK",
//     appln: "COUNTERTOP",
//     color: "BLACK",
//     qualityGroup: "GALAXY BLACK",
//     filename: "A00001.jpg",
//   },
//   {
//     code: "A00412",
//     qual: "GALAXY BLACK",
//     appln: "WALL",
//     color: "BLACK",
//     qualityGroup: "GALAXY BLACK",
//     filename: "A00001.jpg",
//   },

//   // BROWN
//   {
//     code: "A00521",
//     qual: "MAPLE BROWN",
//     appln: "FLOOR",
//     color: "BROWN",
//     qualityGroup: "MAPLE BROWN",
//     filename: "A00001.jpg",
//   },
//   {
//     code: "A00521",
//     qual: "MAPLE BROWN",
//     appln: "WALL",
//     color: "BROWN",
//     qualityGroup: "MAPLE BROWN",
//     filename: "A00001.jpg",
//   },

//   // EXOTIC
//   {
//     code: "A00633",
//     qual: "FUSION WOW",
//     appln: "WALL",
//     color: "EXOTIC",
//     qualityGroup: "FUSION WOW",
//     filename: "A00001.jpg",
//   },
//   {
//     code: "A00633",
//     qual: "FUSION WOW",
//     appln: "COUNTERTOP",
//     color: "EXOTIC",
//     qualityGroup: "FUSION WOW",
//     filename: "A00001.jpg",
//   },

//   // GREY
//   {
//     code: "A00740",
//     qual: "ASH GREY",
//     appln: "FLOOR",
//     color: "GREY",
//     qualityGroup: "ASH GREY",
//     filename: "A00001.jpg",
//   },
//   {
//     code: "A00740",
//     qual: "ASH GREY",
//     appln: "BATHROOM",
//     color: "GREY",
//     qualityGroup: "ASH GREY",
//     filename: "A00001.jpg",
//   },

//   // MULTI-COLOR
//   {
//     code: "A00855",
//     qual: "RAINBOW",
//     appln: "WALL",
//     color: "MULTI-COLOR",
//     qualityGroup: "RAINBOW",
//     filename: "A00001.jpg",
//   },

//   // MULTICOLOUR
//   {
//     code: "A00960",
//     qual: "CARNIVAL MIX",
//     appln: "FLOOR",
//     color: "MULTICOLOUR",
//     qualityGroup: "CARNIVAL MIX",
//     filename: "A00001.jpg",
//   },

//   // ONYX
//   {
//     code: "A01070",
//     qual: "PINK ONYX",
//     appln: "BATHROOM",
//     color: "ONYX",
//     qualityGroup: "PINK ONYX",
//     filename: "A00001.jpg",
//   },
//   {
//     code: "A01070",
//     qual: "PINK ONYX",
//     appln: "COUNTERTOP",
//     color: "ONYX",
//     qualityGroup: "PINK ONYX",
//     filename: "A00001.jpg",
//   },

//   // WHITE
//   {
//     code: "A01180",
//     qual: "CARRARA WHITE",
//     appln: "WALL",
//     color: "WHITE",
//     qualityGroup: "CARRARA WHITE",
//     filename: "A00001.jpg",
//   },
//   {
//     code: "A01180",
//     qual: "CARRARA WHITE",
//     appln: "FLOOR",
//     color: "WHITE",
//     qualityGroup: "CARRARA WHITE",
//     filename: "A00001.jpg",
//   },
// ];
