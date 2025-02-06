import { getFromDataIDB, saveToDataIDB } from "../api/idb.js";

export async function updateMeter(meterId, newDay, newNight, openWarning = () => { }, setPaymentBill = () => { }) {
  const data = await getFromDataIDB('meter', meterId);

  const { day: prevDay, night: prevNight } = data
    ? data
    : { date: getTotalDate(), day: 0, night: 0 };

  const { day: correctionDay, night: correctionNight } = await getFromDataIDB('correction', 'correction');

  let usedDay = Number(newDay) >= prevDay
    ? Number(newDay) - prevDay
    : correctionDay;

  let usedNight = Number(newNight) >= prevNight
    ? Number(newNight) - prevNight
    : correctionNight;

  const { day: tariffsDay, night: tariffsNight } = await getFromDataIDB('tariffs', 'tariffs');

  let bill = (usedDay * tariffsDay) + (usedNight * tariffsNight);

  const newDataArray = [
    meterId,
    getTotalDate(),
    prevDay + usedDay,
    prevNight + usedNight,
    bill,
    () => {
      openWarning({ flag: false });
      setPaymentBill({ meterId, bill });
    }
  ];

  const warningObj = {
    flag: true,
    prevDay,
    prevNight,
    newDay: Number(newDay),
    newNight: Number(newNight),
    onCancel: async () => await openWarning({ flag: false }),
    onConfirm: async () => await onConfirm(...newDataArray),
  }

  if (Number(newDay) < prevDay || Number(newNight) < prevNight) {
    await openWarning(warningObj);
  } else {
    await onConfirm(...newDataArray);
  }
}

const onConfirm = async (id, date, day, night, bill, exit) => {
  await saveToDataIDB('meter', { id, date, day, night });

  await saveToDataIDB('bills', { id, bill });

  exit();
};

const getTotalDate = () => {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('uk-UA', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour12: false
  });

  const parts = formatter.formatToParts(date);
  const getPart = (type) => parts.find(p => p.type === type)?.value || '00';

  const formattedDate = `${getPart('year')}-${getPart('month')}-${getPart('day')}`;
  return formattedDate;
}