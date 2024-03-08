<template>
  <div class="toasts" v-if="allToasts.length > 0">
    <UiToast v-for="toast in allToasts"
             :key="toast.id"
             class="toast"
             :toastType="toast.type"
             :message="toast.message"
    />
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToast from "./UiToast.vue";

export default {
  name: 'TheToaster',

  data() {
    return {
      allToasts: [],
      number: 0,
    }
  },

  components: {UiToast, UiIcon },

  methods: {
    increment() {
      this.number++;
    },
    success(message) {
      this.increment();
      let item = {
        id: this.number,
        type: 'success',
        message: message,
      }
      this.allToasts.push(item);
      setTimeout(() => {
        this.allToasts = this.allToasts.filter(el => el.id !== item.id );
      }, 5000)
    },

    error(message) {
      this.increment();
      let item = {
        id: this.number,
        type: 'error',
        message: message,
      }
      this.allToasts.push(item);
      setTimeout(() => {
        this.allToasts = this.allToasts.filter(el => el.id !== item.id );
      }, 5000)
    },

  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

</style>
