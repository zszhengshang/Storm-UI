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
        bem.is('disabled', minDisabled)
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
        bem.is('disabled', maxDisabled)
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
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
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
import { computed, onMounted, watch, reactive, ref } from 'vue'
import { isNumber, isNil } from '@storm/utils'
import { UPDATE_MODEL_EVENT } from '@storm/constants';
import { isUndefined } from '@storm/utils';
defineOptions({ name: 'SInputNumber' })
const props = defineProps(inputNumberProps)
const emit = defineEmits(inputNumberEmits)

interface Data {
  currentValue: number | null | undefined,
  userInput: null | number | string
}

const bem = createNamespace('input-number')
const inputRef = ref<HTMLInputElement>()
const data = reactive<Data>({
  currentValue: props.modelValue,
  userInput: null
})

const minDisabled = computed(() => isNumber(props.modelValue) && props.modelValue <= props.min)
const maxDisabled = computed(() => isNumber(props.modelValue) && props.modelValue >= props.max)

const verifyValue = (value: number | null | undefined, update?: boolean): number | null | undefined => {
  const { min, max, step, precision } = props
  if (max < min) {
    throw new Error('[InputNumber] min should not be greater than max.')
  }
  let newVal = Number(value)
  if (isNil(value) || isNaN(newVal)) {
    return
  }
  // if (!isUndefined(precision)) {
  //   newVal = toPrecision(newVal, precision)
  // }

  // 如果超出界限将值限制在min和max之间
  if (newVal > max || newVal < min) {
    newVal = newVal > max ? max : min
    update && emit(UPDATE_MODEL_EVENT, newVal)
  }
}

const setCurrentValue = (value: number | string | null | undefined, emitChange = true) => {
  const oldVal = data.currentValue
  const newVal = verifyValue(value)
}
const handleInput = (value: string) => {
  data.userInput = value
  const newVal = value === '' ? null : Number(value)
  setCurrentValue(newVal, false)
}
const handleFocus = (event: MouseEvent | FocusEvent) => {
  emit('focus', event)
}
const handleBlur = (event: MouseEvent | FocusEvent) => {
  emit('blur', event)
}

onMounted(() => {
  // 如果modelValue绑定的不是null和undefined 就强转为number类型
  // 如果转出来不是一个数字就赋值为undefined
  if (!isNumber(props.modelValue) && props.modelValue != null) {
    let val: number | undefined = Number(props.modelValue)
    if (isNaN(val)) {
      val = undefined
    }
    emit(UPDATE_MODEL_EVENT, val)
  }
})
// 暴露出去给外部调用
const focus = () => {
  inputRef.value?.focus?.()
}
const blur = () => {
  inputRef.value?.blur?.()
}
defineExpose({
  focus,
  blur
})
</script>