import { PACES } from './paces';

export const DISTANCE = 'DISTANCE';
export const INTERVALS = 'INTERVALS';

export const EXERCISE_TYPES = {
  [DISTANCE]: 'Distance',
  [INTERVALS]: 'Intervals',
};

export const EXERCISE_TYPE_NAMES = Object.keys(EXERCISE_TYPES);

export const renderExercise = (exercise) => {
  switch(exercise.type) {
    case 'DISTANCE':
      return `${exercise.distance} mi @ ${PACES[exercise.pace]}`;
    default:
      return 'N/A';
  }
};