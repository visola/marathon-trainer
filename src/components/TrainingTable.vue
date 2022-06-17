<script setup>
import { DateTime } from 'luxon';
import { onMounted, ref, watch } from 'vue';

import TrainingDay from './TrainingDay.vue';

const TOTAL_WEEKS = 18;

const props = defineProps(['raceDay']);
const weeks = ref([]);

const calculateWeeks = (raceDay) => {
  const dtRaceDay = DateTime.fromISO(raceDay);
  const dtStartTrain = dtRaceDay.minus({ weeks: TOTAL_WEEKS }).startOf('week');

  const result = [];

  let days = [];
  let day = dtStartTrain;
  let weekNumber = day.weekNumber;
  while(day.diff(dtRaceDay).toMillis() <= 0) {
    days.push(day.toISODate());
    day = day.plus({ days: 1 });
    if (weekNumber !== day.weekNumber) {
      result.push(days);
      days = [];
    }
    weekNumber = day.weekNumber;
  }

  weeks.value = result;
}

watch(() => props.raceDay, (newValue) => calculateWeeks(newValue));
onMounted(() => calculateWeeks(props.raceDay));
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th class="day">Mon</th>
        <th class="day">Tue</th>
        <th class="day">Wed</th>
        <th class="day">Thu</th>
        <th class="day">Fri</th>
        <th class="day">Sat</th>
        <th class="day">Sun</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(week, i) in weeks" :key="i">
        <td>
          T - {{TOTAL_WEEKS - i }} weeks
        </td>
        <td v-for="day in week" :key="`${i}-${day}`" :class="{ 'marathon-day': day === raceDay }">
          <TrainingDay :day="day" v-if="day !== raceDay" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
th {
  text-align: center;
}

td.marathon-day {
  text-align: center;
  vertical-align: middle;
}

td.marathon-day:after {
  content: 'Marathon day';
}
</style>