<script setup>
import { onMounted, ref, watch } from 'vue';

import {
  EASY,
  HARD,
} from '../model/paces';

import {
  DISTANCE,
  TIME,
} from '../model/intervals';

const emit = defineEmits(['change']);
const props = defineProps(['exercise']);

const distance = ref('');
const intervalType = ref(DISTANCE);
const time = ref('');
const pace = ref(HARD);

const restDistance = ref('');
const restPace = ref(EASY);
const restTime = ref('');
const restType = ref(TIME);

const setExercise = (exercise) => {
  distance.value = exercise.distance || '';
  pace.value = exercise.pace || HARD;
  restTime.value = exercise.restTime || '';
}

onMounted(() => setExercise(props.exercise));
watch(() => props.exercise, (newValue) => setExercise(newValue));
watch([distance, intervalType, pace, restDistance, restPace, restTime, restType, time], () => {
  const data = {
    distance: distance.value, 
    intervalType: intervalType.value, 
    pace: pace.value, 
    restDistance: restDistance.value, 
    restPace: restPace.value, 
    restTime: restTime.value, 
    restType: restType.value, 
    time: time.value,
  };
  emit('change', data);
});
</script>

<template>
  <div class="interval-exercise">
    <div>
      <h5 class="title">Fast</h5>

      <div class="input-group">
        <label class="form-label">Type:</label>
        <select class="form-select" v-model="intervalType">
          <option v-for="(label, type) in TYPES" :key="type" :value="type">
            {{ label }}
          </option>
        </select>
      </div>

      <div class="input-group" v-if="intervalType === DISTANCE">
        <label class="form-label">Distance:</label>
        <input
          class="form-control"
          placeholder="7"
          type="text"
          v-model="distance"
        />
        <span class="input-group-text">{{ UNITS[intervalType] }}</span>
      </div>

      <div class="input-group" v-if="intervalType === TIME">
        <label class="form-label">Time: </label>
        <input
          class="form-control"
          placeholder="3"
          type="text"
          v-model="time"
        />
        <span class="input-group-text">{{ UNITS[intervalType] }}</span>
      </div>

      <div class="input-group">
        <label class="form-label">Pace:</label>
        <select class="form-select" v-model="pace">
          <option v-for="(label, type) in PACES" :key="type" :value="type">
            {{ label }}
          </option>
        </select>
      </div>
    </div>

    <div>
      <h5 class="title">Rest</h5>

      <div class="input-group">
        <label class="form-label">Type:</label>
        <select class="form-select" v-model="restType">
          <option v-for="(label, type) in TYPES" :key="type" :value="type">
            {{ label }}
          </option>
        </select>
      </div>

      <div class="input-group" v-if="restType === DISTANCE">
        <label class="form-label">Distance:</label>
        <input
          class="form-control"
          placeholder="7"
          type="text"
          v-model="restDistance"
        />
        <span class="input-group-text">{{ UNITS[restType] }}</span>
      </div>

      <div class="input-group" v-if="restType === TIME">
        <label class="form-label">Time: </label>
        <input
          class="form-control"
          placeholder="3"
          type="text"
          v-model="restTime"
        />
        <span class="input-group-text">{{ UNITS[restType] }}</span>
      </div>

      <div class="input-group">
        <label class="form-label">Pace:</label>
        <select class="form-select" v-model="restPace">
          <option v-for="(label, type) in PACES" :key="type" :value="type">
            {{ label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.interval-exercise, .interval-exercise > div {
  display: flex;
}

.interval-exercise {
  flex-direction: column;
}

.interval-exercise > div {
  margin-bottom: 10px;
}

.interval-exercise > div > * {
  margin-right: 10px;
}
</style>
