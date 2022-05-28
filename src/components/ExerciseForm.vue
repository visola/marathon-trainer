<script setup>
import { ref } from 'vue';

import DistanceRunExerciseForm from './DistanceRunExerciseForm.vue';

import {
  DISTANCE,
  EXERCISE_TYPES,
  EXERCISE_TYPE_NAMES
} from '../model/exercises';

import { useStore } from '../store';

const props = defineProps(['day']);
const store = useStore();

const exercisesForDay = ref(store.exercises[props.day] || []);

const handleAdd = () => {
  exercisesForDay.value.push({ type: EXERCISE_TYPE_NAMES[0] });
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
      <select class="form-select" :value="exercise.type">
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
  </div>
</template>

<style scoped>
.exercise-row {
  align-items: center;
  display: flex;
  justify-content: flex-start;
}
</style>

<style>
.exercise-row .input-group {
  margin-right: 12px; 
}

.exercise-row .input-group .form-label {
  margin-right: 10px;
}
</style>