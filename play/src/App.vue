<template>
  <s-icon
    color="red"
    size="40"
  >
    <AddCircle />
  </s-icon>
  <s-icon
    color="yellow"
    size="30"
  >
    <AddCircle />
  </s-icon>
  <s-button a="1">按钮</s-button>
  <s-radio
    v-model="radio"
    label="disabled"
  >Option A</s-radio>
  <s-radio
    v-model="radio"
    label="selected and disabled"
  >Option B</s-radio>
  <s-radio
    disabled
    v-model="radio"
    label="selected and disabled"
  >Option C</s-radio>
  <s-radio-group v-model="radioGroup">
    <s-radio :label="1" disabled>Option A</s-radio>
    <s-radio :label="2">Option B</s-radio>
    <s-radio :label="3">Option C</s-radio>
  </s-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AddCircle } from '@vicons/ionicons5'
const radio = ref('selected and disabled')
const radioGroup = ref(1)
</script>