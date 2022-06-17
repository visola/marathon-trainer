<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { DateTime } from 'luxon';

import ExerciseModal from './ExerciseModal.vue';
import { renderExercise } from '../model/exercises';
import { useStore } from '../store';

const props = defineProps(['day']);
const today = DateTime.now().toISODate();

const store = useStore();
const { exercises } = storeToRefs(store);
const showExerciseModal = ref(false);

const clearDay = () => {
  store.setExercisesForDate([], props.day);
};
</script>

<template>
  <div class="training-day" :class="{ before: today > day, today: today === day }">
    <span class="day">{{ day }}</span>
    <p v-for="e in exercises[day]" :key="`${day}-${e.length}`">
      {{ renderExercise(e) }}
    </p>

    <i class="action edit bi bi-pencil" @click="showExerciseModal = !showExerciseModal"></i>
    <i class="action clear bi bi-trash" @click="clearDay"></i>

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
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 70px;
  padding: 10px;
  position: relative;
}

.training-day:hover {
  background: #fafafa;
  border: 1px solid black;
}

.training-day > .day {
  font-size: 0.8em;
}

.training-day > .action {
  position: absolute;
  right: 2px;
  top: 2px;
}

.training-day > .clear {
  top: 35px;
}

.training-day > p {
  margin-bottom: 0;
}
</style>
