const { useState, act } = require("react");
import { renderHook, waitFor } from '@testing-library/react';

const describe = require("@jest/globals").describe;
const updateMeter = require("../controller/updateMeter.js").updateMeter;

describe('updateMeter', () => {
  test("оновлення показників існуючого лічильника", async () => {
    const { result } = renderHook(() => useState({}));
    const [paymentBill, setPaymentBill] = result.current;
    const args = ["12345", 600, 350, () => { }, setPaymentBill];

    await act(async () => {
      await updateMeter(...args);
    });

    waitFor(() => expect(paymentBill.bill).toBe((100 * 2.5) + (50 * 1.8)));
  });

  test("отримання показників від нового лічильника", async () => {
    const { result } = renderHook(() => useState({}));
    const [paymentBill, setPaymentBill] = result.current;
    const args = ["99999", 400, 200, () => { }, setPaymentBill];

    await act(async () => {
      await updateMeter(...args);
    });

    waitFor(() => expect(paymentBill.bill).toBe((400 * 2.5) + (200 * 1.8)));
  });

  test("отримання занижених показників (ніч)", async () => {
    const { result } = renderHook(() => useState({}));
    const [paymentBill, setPaymentBill] = result.current;
    const args = ["12345", 650, 250, () => { }, setPaymentBill];

    await act(async () => {
      await updateMeter(...args);
    });

    waitFor(() => expect(paymentBill.bill).toBe((150 * 2.5) + (80 * 1.8)));
  });

  test("отримання занижених показників (день)", async () => {
    const { result } = renderHook(() => useState({}));
    const [paymentBill, setPaymentBill] = result.current;
    const args = ["12345", 650, 250, () => { }, setPaymentBill];

    await act(async () => {
      await updateMeter(...args);
    });

    waitFor(() => expect(paymentBill.bill).toBe((100 * 2.5) + (20 * 1.8)));
  });

  test("отримання занижених показників (ніч)", async () => {
    const { result } = renderHook(() => useState({}));
    const [paymentBill, setPaymentBill] = result.current;

    await act(async () => {
      await updateMeter("12345", 450, 250, () => { }, setPaymentBill);
    });

    waitFor(() => expect(paymentBill.bill).toBe((100 * 2.5) + (80 * 1.8)));
  });
});
