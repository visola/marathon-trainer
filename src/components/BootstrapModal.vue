<script setup>
const emit = defineEmits(['close']);
defineProps(['actionText', 'isOpen', 'title']);

const handleClose = () => {
  emit('close');
}
</script>

<template>
  <div class="modal" tabindex="-1" v-if="isOpen" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="handleClose"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="handleClose">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-dialog {
  left: 50%;
  margin: unset;
  margin-top: 3vh;
  max-width: unset;
  position: absolute;
  transform: translateX(-50%);
}
</style>