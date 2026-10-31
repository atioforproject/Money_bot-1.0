const SATUAN = { rb: 1000, ribu: 1000, k: 1000, jt: 1000000, juta: 1000000 };

export const takeNominal = (teks) => {
  const cocok = teks
    .toLowerCase()
    .match(/(\d+(?:[.,]\d+)*)\s*(rb|ribu|k|jt|juta)?\b/);

  if (!cocok) {
    return null;
  }

  const [, angka, satuan] = cocok;

  if (satuan) {
    return Math.round(parseFloat(angka.replace(",", ".")) * SATUAN[satuan]);
  }

  return parseInt(angka.replace(/[.,]/g, ""), 10);
};
