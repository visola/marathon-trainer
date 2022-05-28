<script setup>
import { onMounted, ref, watch } from 'vue';

const emit = defineEmits(['change']);
const props = defineProps(['exercise']);

const PACES = {
  EASY: 'Easy',
  MARATHON: 'Marathon',
  THREASHOLD: 'Threashold',
  MAX: 'Max',
}

const distance = ref('');
const pace = ref('EASY');

const setExercise = (exercise) => {
  distance.value = exercise.distance;
  pace.value = exercise.pace || 'EASY';
}

onMounted(() => setExercise(props.exercise));
watch(() => props.exercise, (newValue) => setExercise(newValue));
watch([distance, pace], () => {
   emit(
     'change',
     {
      name: 'Distance',
      distance: distance.value,
      pace: pace.value,
    });
});
</script>

<template>
  <div class="input-group">
    <label for="distance" class="form-label">Distance:</label>
    <input
      class="form-control"
      name="distance"
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