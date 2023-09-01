<template>
  <div :class="[
    bem.b(),
    bem.is('disabled', disabled)
  ]">
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <div
        ref="wrapperRef"
        :class="[
          bem.e('wrapper'),
          bem.is('focus', isFocused)
        ]"
      >
        <!-- 输入框头部内容 -->
        <span
          :class="bem.e('prefix')"
          v-if="$slots.prefix || prefixIcon"
        >
          <slot
            :class="bem.e('icon')"
            name="prefix"
            v-if="$slots.prefix"
          />
          <s-icon
            :class="bem.e('icon')"
            v-else-if="prefixIcon"
          >
            <component :is="prefixIcon" />
          </s-icon>
        </span>
        <input
          ref="inputRef"
          :type="type"
          :class="bem.e('inner')"
          :value="model"
          :disabled="disabled"
          :readonly="readonly"
          :maxLength="maxLength"
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
import { computed, useSlots, shallowRef, useAttrs } from 'vue';
import { UPDATE_MODEL_EVENT } from '@storm/constants';
import { useFocus } from './use-focus'

type TargetElement = HTMLInputElement | HTMLTextAreaElement

defineOptions({
  name: 'SInput',
  inheritAttrs: false
})
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const slots = useSlots()

const bem = createNamespace('input')
const inputRef = shallowRef<HTMLInputElement>()
const textareaRef = shallowRef<HTMLTextAreaElement>()
const _ref = computed(() => inputRef.value || textareaRef.value)
// 清除按钮
const showClear = computed(() => props.clearable && !props.disabled && !props.readonly && isFocused.value)
// 输入框尾部内容
const suffixVisible = computed(() => slots.suffix || !!props.suffixIcon || showClear.value)

const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit(UPDATE_MODEL_EVENT, val)
  }
})

const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocus(_ref)

const handleInput = (e: Event) => {
  const target = e.target as TargetElement
  emit(UPDATE_MODEL_EVENT, target.value)
  emit('input', target.value)
}
const handleChange = (e: Event) => {
  const target = e.target as TargetElement
  emit('change', target.value)
}
const handleKeydown = (e: KeyboardEvent) => {
  emit('keydown', e)
}
// 暴露出去给外部调用
const focus = () => _ref.value?.focus()
const blur = () => _ref.value?.blur()
defineExpose({
  focus,
  blur
})
</script>