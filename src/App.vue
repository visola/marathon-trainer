<script setup>
import { ref, watch } from 'vue';
import { DateTime, Duration } from 'luxon';

const DATA_ID = 'marathon-trainer-data';
const loadedData = JSON.parse(localStorage.getItem(DATA_ID) || '{}');

const targetTime = ref(loadedData.targetTime);
const raceDay = ref(loadedData.raceDay);

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
  loadedData.targetTime = targetTime.value;
  loadedData.raceDay = raceDay.value;
  localStorage.setItem(DATA_ID, JSON.stringify(loadedData));
}

const weeks = () => {
  const result = [];//DateTime.from(raceDay.value);
  for (let i = 0; i < 18; i++) {
    result.push([1, 2, 3, 4, 5, 6, 7]);
  }
  return result;
}

watch([raceDay, targetTime], handleChanges);
handleChanges();
</script>

<template>
  <section id="inputs">
    <h4>Inputs</h4>
    <div>
      <label for="targetTime" class="form-label">Target Time:</label>
      <input placeholder="3h30m" v-maska="'#h##m'" type="text" class="form-control" v-model="targetTime" />
    </div>

    <div>
      <label for="raceDay" class="form-label">Race Day:</label>
      <input type="date" class="form-control" v-model="raceDay" />
    </div>
  </section>

  <hr />
  <section id="paces">
    <div>
      <label>Marathon Pace:</label>
      <span>{{ marathonPace }}</span>
    </div>
    <div>
      <label>Easy Pace:</label>
      <span>{{ easyPace }}</span>
    </div>
    <div>
      <label>Threshold Pace:</label>
      <span>{{ threasholdPace }}</span>
    </div>
    <div>
      <label>Hard Pace:</label>
      <span>{{ hardPace }}</span>
    </div>
  </section>

  <table class="table">
    <thead>
      <tr>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
        <th>Sun</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(week, i) in weeks()" :key="i">
        <td v-for="day in week" :key="`${i}-${day}`">
          {{ day }} <button class="btn btn-info">!</button>
        </td>
      </tr>
    </tbody>
  </table>
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
