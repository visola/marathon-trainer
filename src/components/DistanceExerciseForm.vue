<script setup>
import { onMounted, ref, watch } from 'vue';

import {
  EASY,
  PACES,
} from '../model/paces';

const emit = defineEmits(['change']);
const props = defineProps(['exercise']);

const distance = ref('');
const pace = ref(EASY);

const setExercise = (exercise) => {
  distance.value = exercise.distance;
  pace.value = exercise.pace || EASY;
}

onMounted(() => setExercise(props.exercise));
watch(() => props.exercise, (newValue) => setExercise(newValue));
watch([distance, pace], () => {
   emit(
     'change',
     {
      distance: distance.value,
      pace: pace.value,
    });
});
</script>

<template>
  <div class="input-group">
    <label class="form-label">Distance:</label>
    <input
      class="form-control"
      placeholder="7"
      type="text"
      v-model="distance"
    />
    <span class="input-group-text">miles</span>
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