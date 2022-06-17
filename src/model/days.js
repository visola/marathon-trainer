import { DateTime } from 'luxon';

export const getTrainingDays = (raceDay, totalWeeks) => {
  const totalDays = totalWeeks * 7;
  const trainingEnd = DateTime.fromISO(raceDay);
  const trainingDays = [];
  let d = trainingEnd;
  for (let i = 0; i < totalDays; i++) {
    trainingDays.push(d.toISODate());
    d = d.minus({ days: 1 });
  }
  trainingDays.sort();
  return trainingDays;
};

export const getTrainingDaysInWeeks = (raceDay, totalWeeks) => {
  const totalDays = totalWeeks * 7;
  const trainingEnd = DateTime.fromISO(raceDay);
  const weeks = [];
  let days = [];
  let d = trainingEnd;
  let weekNumber = d.weekNumber;
  for (let i = 0; i < totalDays; i++) {
    days.push(d.toISODate());
    d = d.minus({ days: 1 });
    if (weekNumber !== d.weekNumber) {
      days.sort();
      weeks.push(days);
      days = [];
    }
    weekNumber = d.weekNumber;
  }
  weeks.sort((w1, w2) => {
    return w1[0].localeCompare(w2[0]);
  });
  return weeks;
};
