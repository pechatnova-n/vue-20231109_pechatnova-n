<template>
  <div :class="[{ 'toast_success' : toastType === 'success' }, { 'toast_error' : toastType === 'error' }]">
    <UiIcon v-if="toastType === 'success'" class="toast__icon" icon="check-circle" />
    <UiIcon v-if="toastType === 'error'" class="toast__icon" icon="alert-circle" />
    <span>{{ message }}</span>
  </div>
</template>

<script>
import UiIcon from "./UiIcon.vue";

export default {
  components: {UiIcon},

  props: {
    toastType: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },

}
</script>

<style scoped>

</style>
