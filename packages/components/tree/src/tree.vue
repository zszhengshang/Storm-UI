<template>
  <div
    :class="bem.b()"
    :style="{ height: flattenTree.length ? flattenTree.length * 26 + 'px' : undefined }"
  >
    <s-tree-node
      v-for="node in flattenTree"
      :key="node.key"
      :node="node"
      :expanded="isExpanded(node)"
      :checked="isChecked(node)"
      :indeterminate="isIndeterminate(node)"
      :disabled="isDisabled(node)"
      :show-checkbox="showCheckbox"
      :hidden-expand-icon="isHiddenExpandIcon(node)"
      :loadingKeys="loadingKeysSet"
      @click="(e: MouseEvent) => handleNodeClick(node, e)"
      @check="handleNodeCheck"
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
import { createNamespace } from '@storm/utils';
import { treeProps, treeEmits, treeContextKey } from './tree'
import STreeNode from './tree-node.vue'
import { useTree } from './use-tree'
import { provide, useSlots } from 'vue';
defineOptions({ name: 'STree' })
const props = defineProps(treeProps)
const emit = defineEmits(treeEmits)
const slots = useSlots()

const bem = createNamespace('tree')
const {
  loadingKeysSet,
  flattenTree,
  isNotEmpty,
  isExpanded,
  isChecked,
  isIndeterminate,
  isDisabled,
  handleNodeClick,
  handleNodeCheck,
  isHiddenExpandIcon,
  // expose
  filter,
  getCheckedNodes,
  getCheckedKeys,
  setCheckedKeys,
  setChecked,
  setExpandedKeys,
  getHalfCheckedNodes,
  getHalfCheckedKeys,
  getNode,
  expandNode,
  collapseNode,
  setData
} = useTree(props, emit)

provide(treeContextKey, {
  ctx: {
    emit,
    slots
  },
  indent: props.indent,
  icon: props.icon
})

defineExpose({
  filter,
  getCheckedNodes,
  getCheckedKeys,
  setCheckedKeys,
  setChecked,
  setExpandedKeys,
  getHalfCheckedNodes,
  getHalfCheckedKeys,
  getNode,
  expandNode,
  collapseNode,
  setData
})
</script>