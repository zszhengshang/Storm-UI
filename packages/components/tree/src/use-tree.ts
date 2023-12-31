import { SetupContext, computed, ref, watch } from "vue";
import { Tree, TreeEmits, TreeKey, TreeNode, TreeNodeData, TreeOptionProps, TreeProps } from "./tree";
import { useCheck } from "./use-check";
import type { CheckboxValueType } from '@storm/components/checkbox'
import { useFilter } from "./use-filter";

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
    },
    updateLeafState() {

    }
  }
}

export const useTree = (props: TreeProps, emit: SetupContext<TreeEmits>['emit']) => {
  const tree = ref<Tree | undefined>()
  const treeOptions = createOptions(props.props)
  const expandedKeysSet = ref(new Set(props.defaultExpandedKeys))
  const loadingKeysSet = ref(new Set<TreeKey>())
  // 可选择树相关
  const {
    isChecked,
    isIndeterminate,
    toggleCheck,
    getCheckedNodes,
    getCheckedKeys,
    setCheckedKeys,
    setChecked,
    getHalfCheckedNodes,
    getHalfCheckedKeys
  } = useCheck(props, tree)
  // 节点过滤相关
  const { hiddenNodeKeysSet, isHiddenExpandIcon, doFilter } = useFilter(props, tree)

  const valueKey = computed(() => {
    return props.props.value || 'id'
  })
  // 要渲染的tree-node
  const flattenTree = computed(() => {
    // 要展开的key
    const expandedKeys = expandedKeysSet.value
    // 要隐藏的key
    const hiddenKeys = hiddenNodeKeysSet.value
    // 格式化后的节点
    const nodes = (tree.value && tree.value.treeNodes) || []
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
      if (!hiddenKeys.has(node.key)) {
        flattenNodes.push(node)
      }
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
    let maxLevel = 0
    // 根据key获取对应节点
    const treeNodeMap: Map<TreeKey, TreeNode> = new Map()
    // 获取level对应的所有节点
    const levelTreeNodeMap = new Map<number, TreeNode[]>()
    function traversal(data: TreeNodeData[], parent?: TreeNode) {
      return data.map(rawNode => {
        const children = treeOptions.getChildren(rawNode) || []
        // 有父节点就+1，没有说明就是0
        const level = parent ? parent.level + 1 : 0
        const value = rawNode[valueKey.value] ?? ''
        const treeNode: TreeNode = {
          key: treeOptions.getKey(rawNode),
          label: treeOptions.getLabel(rawNode),
          children: [],
          disabled: !!rawNode.disabled,
          // 没有格式化过的数据
          rawNode,
          level,
          // 叶子节点
          isLeaf: (props.lazy && !!rawNode.isLeaf) ?? children.length === 0
        }
        if (children.length > 0) {
          treeNode.children = traversal(children, treeNode)
        }
        if (level > maxLevel) {
          maxLevel = level
        }
        treeNodeMap.set(value, treeNode)
        if (!levelTreeNodeMap.has(level)) {
          // 没有关系的 先创建关系
          levelTreeNodeMap.set(level, [])
        }
        levelTreeNodeMap.get(level)?.push(treeNode)
        return treeNode
      })
    }
    // 动态加载的时候需要传入父节点
    const treeNodes: TreeNode[] = traversal(data, parent)
    return {
      maxLevel,
      treeNodeMap,
      levelTreeNodeMap,
      treeNodes
    }
  }
  const isExpanded = (node: TreeNode) => expandedKeysSet.value.has(node.key)
  const isDisabled = (node: TreeNode) => !!node.disabled
  //--- 展开收起功能开始
  const onLoad = (node: TreeNode) => {
    const loadingKeys = loadingKeysSet.value
    // 这个节点的子节点需要异步加载
    if (!node.children?.length && !node.isLeaf && props.lazy) {
      if (!loadingKeys.has(node.key)) {
        loadingKeys.add(node.key)
        const load = props.load
        if (load) {
          const reolve = (children: TreeOptionProps[]) => {
            if (children.length > 0) {
              // 修改原来的节点数据
              node.rawNode.children = children
              // 更新自定义的node
              node.children = createTree(children, node).treeNodes
            } else {
              node.rawNode.isLeaf = true
              node.isLeaf = true
            }
            // 加载完成后把对应的loading关掉
            loadingKeys.delete(node.key)
          }
          load(node, reolve)
        }
      }
    }
  }
  const expandNode = (node: TreeNode) => {
    const expandedKeys = expandedKeysSet.value
    expandedKeys.add(node.key)
    emit('nodeExpand', node.rawNode, node)
    // 异步加载节点
    onLoad(node)
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
  // 过滤节点
  const filter = (query: string) => {
    const keys = doFilter(query)
    if (keys) {
      expandedKeysSet.value = keys
    }
  }
  // 设置当前展开节点
  const setExpandedKeys = (keys: TreeKey[]) => {
    expandedKeysSet.value = new Set(keys)
  }
  // 通过key获取节点
  const getNode = (key: TreeKey) => tree.value?.treeNodeMap.get(key)
  // 手动设置数据源
  const setData = (data: TreeNodeData[]) => {
    tree.value = createTree(data)
  }

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
  }
}