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
    const indeterminateSet = new Set<TreeKey>()
    const { maxLevel, levelTreeNodeMap } = tree.value
    // maxLevel - 1保证有children
    for (let level = maxLevel - 1; level >= 0; --level) {
      const nodes = levelTreeNodeMap.get(level)
      if (!nodes) continue
      nodes.forEach(node => {
        const children = node.children
        if (children) {
          // 标记自身和子集是否全部选中
          let allChecked = true
          let hasChekced = false
          for (const childNode of children) {
            const key = childNode.key
            if (checkedKeys.has(key)) {
              hasChekced = true
            } else if (indeterminateSet.has(key)) {
              allChecked = false
              hasChekced = true
              break
            } else {
              allChecked = false
            }
          }
          if (allChecked) {
            checkedKeys.add(node.key)
          } else if (hasChekced) {
            indeterminateSet.add(node.key)
            checkedKeys.delete(node.key)
          } else {
            checkedKeys.delete(node.key)
            indeterminateSet.delete(node.key)
          }
        }
      })
    }
    indeterminateKeysSet.value = indeterminateSet
  }

  const toggleCheck = (node: TreeNode, checked: CheckboxValueType) => {
    const checkedKeys = checkedKeysSet.value

    const toggle = (node: TreeNode, checked: CheckboxValueType) => {
      checked ? checkedKeys.add(node.key) : checkedKeys.delete(node.key)
      const children = node.children
      if (children) {
        children.forEach((childNode) => {
          if (!childNode.disabled) {
            toggle(childNode, checked)
          }
        })
      }
    }
    // 记录自身和自身的所有子集
    toggle(node, checked)
    // 计算所有选择框的勾选和半选状态
    updateCheckedKeys()
  }

  return {
    isChecked,
    isIndeterminate,
    toggleCheck
  }
}