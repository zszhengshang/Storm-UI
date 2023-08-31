<template>
  <div :class="[
    bem.b(),
    bem.is('disabled', disabled)
  ]">
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <div :class="[
        bem.e('wrapper'),
        bem.is('focus', isFocused)
      ]">
        <!-- 输入框头部内容 -->
        <span
          :class="bem.e('prefix')"
          v-if="$slots.prefix || prefixIcon"
        ></span>
        <input
          :type="type"
          :class="bem.e('inner')"
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="placeholder"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          @keydown="handleKeydown"
        >
        <!-- 输入框尾部内容 -->
        <span
          :class="bem.e('suffix')"
          v-if="suffixVisible"
        ></span>
      </div>
    </template>
    <!-- textarea -->
    <template v-else></template>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils/create'
import { inputEmits, inputProps } from './input';
import { computed, useSlots, ref } from 'vue';
import { UPDATE_MODEL_EVENT } from '@storm/constants';

type TargetElement = HTMLInputElement | HTMLTextAreaElement

defineOptions({
  name: 'SInput',
  inheritAttrs: false
})
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const slots = useSlots()

const bem = createNamespace('input')
// 记录是否聚焦
const isFocused = ref(false)
// 清除按钮
const showClear = computed(() => props.clearable && !props.disabled && !props.readonly && isFocused.value)
// 输入框尾部内容
const suffixVisible = computed(() => slots.suffix || !!props.suffixIcon || showClear.value)

const handleInput = (e: Event) => {
  const { value } = e.target as TargetElement
  emit(UPDATE_MODEL_EVENT, value)
  emit('input', value)
}
const handleFocus = (e: FocusEvent) => {
  if (isFocused.value) return
  isFocused.value = true
  emit('focus', e)
}
const handleBlur = (e: FocusEvent) => {
  isFocused.value = false
  emit('blur', e)
}
const handleChange = (e: Event) => {
  const target = e.target as TargetElement
  emit('change', target.value)
}
const handleKeydown = (e: KeyboardEvent) => {
  emit('keydown', e)
}
</script>