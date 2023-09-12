<template>
  <label :class="[
    bem.b(),
    bem.is('disabled', isDisabled),
    bem.is('checked', isChecked)
  ]">
    <span :class="[
      bem.e('input'),
      bem.is('disabled', isDisabled),
      bem.is('checked', isChecked),
      bem.is('indeterminate', indeterminate)
    ]">
      <input
        type="checkbox"
        :class="bem.e('origin')"
        v-model="model"
        :value="label"
        :disabled="isDisabled"
        :name="name"
        @change="handleChange"
      >
      <span :class="bem.e('inner')"></span>
    </span>
    <span :class="bem.e('label')" v-if="hasOwnLabel">
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils/create';
import { checkboxEmits, checkboxProps } from './checkbox';
import { useCheckbox } from './use-checkbox';
import { useSlots } from 'vue';
defineOptions({ name: 'SCheckbox' })
const props = defineProps(checkboxProps)
defineEmits(checkboxEmits)
const slots = useSlots()

const bem = createNamespace('checkbox')
const { model, isChecked, isDisabled, hasOwnLabel, handleChange } = useCheckbox(props, slots)
</script>