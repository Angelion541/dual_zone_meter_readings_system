import { openDB } from "idb";

let dbInstance = null;

// Ініціалізація та кешування IndexedDB
async function getDB() {
  if (!dbInstance) {
    dbInstance = await openDB("ElectricityDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("meters")) {
          db.createObjectStore("meters", { keyPath: "meterId" });
        }
        if (!db.objectStoreNames.contains("history")) {
          db.createObjectStore("history", { keyPath: "meterId" });
        }
      },
    });
  }
  return dbInstance;
}

// Збереження даних лічильника
export async function saveDataToIndexedDB(meterData) {
  const db = await getDB();
  await db.put("meters", meterData);
}

// Збереження історії показань
export async function saveHistoryToIndexedDB(meterData) {
  const db = await getDB();

  // Отримати існуючу історію
  const existingHistory = (await db.get("history", meterData.meterId)) || { meterId: meterData.meterId, records: [] };

  // Додати новий запис в історію
  existingHistory.records.push(...(meterData.records || []));

  await db.put("history", existingHistory);
}

// Отримання історії за лічильником
export async function getHistoryFromIndexedDB(meterId) {
  const db = await getDB();
  return (await db.get("history", meterId)) || { meterId, records: [] };
}

// Отримання даних лічильника
export async function getDataFromIndexedDB(meterId) {
  const db = await getDB();
  return await db.get("meters", meterId);
}

// Початкове заповнення БД
export async function initIndexedDB() {
  const db = await getDB();
  await db.put("meters", { meterId: "12345", day: 500, night: 300 });
  await db.put("meters", { meterId: "67890", day: 700, night: 400 });

  await db.put("history", { meterId: "12345", records: [] });
  await db.put("history", { meterId: "67890", records: [] });
}
