import { Ref, computed } from "vue";
import { Tree, TreeKey, TreeNode, TreeProps } from "./tree";
import { isFunction } from "@storm/utils";

export const useFilter = (props: TreeProps, tree: Ref<Tree | undefined>) => {
  const isFilter = computed(() => isFunction(props.filterMethod))

  const doFilter = (query: string) => {
    if (!isFilter.value) return
    const expandKeySet = new Set<TreeKey>()
    const family: TreeNode[] = []
    const nodes = tree.value?.treeNodes ?? []
    const filterMethod = props.filterMethod

    const traverse = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        family.push(node)
        if (filterMethod?.(query, node.rawNode)) {
          family.forEach((member) => {
            expandKeySet.add(member.key)
          })
        }
        const children = node.children
        if (children) {
          traverse(children)
        }
        family.pop()
      })
    }
    traverse(nodes)
    return expandKeySet
  }

  return {
    doFilter
  }
}