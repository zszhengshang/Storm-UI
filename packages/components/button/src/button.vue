<template>
  <button
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('round', round),
      bem.is('loading', loading),
      bem.is('disabled', disabled),
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <template v-if="loading">

      <s-icon :class="bem.is('loading', loading)">
        <slot
          name="loading"
          v-if="$slots.loading"
        />
        <LoadingComponent v-else />
      </s-icon>
    </template>
    <s-icon v-else-if="icon || $slots.icon">
      <component
        :is="icon"
        v-if="icon"
      />
      <slot
        name="icon"
        v-else
      />
    </s-icon>
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils'
import { buttonEmits, buttonProps } from './button'
import SIcon from '@storm/components/icon'
import LoadingComponent from '@storm/components/internal-icon/loading.vue'
defineOptions({
  name: 'SButton',
  inheritAttrs: false
})
defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const bem = createNamespace('button')

const handleClick = (e: MouseEvent) => emit('click', e)
</script>