<template>
  <div :class="[
    'input-group',
      {'input-group_icon': includeIcon()},
      {'input-group_icon-left': includeLeftIcon()},
      {'input-group_icon-right': includeRightIcon()},
  ]"
  >
    <div v-if="$slots['left-icon']" class="input-group__icon">
      <slot name="left-icon" />
    </div>

    <component
          :is="typeInput"
           ref="input"
           :value="modelValue"
           v-bind="$attrs"
           @input="emitValue"
           @change="changeValue"
           :class="[ {'form-control_rounded' : rounded}, {'form-control_sm' : small}, 'form-control' ]"
    >
    </component>

    <div v-if="$slots['right-icon']" class="input-group__icon">
      <slot name="right-icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiInput',

  inheritAttrs: false,

  data() {
    return {
      localValue: null,
    }
  },

  props: {
    small: String,
    rounded: Boolean,
    multiline: Boolean,
    modelValue: String,
    modelModifiers: { default: () => ({}) },
  },

  methods: {
    includeLeftIcon() {
      return !! this.$slots['left-icon'];
    },
    includeRightIcon() {
      return !!this.$slots['right-icon'];
    },
    includeIcon(){
      return !!(this.includeLeftIcon || this.includeRightIcon)
    },
    emitValue(e) {
      if(this.$props.modelModifiers.lazy) {
        console.log('lazy')
      } else {
        this.$emit('update:modelValue', e.target.value);
      }
    },
    changeValue(e) {
      if(this.$props.modelModifiers.lazy) {
        this.localValue = e.target.value;
        this.$emit('update:modelValue', this.localValue);
      }
    },
    focus(){
      this.$refs.input.focus();
    },
  },


  computed: {
    typeInput() {
      return this.multiline ?'textarea' : 'input';
    },
  },

  emits: ['update:modelValue'],
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s border-color;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon-left .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon-right .form-control {
  padding-right: 50px;
}

.input-group.input-group_icon .input-group__icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .input-group__icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .input-group__icon:last-child {
  right: 16px;
}
</style>
