<script setup>
import DistanceExerciseForm from './DistanceExerciseForm.vue';
import IntervaExerciseForm from './IntervaExerciseForm.vue';
import RepeatExerciseForm from './RepeatExerciseForm.vue';

import {
  DISTANCE,
  EXERCISE_TYPES,
  EXERCISE_TYPE_NAMES,
  INTERVAL,
  REPEAT,
} from '../model/exercises';

import { useStore } from '../store';

const props = defineProps(['day']);
const store = useStore();

const getExercisesForDay = () => {
  return store.exercises[props.day] || [];
};

const handleAdd = () => {
  handleExerciseChange({ type: EXERCISE_TYPE_NAMES[0] }, getExercisesForDay().length);
};

const handleChangeType = (event, exercise, index) => {
  handleExerciseChange({
    ...exercise,
    type: event.target.value,
  }, index);
};

const handleExerciseChange = (exercise, index) => {
  const e = getExercisesForDay();
  e[index] = exercise;
  store.setExercisesForDate(e, props.day);
};

const removeExercise = (index) => {
  let e = getExercisesForDay();
  e.splice(index, 1);
  store.setExercisesForDate(e, props.day);
};
</script>

<template>
  <button class="btn btn-primary" @click="handleAdd">Add</button>

  <div class="exercise-row" v-for="(exercise, index) in getExercisesForDay()" :key="`${day}-${index}`">
    <i class="action clear bi bi-trash" @click="() => removeExercise(index)"></i>

    <div class="input-group">
      <label class="form-label">Exercise Type:</label>
      <select class="form-select" :value="exercise.type" @change="(event) => handleChangeType(event, exercise, index)">
        <option v-for="(label, type) in EXERCISE_TYPES" :key="type" :value="type">
          {{ label }}
        </option>
      </select>
    </div>

    <DistanceExerciseForm
      v-if="exercise.type === DISTANCE"
      @change="(e) => handleExerciseChange({...exercise, ...e}, index)"
      :exercise="exercise"
    />

    <IntervaExerciseForm
      v-if="exercise.type === INTERVAL"
      @change="(e) => handleExerciseChange({...exercise, ...e}, index)"
      :exercise="exercise"
    />

    <RepeatExerciseForm
      v-if="exercise.type === REPEAT"
      @change="(e) => handleExerciseChange({...exercise, ...e}, index)"
      :exercise="exercise"
    />
  </div>
</template>

<style scoped>
.exercise-row {
  align-items: center;
  border-bottom: 2px solid #ddd;
  display: flex;
  justify-content: flex-start;
  padding: 2vh 0;
}

.exercise-row:last-of-type {
  border-bottom: none;
}
</style>

<style>
.exercise-row .input-group {
  align-items: center;
  margin-bottom: unset;
  margin-right: 12px;
  min-width: 12vw;
}

.exercise-row .input-group .form-label {
  margin-right: 10px;
}
</style>