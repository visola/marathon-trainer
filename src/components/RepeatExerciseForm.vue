<script setup>
import { onMounted, ref, watch } from 'vue';

import {
  DISTANCE,
  EXERCISE_TYPES,
  REPEAT,
} from '../model/exercises';

import DistanceRunExerciseForm from './DistanceRunExerciseForm.vue';

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

  <DistanceRunExerciseForm
    v-if="exercise.subType === DISTANCE"
    @change="handleExerciseChange"
    :exercise="exercise"
  />
</template>
