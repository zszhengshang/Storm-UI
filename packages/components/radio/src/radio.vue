<template>
  <label :class="[
    bem.b(),
    bem.is('disabled', isDisabled),
    bem.is('checked', model === label)
  ]">
    <span :class="[
      bem.e('input'),
      bem.is('disabled', isDisabled),
      bem.is('checked', model === label)
    ]">
      <input
        ref="radioRef"
        type="radio"
        :class="bem.e('origin')"
        v-model="model"
        :value="label"
        :name="name || radioGroup?.name"
        :disabled="isDisabled"
        @change="handleChange"
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
const emit = defineEmits(radioEmits)

const bem = createNamespace('radio')
const { radioRef, model, isDisabled, radioGroup } = useRadio(props)

const handleChange = () => emit('change', model.value)
</script>