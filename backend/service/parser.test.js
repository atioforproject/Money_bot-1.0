import test from "node:test";
import assert from "node:assert/strict";
import { takeNominal } from "./parser.js";

// bagian manual: kasus khusus yang kamu pilih sendiri
const kasus = [
  ["halo", null],
  ["makan 1,5jt", 1500000],
  ["transfer 500 ribu", 500000],
  ["bayar kos 1.500.000", 1500000],
];

// bagian otomatis: satu hasil benar, banyak cara menulisnya
for (const ribu of [2, 5, 20, 150, 500]) {
  const hasil = ribu * 1000;
  kasus.push([`beli bensin ${ribu}rb`, hasil]);
  kasus.push([`beli bensin ${ribu}k`, hasil]);
  kasus.push([`beli bensin ${ribu} ribu`, hasil]);
  kasus.push([`beli bensin ${ribu}.000`, hasil]);
}

for (const juta of [1, 2, 5, 10]) {
  const hasil = juta * 1000000;
  kasus.push([`gajian ${juta}jt`, hasil]);
  kasus.push([`gajian ${juta} juta`, hasil]);
  kasus.push([`gajian ${juta}.000.000`, hasil]);
}

for (const [input, hasil] of kasus) {
  test(`"${input}" -> ${hasil}`, () => {
    assert.equal(takeNominal(input), hasil);
  });
}
