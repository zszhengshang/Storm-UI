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
      @click="decrease"
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
      @click="increase"
      v-if="controls"
    >
      <s-icon>
        <Increase />
      </s-icon>
    </span>
    <s-input
      type="number"
      :model-value="displayValue"
      :step="step"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :max="max"
      :min="min"
      :name="name"
      :label="label"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </div>
</template>

<script setup lang="ts">
import { inputNumberEmits, inputNumberProps } from './input-number';
import { createNamespace } from '@storm/utils'
import SIcon from '@storm/components/icon'
import SInput from '@storm/components/input'
import Decrease from '@storm/components/internal-icon/decrease';
import Increase from '@storm/components/internal-icon/increase';
import { computed, onMounted, ref } from 'vue'
import { isNumber, isNil, isUndefined } from '@storm/utils'
import { UPDATE_MODEL_EVENT } from '@storm/constants';
defineOptions({ name: 'SInputNumber' })
const props = defineProps(inputNumberProps)
const emit = defineEmits(inputNumberEmits)

type valueType = number | string | null | undefined

const bem = createNamespace('input-number')
const inputRef = ref<HTMLInputElement>()

const minDisabled = computed(() => isNumber(props.modelValue) && props.modelValue <= props.min)
const maxDisabled = computed(() => isNumber(props.modelValue) && props.modelValue >= props.max)
// 默认展示的值
const displayValue = computed(() => {
  let value: valueType = props.modelValue
  if (isNil(value)) return ''
  if (isNumber(value)) {
    if (isNaN(value)) return ''
    if (!isUndefined(props.precision)) {
      value = value.toFixed(props.precision)
    }
  }
  return value
})
const numPrecision = computed(() => {
  // 算出step的精度
  const stepPrecision = getPrecision(props.step)
  if (!isUndefined(props.precision)) {
    // 如果传了precision 就用precision
    return props.precision
  } else {
    // 如果没传precision 就使用modelValue精度和step精度两者大的那个
    return Math.max(getPrecision(props.modelValue), stepPrecision)
  }
})
const verifyValue = (val: number | null): number | null => {
  const { max, min, precision } = props
  if (max < min) {
    throw new Error('[inputNumber] min should not be greater than max.')
  }
  let newVal = Number(val)
  if (isNil(val) || Number.isNaN(newVal)) {
    return null
  }
  if (!isUndefined(precision)) {
    newVal = toPrecision(newVal, precision)
  }
  if (newVal > max || newVal < min) {
    val = newVal > max ? max : min
  }
  return newVal
}
const setCurrentValue = (val: number | null) => {
  const value = verifyValue(val)
  emit(UPDATE_MODEL_EVENT, value!)
}
// 算出传入数字的精度
const getPrecision = (num: number | null | undefined) => {
  if (isNil(num)) return 0
  const valueString = num.toString()
  const dotPosition = valueString.indexOf('.')
  let precision = 0
  if (dotPosition !== -1) {
    precision = valueString.length - dotPosition - 1
  }
  return precision
}
const toPrecision = (num: number, precision?: number): number => {
  if (isUndefined(precision)) {
    precision = numPrecision.value
  }
  if (precision === 0) {
    // 精度为0 直接四舍五入
    return Math.round(num)
  }
  let snum = String(num)
  const pointPos = snum.indexOf('.')
  // 没有小数点直接使用原始值
  if (pointPos === -1) return num
  const nums = snum.replace('.', '').split('')
  const datum = nums[pointPos + precision]
  if (!datum) return num
  // 处理一下精度问题
  const length = snum.length
  if (snum.charAt(length - 1) === '5') {
    snum = `${snum.slice(0, Math.max(0, length - 1))}6`
  }
  return Number.parseFloat(Number(snum).toFixed(precision))
}
const ensurePrecision = (val: number, coefficient: 1 | -1 = 1) => {
  return toPrecision(val + props.step * coefficient)
}
const decrease = () => {
  if (props.disabled || props.readonly || minDisabled.value) return
  // 将modelValue的值转成number
  const value = Number(displayValue.value) || 0
  // 通过step和precision算出减过之后的值
  const newValue = ensurePrecision(value, -1)
  setCurrentValue(newValue)
}
const increase = () => {
  if (props.disabled || props.readonly || maxDisabled.value) return
  const value = Number(displayValue.value) || 0
  // 通过step和precision算出加过之后的值
  const newVal = ensurePrecision(value)
  setCurrentValue(newVal)
}
const handleChange = (value: string) => {
  const newValue = value === '' ? null : Number(value)
  if ((isNumber(newValue) && !isNaN(newValue)) || value === '') {
    setCurrentValue(newValue)
  }
}
const handleInput = (value: string) => {
  const newValue = value === '' ? null : Number(value)
  setCurrentValue(newValue)
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