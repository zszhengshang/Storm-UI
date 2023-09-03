<template>
  <div :class="[
    bem.b(),
    bem.is('disabled', disabled),
    bem.is('without-controls', !controls)
  ]">
    <span
      :class="[
        bem.e('controls'),
        bem.e('decrease'),
        bem.is('disabled', disabled)
      ]"
      v-if="controls"
    >
      <s-icon>
        <Decrease />
      </s-icon>
    </span>
    <span
      :class="[
        bem.e('controls'),
        bem.e('increase'),
        bem.is('disabled', disabled)
      ]"
      v-if="controls"
    >
      <s-icon>
        <Increase />
      </s-icon>
    </span>
    <s-input
      type="number"
      :step="step"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :max="max"
      :min="min"
      :name="name"
      :label="label"
    />
  </div>
</template>

<script setup lang="ts">
import { inputNumberEmits, inputNumberProps } from './input-number';
import { createNamespace } from '@storm/utils/create'
import SIcon from '@storm/components/icon'
import SInput from '@storm/components/input'
import Decrease from '@storm/components/internal-icon/decrease';
import Increase from '@storm/components/internal-icon/increase';
defineOptions({ name: 'SInputNumber' })
defineProps(inputNumberProps)
defineEmits(inputNumberEmits)

const bem = createNamespace('input-number')
</script>