// src/utils/colorRules.js

// Helper umum → mengubah kategori menjadi warna Tailwind
const colorByLevel = (level) => {
  if (level === "low") return "text-green-600";
  if (level === "medium") return "text-yellow-500";
  return "text-red-600";
};

// ======== CO2 ========
export const getCO2Color = (v) => {
  if (v >= 400 && v <= 450) return colorByLevel("low");
  if (v > 450 && v <= 1000) return colorByLevel("medium");
  if (v > 1000) return colorByLevel("high");
  return "text-gray-400";
};

// ======== CH4 ========
export const getCH4Color = (v) => {
  if (v >= 1.8 && v <= 2) return colorByLevel("low");
  if (v > 2 && v <= 5) return colorByLevel("medium");
  if (v > 5) return colorByLevel("high");
  return "text-gray-400";
};

// ======== SUHU ========
export const getSuhuColor = (v) => {
  if (v >= 22 && v <= 28) return colorByLevel("low");
  if (v > 28 && v <= 32) return colorByLevel("medium");
  if (v > 32 && v <= 35) return colorByLevel("high");
  return "text-gray-400";
};

// ======== KELEMBAPAN ========
export const getKelembapanColor = (v) => {
  if (v >= 40 && v <= 60) return colorByLevel("low");
  if (v > 60 && v <= 80) return colorByLevel("medium");
  if (v > 80) return colorByLevel("high");
  return "text-gray-400";
};

// ======== H2O ========
export const getH2OColor = (v) => {
  if (v <= 0.015) return colorByLevel("low");
  if (v > 0.015 && v <= 0.022) return colorByLevel("medium");
  if (v > 0.022 && v <= 0.030) return colorByLevel("high");
  return "text-gray-400";
};

// ======== TEKANAN ========
export const getTekananColor = (v) => {
  if (v >= 100 && v <= 102) return colorByLevel("low");
  if (v > 102 && v <= 104) return colorByLevel("medium");
  if (v > 105) return colorByLevel("high");
  return "text-gray-400";
};

// ======== PM2.5 ========
export const getPM25Color = (v) => {
  if (v >= 0 && v <= 15.5) return colorByLevel("low");
  if (v > 15.5 && v <= 55.4) return colorByLevel("medium");
  if (v > 55.5) return colorByLevel("high");
  return "text-gray-400";
};

// ======== VOC ========
export const getVOCColor = (v) => {
  if (v < 100) return colorByLevel("low");
  if (v >= 100 && v <= 500) return colorByLevel("medium");
  if (v > 500) return colorByLevel("high");
  return "text-gray-400";
};
