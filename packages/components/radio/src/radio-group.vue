<template>
  <div :class="bem.b('group')">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, toRefs, reactive } from 'vue';
import { radioGroupEmits, radioGroupProps, radioGroupKey } from './radio-group'
import type { RadioGroupProps } from './radio-group'
import { createNamespace } from '@storm/utils/create';
import { UPDATE_MODEL_EVENT } from '@storm/constants';
defineOptions({ name: 'SRadioGroup' })
const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)

const bem = createNamespace('radio')

const changeEvent = (value: RadioGroupProps['modelValue']) => {
  emit(UPDATE_MODEL_EVENT, value)
  emit('change', value)
}

provide(
  radioGroupKey,
  reactive({
    ...toRefs(props),
    name: props.name,
    changeEvent
  })
)
</script>