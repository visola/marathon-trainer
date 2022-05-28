import { render } from 'vue';
import { PACES } from './paces';

export const DISTANCE = 'DISTANCE';
export const INTERVALS = 'INTERVALS';
export const REPEAT = 'REPEAT';

export const EXERCISE_TYPES = {
  [DISTANCE]: 'Distance',
  [INTERVALS]: 'Intervals',
  [REPEAT]: 'Repeat',
};

export const EXERCISE_TYPE_NAMES = Object.keys(EXERCISE_TYPES);

const renderSubExercise = (exercise) => {
  return renderExercise({
    ...exercise,
    type: exercise.subType,
  });
};

export const renderExercise = (exercise) => {
  switch(exercise.type) {
    case 'DISTANCE':
      return `${exercise.distance} mi @ ${PACES[exercise.pace]}`;
    case 'REPEAT':
      return `${exercise.repeat}x (${renderSubExercise(exercise)})`;
    default:
      return exercise.type;
  }
};
