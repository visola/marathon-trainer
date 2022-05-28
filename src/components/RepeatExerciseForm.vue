<script setup>
import { onMounted, ref, watch } from 'vue';

const emit = defineEmits(['change']);
const props = defineProps(['exercise']);

const repeat = ref(2);
const subType = ref('');

const setExercise = (exercise) => {
  repeat.value = exercise.repeat;
  subType.value = exercise.subType;
};

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
    <label class="form-label">Repeat:</label>
    <input
      class="form-control"
      placeholder="3"
      type="text"
      v-model="repeat"
    />
    <span class="input-group-text">x</span>
  </div>
</template>
