<script setup>
import { onMounted, ref, watch } from 'vue';

import {
  EASY,
  PACES,
} from '../model/paces';

const emit = defineEmits(['change']);
const props = defineProps(['exercise']);

const time = ref('');
const pace = ref(EASY);

const setExercise = (exercise) => {
  time.value = exercise.time;
  pace.value = exercise.pace || EASY;
}

onMounted(() => setExercise(props.exercise));
watch(() => props.exercise, (newValue) => setExercise(newValue));
watch([time, pace], () => {
   emit(
     'change',
     {
      time: time.value,
      pace: pace.value,
    });
});
</script>

<template>
  <div class="input-group">
    <label class="form-label">Time:</label>
    <input
      class="form-control"
      placeholder="7"
      type="text"
      v-model="time"
    />
    <span class="input-group-text">minutes</span>
  </div>

  <div class="input-group">
    <label for="pace" class="form-label">Pace:</label>
    <select class="form-select" v-model="pace" name="pace">
      <option v-for="(label, type) in PACES" :key="type" :value="type">
        {{ label }}
      </option>
    </select>
  </div>
</template>