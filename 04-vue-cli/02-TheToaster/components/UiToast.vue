<template>
  <div :class="[{ 'toast_success' : toastType === 'success' }, { 'toast_error' : toastType === 'error' }]">
    <UiIcon class="toast__icon" :icon="toastType === 'success' ? 'check-circle' : 'alert-circle'" />
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


@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}



.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
