<template>
  <div :class="[
    bem.b('node')
  ]">
    <div
      :class="bem.be('node', 'content')"
      :style="{ paddingLeft: `${node.level * indent}px` }"
    >
      <s-icon :class="[
        bem.be('node', 'expand-icon'),
        bem.is('leaf', !!node.isLeaf)
      ]">
        <component :is="icon" />
      </s-icon>
      <s-checkbox v-if="showCheckbox"></s-checkbox>
      <s-tree-node-content :node="node" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils/create';
import { treeNodeProps } from './tree-node';
import { inject, computed } from 'vue';
import { treeContextKey } from './tree';
import STreeNodeContent from './tree-node-content'
import SIcon from '@storm/components/icon'
import SCheckbox from '@storm/components/checkbox'
import Right from '@storm/components/internal-icon/right'
defineOptions({ name: 'STreeNode' })
defineProps(treeNodeProps)

const bem = createNamespace('tree')
const tree = inject(treeContextKey, undefined)
const indent = computed(() => tree?.indent ?? 16)
const icon = computed(() => tree?.icon ?? Right)
</script>