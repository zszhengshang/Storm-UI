<template>
  <div :class="[
    bem.b(),
    bem.is(status),
    {
      [bem.m('text-inside')]: textInside,
      [bem.m('widthout-text')]: !showText
    }
  ]">
    <div :class="bem.b('bar')">
      <div
        :class="bem.be('bar', 'outer')"
        :style="{ height: `${height}px` }"
      >
        <div
          :class="[
            bem.be('bar', 'inner'),
            {
              [bem.bem('bar', 'inner', 'indeterminate')]: indeterminate
            }
          ]"
          :style="innerStyle"
        >
          <div
            :class="bem.be('bar', 'inner-text')"
            v-if="(showText || $slots.default) && textInside"
          >
            <slot>
              <span>{{ content }}</span>
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="bem.e('text')"
      v-if="(showText || $slots.default) && !textInside"
    >
      <slot>
        <span>{{ content }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils/create';
import { progressProps } from './progress';
import { computed, CSSProperties } from 'vue';
defineOptions({ name: 'SProgress' })
const props = defineProps(progressProps)

const bem = createNamespace('progress')
const content = computed(() => props.format(props.percentage))
const innerStyle = computed<CSSProperties>(() => {
  return {
    width: `${props.percentage}%`,
    animationDuration: `${props.duration}s`,
    backgroundColor: props.color
  }
})
</script>