<template>
  <div :class="[
    bem.b(),
    bem.is('disabled', disabled)
  ]">
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <div :class="bem.e('wrapper')">
        <!-- 输入框头部内容 -->
        <span
          :class="bem.e('prefix')"
          v-if="$slots.prefix || prefixIcon"
        ></span>
        <input :type="type" :class="bem.e('inner')">
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
import { computed, useSlots } from 'vue';
defineOptions({
  name: 'SInput',
  inheritAttrs: false
})
const props = defineProps(inputProps)
defineEmits(inputEmits)
const slots = useSlots()

const bem = createNamespace('input')
// 清除按钮
const showClear = computed(() => props.clearable)
// 输入框尾部内容
const suffixVisible = computed(() => slots.suffix || !!props.suffixIcon || showClear.value)
</script>