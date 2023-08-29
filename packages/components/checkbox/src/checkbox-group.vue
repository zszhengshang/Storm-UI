<template>
  <div :class="bem.b('group')">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils/create';
import { checkGroupEmits, checkboxGroupProps, CheckboxGroupValueType, checkboxGroupContextKey } from './checkbox-group';
import { computed, provide } from 'vue';
import { UPDATE_MODEL_EVENT } from '@storm/constants';
defineOptions({ name: 'SCheckboxGroup' })
const props = defineProps(checkboxGroupProps)
const emit = defineEmits(checkGroupEmits)

const bem = createNamespace('checkbox')
const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(val: CheckboxGroupValueType) {
    changeEvent(val)
  }
})

const changeEvent = (value: CheckboxGroupValueType) => {
  emit(UPDATE_MODEL_EVENT, value)
  emit('change', value)
}

provide(checkboxGroupContextKey, {
  modelValue,
  disabled: props.diabled,
  changeEvent
})
</script>