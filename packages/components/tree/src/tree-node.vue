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
        bem.is('leaf', !!node.isLeaf),
        bem.is('hidden', hiddenExpandIcon),
        {
          expanded: !node.isLeaf && expanded
        }
      ]">
        <component :is="icon" />
      </s-icon>
      <s-icon
        :class="bem.is('loading', isLoading)"
        v-if="isLoading"
      >
        <Loading />
      </s-icon>
      <s-checkbox
        :model-value="checked"
        :indeterminate="indeterminate"
        :disabled="disabled"
        @change="handleCheckChange"
        @click.stop
        v-if="showCheckbox"
      />
      <s-tree-node-content :node="node" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils/create';
import { treeNodeProps, treeNodeEmits } from './tree-node';
import { inject, computed } from 'vue';
import { treeContextKey } from './tree';
import STreeNodeContent from './tree-node-content'
import SIcon from '@storm/components/icon'
import SCheckbox from '@storm/components/checkbox'
import Right from '@storm/components/internal-icon/right'
import Loading from '@storm/components/internal-icon/loading'
import type { CheckboxValueType } from '@storm/components/checkbox'
defineOptions({ name: 'STreeNode' })
const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmits)

const bem = createNamespace('tree')
const tree = inject(treeContextKey, undefined)
const indent = computed(() => tree?.indent ?? 16)
const icon = computed(() => tree?.icon ?? Right)
const isLoading = computed(() => props.loadingKeys?.has(props.node.key))

const handleCheckChange = (value: CheckboxValueType) => emit('check', props.node, value)
</script>