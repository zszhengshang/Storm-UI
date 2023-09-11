<template>
  <div :class="bem.b()">
    <s-tree-node
      v-for="node in flattenTree"
      :key="node.key"
      :node="node"
      :expanded="isExpanded(node)"
      :show-checkbox="showCheckbox"
      @click="(e) => handleNodeClick(node, e)"
      v-if="isNotEmpty"
    />
    <div
      :class="bem.e('empty')"
      v-else
    >
      <span :class="bem.e('empty-text')">{{ emptyText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils/create';
import { treeProps, treeEmits, treeContextKey } from './tree'
import STreeNode from './tree-node.vue'
import { useTree } from './use-tree'
import { provide, useSlots } from 'vue';
defineOptions({ name: 'STree' })
const props = defineProps(treeProps)
const emit = defineEmits(treeEmits)
const slots = useSlots()

const bem = createNamespace('tree')
const { flattenTree, isNotEmpty, isExpanded, handleNodeClick } = useTree(props, emit)

provide(treeContextKey, {
  ctx: {
    emit,
    slots
  },
  indent: props.indent,
  icon: props.icon
})
</script>