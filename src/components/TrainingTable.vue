<script setup>
import { DateTime } from 'luxon';
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import TrainingDay from './TrainingDay.vue';
import { useStore } from '../store';
import { getTrainingDaysInWeeks } from '../model/days';

const props = defineProps(['raceDay']);
const weeks = ref([]);

const { totalWeeks } = storeToRefs(useStore());

const calculateWeeks = (raceDay) => {
  weeks.value = getTrainingDaysInWeeks(raceDay, totalWeeks.value);
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
          {{ i + 1 }}<br />
          T - {{totalWeeks - i - 1 }} weeks
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