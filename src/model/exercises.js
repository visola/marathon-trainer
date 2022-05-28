import { PACES } from './paces';

export const DISTANCE = 'DISTANCE';
export const DISTANCE_INTERVAL = 'DISTANCE_INTERVAL';
export const REPEAT = 'REPEAT';

export const EXERCISE_TYPES = {
  [DISTANCE]: 'Distance',
  [DISTANCE_INTERVAL]: 'Distance Interval',
  [REPEAT]: 'Repeat',
};

export const EXERCISE_TYPE_NAMES = Object.keys(EXERCISE_TYPES);

const formatMiles = (distance) => {
  if (!distance) {
    return '-';
  }

  return `${distance}mi`;
};

const formatPace = (pace) => {
  if (!pace) {
    return 'N/A';
  }

  return PACES[pace].substring(0, 1);
};

const formatRestTime = (restTime) => { 
  if (!restTime) {
    return 'N/A';
  }

  return `${restTime}m`;
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
    case DISTANCE_INTERVAL:
      return `${formatMiles(exercise.distance)}@${formatPace(exercise.pace)} w/ ${formatRestTime(exercise.restTime)}`;
    case REPEAT:
      return `${exercise.repeat}x (${renderSubExercise(exercise)})`;
    default:
      return exercise.type;
  }
};
