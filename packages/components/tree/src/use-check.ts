import { ref } from "vue";
import { TreeKey, TreeNode, TreeProps } from "./tree";
import type { CheckboxValueType } from '@storm/components/checkbox'

export const useCheck = (props: TreeProps) => {
  const checkedKeysSet = ref<Set<TreeKey>>(new Set())
  const indeterminateKeysSet = ref<Set<TreeKey>>(new Set())

  const isChecked = (node: TreeNode) => checkedKeysSet.value.has(node.key)
  const isIndeterminate = (node: TreeNode) => indeterminateKeysSet.value.has(node.key)

  const toggleCheck = (node: TreeNode, isChecked: CheckboxValueType) => {
    const checkedKeys = checkedKeysSet.value
  }

  return {
    isChecked,
    isIndeterminate,
    toggleCheck
  }
}