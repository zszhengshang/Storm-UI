<template>
  <div :class="bem.b()">
    <s-tree-node
      v-for="node in flattenTree"
      :key="node.key"
      :node="node"
      :show-checkbox="showCheckbox"
      @click="(e) => handleNodeClick(node, e)"
    />
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
const { flattenTree, handleNodeClick } = useTree(props, emit)
console.log(flattenTree.value)

provide(treeContextKey, {
  ctx: {
    emit,
    slots
  },
  indent: props.indent,
  icon: props.icon
})
</script>