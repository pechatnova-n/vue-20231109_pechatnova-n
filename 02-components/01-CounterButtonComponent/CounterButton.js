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

  methods: {
    incrCount(count) {
      count = ++count;
      this.$emit('update:count', count);
    },
  },



  // Компонент должен иметь входной параметр и порождать событие

  template: `<button @click=incrCount(count) type="button">{{ count }}</button>`,
});
