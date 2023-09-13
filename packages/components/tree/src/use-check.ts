import { Ref, ref } from "vue";
import { Tree, TreeKey, TreeNode, TreeProps } from "./tree";
import type { CheckboxValueType } from '@storm/components/checkbox'

export const useCheck = (props: TreeProps, tree: Ref<Tree | undefined>) => {
  const checkedKeysSet = ref<Set<TreeKey>>(new Set())
  const indeterminateKeysSet = ref<Set<TreeKey>>(new Set())

  const isChecked = (node: TreeNode) => checkedKeysSet.value.has(node.key)
  const isIndeterminate = (node: TreeNode) => indeterminateKeysSet.value.has(node.key)

  const updateCheckedKeys = () => {
    if (!tree.value) return
    const checkedKeys = checkedKeysSet.value
    const indeterminateKeys = indeterminateKeysSet.value
    const { maxLevel, levelTreeNodeMap } = tree.value

    for (let level = maxLevel; level >= 0; --level) {
      const nodes = levelTreeNodeMap.get(level)
      if (!nodes) continue
      nodes.forEach(node => {
        const children = node.children
        if (children) {
          let allChecked = true
          let hasChecked = false
          for (const childNode of children) {
            const key = childNode.key
            if (checkedKeys.has(key)) {
              hasChecked = true
            } else if (indeterminateKeys.has(key)) {
              allChecked = false
              hasChecked = true
              break
            } else {
              allChecked = false
            }
          }
          if (allChecked) {
            checkedKeys.add(node.key)
          } else if (hasChecked) {
            indeterminateKeys.add(node.key)
            checkedKeys.delete(node.key)
          } else {
            checkedKeys.delete(node.key)
            indeterminateKeys.delete(node.key)
          }
        }
      })
    }
  }

  const toggleCheck = (node: TreeNode, checked: CheckboxValueType) => {
    const checkedKeys = checkedKeysSet.value

    const toggle = (node: TreeNode, checked: CheckboxValueType) => {
      checked ? checkedKeys.delete(node.key) : checkedKeys.add(node.key)
      const children = node.children
      if (children) {
        children.forEach((childNode) => {
          if (!childNode.disabled) {
            toggle(childNode, checked)
          }
        })
      }
    }
    toggle(node, checked)
    updateCheckedKeys()
  }

  return {
    isChecked,
    isIndeterminate,
    toggleCheck
  }
}