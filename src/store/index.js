const DATA_ID = 'marathon-trainer-data';

import { defineStore } from 'pinia';
import { getTrainingDays } from '../model/days';

const load = () => JSON.parse(localStorage.getItem(DATA_ID) || '{"exercises": {}}');
const save = (store) => {
  const data = {
    exercises: store.exercises,
    raceDay: store.raceDay,
    targetTime: store.targetTime,
    totalWeeks: store.totalWeeks || 18,
  };

  localStorage.setItem(DATA_ID, JSON.stringify(data));
};

const copyData = (source, target) => {
  target.exercises = source.exercises || {};
  target.raceDay = source.raceDay || '';
  target.targetTime = source.targetTime || '';
  target.totalWeeks = source.totalWeeks || 18;
};

export const useStore = defineStore('main', {
  state: () => ({
    exercises: {},
    raceDay: '',
    targetTime: '',
    totalWeeks: 18,
  }),

  actions: {
    getData() {
      const data = {};
      copyData(this, data);
      return data;
    },

    initialize() {
      copyData(load(), this);
    },

    resetTo(contentAsString) {
      copyData(JSON.parse(contentAsString), this);
      save(this);
    },

    setExercisesForDate(exercises, date) {
      this.exercises[date] = exercises;
      save(this);
    },

    setRaceDay(raceDay) {
      const loaded = load();
      const oldRaceDay = loaded.raceDay;
      this.raceDay = raceDay;
      
      const oldTrainingDays = getTrainingDays(oldRaceDay, this.totalWeeks);
      oldTrainingDays.sort();

      // recalculate dates
      if (oldRaceDay !== raceDay) {
        const newExercises = {};
        const newTrainingDays = getTrainingDays(raceDay, this.totalWeeks);

        for (const d in this.exercises) {
          const indexOf = oldTrainingDays.indexOf(d);
          const newDate = newTrainingDays[indexOf];
          newExercises[newDate] = this.exercises[d];
        }

        this.exercises = newExercises;
      }

      save(this);
    },

    setTargetTime(targetTime) {
      this.targetTime = targetTime;
      save(this);
    },
  }
});
