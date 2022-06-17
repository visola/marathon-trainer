import * as intervals from './intervals';

import { PACES } from './paces';

export const DISTANCE = 'DISTANCE';
export const INTERVAL = 'INTERVAL';
export const REPEAT = 'REPEAT';
export const TIME = 'TIME';

export const EXERCISE_TYPES = {
  [DISTANCE]: 'Distance',
  [INTERVAL]: 'Interval',
  [REPEAT]: 'Repeat',
  [TIME]: 'Time',
};

export const EXERCISE_TYPE_NAMES = Object.keys(EXERCISE_TYPES);

const formatMiles = (distance) => {
  if (!distance) {
    return '-';
  }

  return `${distance}miles`;
};

const formatMinutes = (time) => {
  if (!time) {
    return '-';
  }

  return `${time}minutes`;
};

const formatPace = (pace) => {
  if (!pace) {
    return 'N/A';
  }

  return PACES[pace].substring(0, 1);
};

const formatTime = (restTime) => { 
  if (!restTime) {
    return 'N/A';
  }

  return `${restTime}min`;
};

const renderInterval = (exercise) => {
  let description = '';
  if (exercise.intervalType === intervals.DISTANCE) {
    description = formatMiles(exercise.distance);
  } else {
    description = formatTime(exercise.time);
  }

  description += `@${formatPace(exercise.pace)} Rest: `;

  if (exercise.restType === intervals.DISTANCE) {
    description += formatMiles(exercise.restDistance);
  } else {
    description += formatTime(exercise.restTime);
  }

  description += `@${formatPace(exercise.restPace)}`;

  return description;
};

const renderSubExercise = (exercise) => {
  return renderExercise({
    ...exercise,
    type: exercise.subType,
  });
};

export const renderExercise = (exercise) => {
  switch(exercise.type) {
    case DISTANCE:
      return `${formatMiles(exercise.distance)}@${formatPace(exercise.pace)}`;
    case INTERVAL:
      return renderInterval(exercise);
    case REPEAT:
      return `${exercise.repeat}x (${renderSubExercise(exercise)})`;
    case TIME:
      return `${formatMinutes(exercise.time)}@${formatPace(exercise.pace)}`;
    default:
      return exercise.type;
  }
};
