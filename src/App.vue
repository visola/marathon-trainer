<script setup>
import { ref, watch } from 'vue';
import { Duration } from 'luxon';
import { storeToRefs } from 'pinia';

import {
  EASY,
  MARATHON,
  HARD,
  THREASHOLD,
  PACES,
} from './model/paces';

import { useStore } from './store';

import TrainingTable from './components/TrainingTable.vue';

const store = useStore();
const { raceDay, targetTime } = storeToRefs(store);

const marathonPace = ref(null);
const easyPace = ref(null);
const threasholdPace = ref(null);
const hardPace = ref(null);

const convertSecondsToMinutesAndSeconds = (seconds) => {
  const d = Duration.fromObject({ seconds }).shiftTo('minutes', 'seconds', 'milliseconds');
  return `${d.minutes}m${d.seconds}s`;
}

const handleChanges = () => {
  const match = targetTime.value.match(/([0-9])h([0-9][0-9])m/);
  if (match == null) {
    return;
  }

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const marathonPaceInSeconds = (hours * 60 + minutes) * 60 / 26.2;
  marathonPace.value = convertSecondsToMinutesAndSeconds(marathonPaceInSeconds);
  easyPace.value = convertSecondsToMinutesAndSeconds(marathonPaceInSeconds * 1.25);
  threasholdPace.value = convertSecondsToMinutesAndSeconds(marathonPaceInSeconds * 0.95);
  hardPace.value = convertSecondsToMinutesAndSeconds(marathonPaceInSeconds * 0.86);

  saveData();
}

const saveData = () => {
  store.setRaceDay(raceDay.value);
  store.setTargetTime(targetTime.value);
}

watch([raceDay, targetTime], handleChanges);
handleChanges();
</script>

<template>
  <section id="inputs">
    <h4>Inputs</h4>
    <div>
      <label for="targetTime" class="form-label">Target Time:</label>
      <input placeholder="3h30m" v-maska="['#h#m', '#h##m']" type="text" class="form-control" v-model="targetTime" />
    </div>

    <div>
      <label for="raceDay" class="form-label">Race Day:</label>
      <input type="date" class="form-control" v-model="raceDay" />
    </div>
  </section>

  <hr />
  <section id="paces">
    <div>
      <label>{{ PACES[MARATHON] }} Pace:</label>
      <span>{{ marathonPace }}</span>
    </div>
    <div>
      <label>{{ PACES[EASY] }} Pace:</label>
      <span>{{ easyPace }}</span>
    </div>
    <div>
      <label>{{ PACES[THREASHOLD] }} Pace:</label>
      <span>{{ threasholdPace }}</span>
    </div>
    <div>
      <label>{{ PACES[HARD] }} Pace:</label>
      <span>{{ hardPace }}</span>
    </div>
  </section>

  <TrainingTable :raceDay="raceDay" />
</template>

<style>
#inputs {
  max-width: 30vw;
}

#paces {
  display: flex;
  justify-content: space-evenly;
}

#paces label {
  font-weight: bold;
  margin-right: 12px;
}
</style>
