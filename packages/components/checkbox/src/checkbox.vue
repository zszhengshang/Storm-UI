<template>
  <label :class="[
    bem.b(),
    bem.is('disabled', disabled),
    bem.is('checked', checked)
  ]">
    <span :class="bem.e('input')">
      <input
        type="checkbox"
        :class="bem.e('origin')"
        v-model="modelValue"
        value="label"
        :disabled="disabled"
        :name="name"
      >
      <span :class="bem.e('inner')"></span>
    </span>
    <span :class="bem.e('label')">
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils/create';
import { checkboxEmits, checkboxProps } from './checkbox';
defineOptions({ name: 'SCheckbox' })
defineProps(checkboxProps)
defineEmits(checkboxEmits)

const bem = createNamespace('checkbox')
</script>