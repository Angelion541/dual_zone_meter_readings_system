import { BILLS, CORRECTION, METER, TARIFFS } from "../data/constants";
import { openDB } from "idb";

const version = 1;

async function initializeDictsIdb() {
  let isTariffsExist = true;
  let isCorrectionExist = true;
  let isBillsExist = true;
  let isMeterExist = true;

  let db = await openDB("ElectricityDB", version, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("tariffs")) {
        db.createObjectStore("tariffs", { keyPath: "id" });
        isTariffsExist = false;
      }
      if (!db.objectStoreNames.contains("correction")) {
        db.createObjectStore("correction", { keyPath: "id" });
        isCorrectionExist = false;
      }
      if (!db.objectStoreNames.contains("bills")) {
        db.createObjectStore("bills", { keyPath: "id" });
        isBillsExist = false;
      }
      if (!db.objectStoreNames.contains("meter")) {
        db.createObjectStore("meter", { keyPath: "id" });
        isMeterExist = false;
      }
    }
  });

  if (!isTariffsExist) {
    await db.put("tariffs", TARIFFS);
  }
  if (!isCorrectionExist) {
    await db.put("correction", CORRECTION);
  }
  if (!isBillsExist) {
    BILLS.forEach(async item => {
      await db.put("bills", item);
    });
  }
  if (!isMeterExist) {
    METER.forEach(async item => {
      await db.put("meter", item);
    });
  }
  return db;
}

export async function saveToDataIDB(table, data) {
  const db = await initializeDictsIdb();
  await db.put(table, data);
  db.close();
}

export async function getFromDataIDB(table, id) {
  const db = await initializeDictsIdb();
  let data = null;
  try {
    data = await db.get(table, id);
  } catch (error) {
  }

  db.close();
  return data;
}