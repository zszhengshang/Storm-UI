import { SetupContext, computed, ref, watch } from "vue";
import { TreeEmits, TreeNode, TreeNodeData, TreeOptionProps, TreeProps } from "./tree";
import { useCheck } from "./use-check";
import type { CheckboxValueType } from '@storm/components/checkbox'

function createOptions(props: TreeOptionProps) {
  return {
    // 用户传递的key
    getKey(node: TreeNodeData) {
      const value = props.value as string ?? 'id'
      return node[value]
    },
    // 用户传递的label
    getLabel(node: TreeNodeData) {
      const label = props.label as string ?? 'label'
      return node[label]
    },
    // 用户传递的children
    getChildren(node: TreeNodeData) {
      const children = props.children as string ?? 'children'
      return node[children]
    }
  }
}

export const useTree = (props: TreeProps, emit: SetupContext<TreeEmits>['emit']) => {
  const tree = ref<TreeNode[]>([])
  const treeOptions = createOptions(props.props)
  const expandedKeysSet = ref(new Set(props.defaultExpandedKeys))
  // 可选择树相关
  const {
    isChecked,
    isIndeterminate,
    toggleCheck
  } = useCheck(props)
  // 要渲染的tree-node
  const flattenTree = computed(() => {
    // 要展开的key
    const expandedKeys = expandedKeysSet.value
    // 格式化后的节点
    const nodes = tree.value
    // 用于遍历树的栈
    const stack: TreeNode[] = []
    // 拍平后的结果
    const flattenNodes: TreeNode[] = []
    // 倒着放
    for (let i = nodes.length - 1; i >= 0; --i) {
      stack.push(nodes[i])
    }
    while (stack.length) {
      // 倒着取防止数组塌陷
      const node = stack.pop()
      if (!node) continue
      flattenNodes.push(node)
      // 如果节点中的key是需要展开的 把他子节点也放进去继续遍历
      if (expandedKeys.has(node.key)) {
        const children = node.children
        if (children) {
          for (let i = children.length - 1; i >= 0; --i) {
            stack.push(children[i])
          }
        }
      }
    }
    return flattenNodes
  })
  const isNotEmpty = computed(() => flattenTree.value.length > 0)

  const createTree = (data: TreeNodeData[], parent?: TreeNode) => {
    function traversal(data: TreeNodeData[], parent?: TreeNode) {
      return data.map(rawNode => {
        const children = treeOptions.getChildren(rawNode) || []
        const treeNode: TreeNode = {
          key: treeOptions.getKey(rawNode),
          label: treeOptions.getLabel(rawNode),
          children: [],
          disabled: !!rawNode.disabled,
          // 没有格式化过的数据
          rawNode,
          // 有父节点就+1，没有说明就是0
          level: parent ? parent.level + 1 : 0,
          // 叶子节点
          isLeaf: children.length === 0
        }
        if (children.length > 0) {
          treeNode.children = traversal(children, treeNode)
        }
        return treeNode
      })
    }
    // 动态加载的时候需要传入父节点
    const result: TreeNode[] = traversal(data, parent)
    return result
  }
  const isExpanded = (node: TreeNode) => expandedKeysSet.value.has(node.key)
  const isDisabled = (node: TreeNode) => !!node.disabled
  //--- 展开收起功能开始
  const expandNode = (node: TreeNode) => {
    const expandedKeys = expandedKeysSet.value
    expandedKeys.add(node.key)
    emit('nodeExpand', node.rawNode, node)
  }
  const collapseNode = (node: TreeNode) => {
    expandedKeysSet.value.delete(node.key)
    emit('nodeCollapse', node.rawNode, node)
  }
  const toggleExpand = (node: TreeNode) => {
    const expandedKeys = expandedKeysSet.value
    if (expandedKeys.has(node.key)) {
      // 收起
      collapseNode(node)
    } else {
      // 展开
      expandNode(node)
    }
  }
  const handleNodeClick = (node: TreeNode, e: MouseEvent) => {
    emit('nodeClick', node.rawNode, node, e)
    // 切换展开收起
    toggleExpand(node)
  }
  //--- 展开收起功能结束
  // 切换勾选
  const handleNodeCheck = (node: TreeNode, checked: CheckboxValueType) => toggleCheck(node, checked)

  // 监控数据变化 调用格式化方法
  watch(
    () => props.data,
    data => {
      tree.value = createTree(data)
    },
    {
      immediate: true
    }
  )

  return {
    flattenTree,
    isNotEmpty,
    isExpanded,
    isChecked,
    isIndeterminate,
    isDisabled,
    handleNodeClick,
    handleNodeCheck
  }
}