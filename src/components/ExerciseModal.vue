<script setup>
import BootstrapModal from './BootstrapModal.vue';
import ExerciseForm from './ExerciseForm.vue';

const emit = defineEmits(['close']);
defineProps(['day', 'isOpen']);
</script>

<template>
  <BootstrapModal
    :isOpen="isOpen"
    :title="`Exercise for ${day}`"
    @close="() => emit('close')"
    @submit="() => emit('close')"
  >
    <ExerciseForm :day="day" />
  </BootstrapModal>
</template>
