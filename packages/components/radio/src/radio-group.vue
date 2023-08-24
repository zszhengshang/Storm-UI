<template>
  <div :class="bem.b('group')">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, toRefs, reactive } from 'vue';
import { radioGroupEmits, radioGroupProps, radioGroupKey } from './radio-group'
import { createNamespace } from '@storm/utils/create';
defineOptions({ name: 'SRadioGroup' })
const props = defineProps(radioGroupProps)
defineEmits(radioGroupEmits)

const changeEvent = () => { }

const bem = createNamespace('radio')
</script>