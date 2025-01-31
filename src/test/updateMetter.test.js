import { updateMeter } from "../controller/updateMeter.js";

test("оновлення показників існуючого лічильника", () => {
  let result = updateMeter("12345", 600, 350);
  expect(result.bill).toBe((100 * 2.5) + (50 * 1.8));
});

test("отримання показників від нового лічильника", () => {
  let result = updateMeter("99999", 400, 200);
  expect(result.bill).toBe(0);
});

test("отримання занижених показників (ніч)", () => {
  // 600 350
  let result = updateMeter("12345", 650, 250);
  expect(result.bill).toBe((50 * 2.5) + (80 * 1.8));
});

test("отримання занижених показників (день)", () => {
  // 650 430
  let result = updateMeter("12345", 450, 450);
  expect(result.bill).toBe((100 * 2.5) + (20 * 1.8));
});

test("отримання занижених показників (ніч)", () => {
  // 750 450
  let result = updateMeter("12345", 450, 250);
  expect(result.bill).toBe((100 * 2.5) + (80 * 1.8));
});