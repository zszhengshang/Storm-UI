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
          v-bind="attrs"
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
        >
          <s-icon
            :class="[
              bem.e('icon'),
              bem.e('clear')
            ]"
            @mousedown.prevent
            @click="clear"
            v-if="showClear"
          >
            <!-- 这里prevent要阻止接下来blur事件的触发 确保点击事件可以触发 -->
            <circle-close />
          </s-icon>
          <template v-else>
            <slot
              :class="bem.e('icon')"
              name="suffix"
              v-if="$slots.suffix"
            />
            <s-icon
              :class="bem.e('icon')"
              v-else-if="suffixIcon"
            >
              <component :is="suffixIcon" />
            </s-icon>
          </template>
        </span>
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        ref="textareaRef"
        :class="bem.e('inner')"
        v-bind="attrs"
        :disabled="disabled"
        :readonly="readonly"
        :maxLength="maxLength"
        :placeholder="placeholder"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      ></textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils'
import { inputEmits, inputProps } from './input';
import { computed, useSlots, shallowRef, onMounted, nextTick, watch, useAttrs } from 'vue';
import { UPDATE_MODEL_EVENT } from '@storm/constants';
import { useFocus } from './use-focus'
import SIcon from '@storm/components/icon'
import CircleClose from '@storm/components/internal-icon/circle-close'

type TargetElement = HTMLInputElement | HTMLTextAreaElement

defineOptions({
  name: 'SInput',
  inheritAttrs: false
})
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const slots = useSlots()
const attrs = useAttrs()

const bem = createNamespace(props.type === 'textarea' ? 'textarea' : 'input')
const inputRef = shallowRef<HTMLInputElement>()
const textareaRef = shallowRef<HTMLTextAreaElement>()
const _ref = computed(() => inputRef.value || textareaRef.value)
// 如果modelValue不为null或者undefined就强转为字符串
const nativeInputValue = computed(() => props.modelValue == undefined ? '' : String(props.modelValue))
// 清除按钮
const showClear = computed(
  () => props.clearable &&
    !props.disabled &&
    !props.readonly &&
    !!nativeInputValue.value &&
    isFocused.value
)
// 输入框尾部内容
const suffixVisible = computed(() => slots.suffix || !!props.suffixIcon || showClear.value)

const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocus(_ref)

const handleInput = async (e: Event) => {
  const target = e.target as TargetElement
  if (target.value === nativeInputValue.value) {
    setNativeInputValue()
    return
  }
  emit(UPDATE_MODEL_EVENT, target.value)
  emit('input', target.value)
  await nextTick()
  setNativeInputValue()
}
const handleChange = (e: Event) => {
  const target = e.target as TargetElement
  emit('change', target.value)
}
const handleKeydown = (e: KeyboardEvent) => {
  emit('keydown', e)
}
// 设置输入框的值 如果没有传modelValue就无法输入
const setNativeInputValue = () => {
  // 没传modelValue 所以modelValue和input的value值对不上
  const input = _ref.value
  if (!input || input.value === nativeInputValue.value) {
    return
  }
  input.value = nativeInputValue.value
}
watch(nativeInputValue, () => setNativeInputValue())
onMounted(() => setNativeInputValue())

// 暴露出去给外部调用
const focus = () => _ref.value?.focus()
const blur = () => _ref.value?.blur()
const clear = () => {
  emit(UPDATE_MODEL_EVENT, '')
  emit('change', '')
  emit('clear')
  emit('input', '')
}
defineExpose({
  focus,
  blur,
  clear
})
</script>