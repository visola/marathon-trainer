const DATA_ID = 'marathon-trainer-data';

import { defineStore } from 'pinia';

const load = () => JSON.parse(localStorage.getItem(DATA_ID) || '{"exercises": {}}');
const save = (store) => {
  const data = {
    exercises: store.exercises,
    raceDay: store.raceDay,
    targetTime: store.targetTime,
  };

  localStorage.setItem(DATA_ID, JSON.stringify(data));
};

export const useStore = defineStore('main', {
  state: () => ({
    exercises: {},
    raceDay: '',
    targetTime: '',
  }),

  actions: {
    initialize() {
      const loaded = load();

      this.exercises = loaded.exercises || {};
      this.raceDay = loaded.raceDay || '';
      this.targetTime = loaded.targetTime || '';
    },

    setExercisesForDate(exercises, date) {
      this.exercises[date] = exercises;
      save(this);
    },

    setRaceDay(raceDay) {
      this.raceDay = raceDay;
      save(this);
    },

    setTargetTime(targetTime) {
      this.targetTime = targetTime;
      save(this);
    },
  }
});
