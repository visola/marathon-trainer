<script setup>
import { onMounted, ref, watch } from 'vue';

import {
  DISTANCE,
  INTERVAL,
  EXERCISE_TYPES,
  REPEAT,
  TIME,
} from '../model/exercises';

import DistanceExerciseForm from './DistanceExerciseForm.vue';
import IntervalExerciseForm from './IntervalExerciseForm.vue';
import TimeExerciseForm from './IntervalExerciseForm.vue';

const emit = defineEmits(['change']);
const props = defineProps(['exercise']);

const SUBTYPES = { ... EXERCISE_TYPES };
delete SUBTYPES[REPEAT];

const repeat = ref(2);
const subType = ref(DISTANCE);

const handleChangeType = (event) => {
  subType.value = event.target.value;
  handleExerciseChange(props.exercise);
};

const handleExerciseChange = (newValue) => {
  emit('change', {
    ...newValue,
    repeat: repeat.value,
    subType: subType.value,
  });
};

const setExercise = (exercise) => {
  repeat.value = exercise.repeat;
  subType.value = exercise.subType || DISTANCE;
};

onMounted(() => setExercise(props.exercise));
watch(() => props.exercise, (newValue) => setExercise(newValue));
watch([repeat], () => {
   emit(
     'change',
     {
      repeat: repeat.value,
      subType: subType.value,
    });
});
</script>

<template>
  <div class="input-group">
    <label class="form-label">Repeat:</label>
    <input
      class="form-control"
      placeholder="3"
      type="text"
      v-model="repeat"
    />
    <span class="input-group-text">x</span>
  </div>

  <div class="input-group">
    <label class="form-label">Type:</label>
    <select class="form-select" :value="exercise.subType" @change="handleChangeType">
      <option v-for="(label, type) in SUBTYPES" :key="type" :value="type">
        {{ label }}
      </option>
    </select>
  </div>

  <DistanceExerciseForm
    v-if="exercise.subType === DISTANCE"
    @change="handleExerciseChange"
    :exercise="exercise"
  />

  <IntervalExerciseForm
    v-if="exercise.subType === INTERVAL"
    @change="handleExerciseChange"
    :exercise="exercise"
  />

  <TimeExerciseForm
    v-if="exercise.subType === TIME"
    @change="handleExerciseChange"
    :exercise="exercise"
  />
</template>
