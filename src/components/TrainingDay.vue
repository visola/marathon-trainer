<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import ExerciseModal from './ExerciseModal.vue';
import { useStore } from '../store';

defineProps(['day']);

const { exercises } = storeToRefs(useStore());

const showExerciseModal = ref(false);

const renderExercise = (exercise) => {
  switch(exercise.type) {
    case 'DISTANCE':
      return `${exercise.distance} miles @ ${exercise.pace}`;
    default:
      return 'N/A';
  }
};
</script>

<template>
  <div class="training-day">
    <span class="day">{{ day }}</span>
    <p v-for="e in exercises[day]" :key="`${day}-${e.length}`">
      {{ renderExercise(e) }}
    </p>

    <button class="edit btn btn-primary" @click="showExerciseModal = !showExerciseModal">
      <i class="bi bi-pencil"></i>
    </button>

    <ExerciseModal
      @close="showExerciseModal = false"
      :day="day"
      :isOpen="showExerciseModal"
    />
  </div>
</template>

<style scoped>
.training-day {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  position: relative;
}

.training-day:hover {
  background: #eee;
}

.training-day > .day {
  font-size: 0.8em;
}

.training-day > .edit {
  padding: 2px 5px;
  position: absolute;
  right: 2px;
  top: 2px;
}

.training-day > p {
  margin-bottom: 0;
}
</style>
