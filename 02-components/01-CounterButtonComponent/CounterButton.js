import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      required: true,
      default: 0,
    }
  },

  emits: ['update:count'],

  computed: {
    incr() {
      return this.count + 1;
    }
  },

  // Компонент должен иметь входной параметр и порождать событие

  template: `<button @click = "this.$emit('update:count', incr)" type="button">{{ incr }}</button>`,
});
