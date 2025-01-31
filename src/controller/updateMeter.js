import { on } from "events";
import { CORRECTION, meters, TARIFFS, BILLS } from "../data/constants.js";

export function updateMeter(meterId, newDay, newNight, openWarning) {
  if (!meters[meterId]) {
    meters[meterId] = { day: newDay, night: newNight };
    return { meterId, bill: 0 };
  }

  let prevDay = meters[meterId].day;
  let prevNight = meters[meterId].night;

  console.log(prevDay, prevNight)

  let usedDay = Number(newDay) >= prevDay ? Number(newDay) - prevDay : CORRECTION.day;
  let usedNight = Number(newNight) >= prevNight ? Number(newNight) - prevNight : CORRECTION.night;

  if (Number(newDay) < prevDay || Number(newNight) < prevNight) {
    openWarning({
      flag: true,
      prevDay,
      prevNight,
      newDay,
      newNight,
      onConfirm: () => onConfirm(meters, meterId, getTotalDate(), prevDay + usedDay, prevNight + usedNight, () => openWarning({ flag: false })),
      onCancel: () => openWarning({ flag: false })
    });
    return null;
  }

  let bill = (usedDay * TARIFFS.day) + (usedNight * TARIFFS.night);

  console.log(usedDay, usedNight, bill)



  meters[meterId] = { date: getTotalDate(), day: prevDay + usedDay, night: prevNight + usedNight };
  console.log(meters, BILLS)
  return { meterId, bill };
}

const onConfirm = (meters, meterId, date, day, night, exit) => {
  meters[meterId] = { date, day, night };
  exit();
};

const getTotalDate = () => {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('uk-UA', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour12: false
  });

  // Отримуємо масив із частинами дати
  const parts = formatter.formatToParts(date);
  const getPart = (type) => parts.find(p => p.type === type)?.value || '00';

  // Перетворюємо у потрібний формат
  const formattedDate = `${getPart('year')}-${getPart('month')}-${getPart('day')} `;
  return formattedDate;
}