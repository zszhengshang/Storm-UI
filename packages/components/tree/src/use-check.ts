import { Ref, getCurrentInstance, ref, watch } from "vue";
import { Tree, TreeKey, TreeNode, TreeNodeData, TreeProps } from "./tree";
import type { CheckboxValueType } from '@storm/components/checkbox'

export const useCheck = (props: TreeProps, tree: Ref<Tree | undefined>) => {
  const checkedKeysSet = ref<Set<TreeKey>>(new Set())
  const indeterminateKeysSet = ref<Set<TreeKey>>(new Set())

  const isChecked = (node: TreeNode) => checkedKeysSet.value.has(node.key)
  const isIndeterminate = (node: TreeNode) => indeterminateKeysSet.value.has(node.key)

  const { emit } = getCurrentInstance()!

  const updateCheckedKeys = () => {
    if (!tree.value || !props.showCheckbox) return
    const checkedKeys = checkedKeysSet.value
    const indeterminateSet = new Set<TreeKey>()
    const { maxLevel, levelTreeNodeMap } = tree.value
    // maxLevel - 1保证有children
    for (let level = maxLevel - 1; level >= 0; --level) {
      const nodes = levelTreeNodeMap.get(level)
      if (!nodes) continue
      nodes.forEach(node => {
        const children = node.children
        if (children?.length) {
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
    emit('checkChange', node, checked)
  }

  const _setCheckedKeys = (keys: TreeKey[]) => {
    if (tree?.value) {
      const { treeNodeMap } = tree.value
      if (props.showCheckbox && keys) {
        keys.forEach(key => {
          // 找到对应的节点 如果没有被勾选执行勾选
          const node = treeNodeMap.get(key)
          if (node && !isChecked(node)) {
            toggleCheck(node, true)
          }
        })
      }
    }
  }
  const getHalfChecked = () => {
    const halfCheckedNodes: TreeNodeData[] = []
    const halfCheckedKeys: TreeKey[] = []
    if (tree?.value && props.showCheckbox) {
      const { treeNodeMap } = tree.value
      indeterminateKeysSet.value.forEach(key => {
        const node = treeNodeMap.get(key)
        if (node) {
          halfCheckedKeys.push(key)
          halfCheckedNodes.push(node.rawNode)
        }
      })
    }
    return {
      halfCheckedNodes,
      halfCheckedKeys
    }
  }
  // 返回勾选的节点 true表示只返回没有子集的节点
  const getChecked = (leafOnly = false) => {
    const checkedNodes: TreeNodeData[] = []
    const keys: TreeKey[] = []
    if (tree?.value && props.showCheckbox) {
      const { treeNodeMap } = tree.value
      checkedKeysSet.value.forEach(key => {
        const node = treeNodeMap.get(key)
        if (node && (!leafOnly || (leafOnly && node.isLeaf))) {
          keys.push(key)
          checkedNodes.push(node.rawNode)
        }
      })
    }
    return {
      checkedKeys: keys,
      checkedNodes
    }
  }
  // 返回目前被选中的节点所组成的数组
  const getCheckedNodes = (leafOnly = false): TreeNodeData[] => getChecked(leafOnly).checkedNodes
  // 返回目前被选中的节点的key所组成的数组
  const getCheckedKeys = (leafOnly = false): TreeKey[] => getChecked(leafOnly).checkedKeys
  // 返回目前半选中的节点的所组成的数组
  const getHalfCheckedNodes = (): TreeNodeData[] => getHalfChecked().halfCheckedNodes
  // 返回目前半选中的节点的key所组成的数组
  const getHalfCheckedKeys = (): TreeKey[] => getHalfChecked().halfCheckedKeys
  // 通过keys设置目前勾选的节点
  const setCheckedKeys = (keys: TreeKey[]) => {
    checkedKeysSet.value.clear()
    indeterminateKeysSet.value.clear()
    _setCheckedKeys(keys)
  }
  // 	通过key设置某个节点的勾选状态
  const setChecked = (key: TreeKey, checked: boolean) => {
    if (tree?.value && props.showCheckbox) {
      const { treeNodeMap } = tree.value
      const node = treeNodeMap.get(key)
      if (node) {
        toggleCheck(node, checked)
      }
    }
  }
  // 初始化默认勾选
  watch(
    [() => tree.value, () => props.defaultCheckedKeys],
    () => {
      _setCheckedKeys(props.defaultCheckedKeys)
    },
    {
      immediate: true
    }
  )

  return {
    isChecked,
    isIndeterminate,
    toggleCheck,
    getCheckedNodes,
    getCheckedKeys,
    setCheckedKeys,
    setChecked,
    getHalfCheckedNodes,
    getHalfCheckedKeys
  }
}