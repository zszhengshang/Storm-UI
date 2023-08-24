<template>
  <label :class="[
    bem.b(),
    bem.is('disabled', disabled),
    bem.is('checked', modelValue === label)
  ]">
    <span :class="[
      bem.e('input'),
      bem.is('disabled', disabled),
      bem.is('checked', modelValue === label)
    ]">
      <input
        type="radio"
        :class="bem.e('origin')"
        v-model="modelValue"
        :value="label"
        :name="name"
        :disabled="disabled"
      />
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
import { radioProps, radioEmits } from './radio';
import { useRadio } from './use-radio'
defineOptions({ name: 'SRadio' })
const props = defineProps(radioProps)
defineEmits(radioEmits)

const bem = createNamespace('radio')
</script>