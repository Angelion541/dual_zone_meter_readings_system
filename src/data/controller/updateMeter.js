import { meters } from "../meters.js";

function updateMeter(meterId, newDay, newNight) {
  if (!meters[meterId]) {
    meters[meterId] = { day: newDay, night: newNight };
    return { meterId, bill: 0 };
  }

  let prevDay = meters[meterId].day;
  let prevNight = meters[meterId].night;

  let usedDay = newDay >= prevDay ? newDay - prevDay : CORRECTION.day;
  let usedNight = newNight >= prevNight ? newNight - prevNight : CORRECTION.night;

  let bill = (usedDay * TARIFFS.day) + (usedNight * TARIFFS.night);

  meters[meterId] = { day: newDay, night: newNight };
  return { meterId, bill };
}

test("оновлення показників існуючого лічильника", () => {
  let result = updateMeter("12345", 600, 350);
  expect(result.bill).toBe((100 * 2.5) + (50 * 1.8));
});

test("отримання показників від нового лічильника", () => {
  let result = updateMeter("99999", 400, 200);
  expect(result.bill).toBe(0);
});

test("отримання занижених показників (ніч)", () => {
  let result = updateMeter("12345", 650, 250);
  expect(result.bill).toBe((50 * 2.5) + (80 * 1.8));
});