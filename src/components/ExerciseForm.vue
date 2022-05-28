<script setup>
import { ref } from 'vue';

import DistanceRunExerciseForm from './DistanceRunExerciseForm.vue';
import RepeatExerciseForm from './RepeatExerciseForm.vue';

import {
  DISTANCE,
  EXERCISE_TYPES,
  EXERCISE_TYPE_NAMES,
  REPEAT,
} from '../model/exercises';

import { useStore } from '../store';

const props = defineProps(['day']);
const store = useStore();

const exercisesForDay = ref(store.exercises[props.day] || []);

const handleAdd = () => {
  exercisesForDay.value.push({ type: EXERCISE_TYPE_NAMES[0] });
};

const handleChangeType = (event, exercise, index) => {
  handleExerciseChange({
    ...exercise,
    type: event.target.value,
  }, index);
};

const handleExerciseChange = (exercise, index) => {
  exercisesForDay.value[index] = exercise;
  store.setExercisesForDate(exercisesForDay.value, props.day);
};
</script>

<template>
  <button class="btn btn-primary" @click="handleAdd">Add</button>

  <div class="exercise-row" v-for="(exercise, index) in exercisesForDay" :key="`${day}-${index}`">
    <div class="input-group">
      <label class="form-label">Exercise Type:</label>
      <select class="form-select" :value="exercise.type" @change="(event) => handleChangeType(event, exercise, index)">
        <option v-for="(label, type) in EXERCISE_TYPES" :key="type" :value="type">
          {{ label }}
        </option>
      </select>
    </div>

    <DistanceRunExerciseForm
      v-if="exercise.type === DISTANCE"
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
  margin-right: 12px;
  min-width: 12vw;
}

.exercise-row .input-group .form-label {
  margin-right: 10px;
}
</style>