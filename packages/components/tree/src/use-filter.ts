import { Ref, computed, ref } from "vue";
import { Tree, TreeKey, TreeNode, TreeProps } from "./tree";
import { isFunction } from "@storm/utils";

export const useFilter = (props: TreeProps, tree: Ref<Tree | undefined>) => {
  const hiddenNodeKeysSet = ref<Set<TreeKey>>(new Set([]))
  const hiddenExpandIconKeysSet = ref<Set<TreeKey>>(new Set([]))

  const isFilter = computed(() => isFunction(props.filterMethod))

  const isHiddenExpandIcon = (node: TreeNode) => hiddenExpandIconKeysSet.value.has(node.key)

  const doFilter = (query: string) => {
    if (!isFilter.value) return
    // 过滤后的节点自动展开
    const expandKeysSet = new Set<TreeKey>()
    // 需要隐藏的节点
    const hiddenNodeKeys = hiddenNodeKeysSet.value
    // 需要隐藏的节点图标
    const hiddenExpandIconKeys = hiddenExpandIconKeysSet.value
    // 临时存放每个层级的节点
    const family: TreeNode[] = []
    const nodes = tree.value?.treeNodes ?? []
    // 用户传入的值过滤函数
    const filterMethod = props.filterMethod
    // 每次过滤都要把之前隐藏的节点清空
    hiddenNodeKeys.clear()
    const traverse = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        family.push(node)
        // 满足条件的展开节点 不满足的没有子节点的隐藏
        if (filterMethod?.(query, node.rawNode)) {
          family.forEach((member) => {
            expandKeysSet.add(member.key)
          })
        } else if (node.isLeaf) {
          // 可能过滤后展示的子节点 父节点需要展开不隐藏
          hiddenNodeKeys.add(node.key)
        }
        // 深度优先 先把子节点的隐藏展开处理好
        const children = node.children
        if (children) {
          traverse(children)
        }
        if (!node.isLeaf) {
          if (!expandKeysSet.has(node.key)) {
            hiddenNodeKeys.add(node.key)
          } else if (children) {
            // 标记子节点是否都隐藏
            let allHidden = true
            for (const childNode of children) {
              if (!hiddenNodeKeys.has(childNode.key)) {
                // 如果自节点不需要隐藏 那么当前节点箭头也不需要隐藏
                allHidden = false
                break
              }
            }
            if (allHidden) {
              hiddenExpandIconKeys.add(node.key)
            } else {
              hiddenExpandIconKeys.delete(node.key)
            }
          }
        }
        family.pop()
      })
    }
    // 递归所有节点 根据过滤条件过滤节点 展开节点和隐藏节点
    traverse(nodes)
    return expandKeysSet
  }

  return {
    hiddenNodeKeysSet,
    isHiddenExpandIcon,
    doFilter
  }
}