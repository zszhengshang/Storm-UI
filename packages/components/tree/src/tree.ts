import { iconPropType } from "@storm/utils"
import { ExtractPropTypes, PropType, InjectionKey, Component, SetupContext } from "vue"

export type TreeKey = string | number
type TreeContext = {
  indent?: number
  icon?: string | Component,
  ctx?: Omit<SetupContext<TreeEmits>, 'expose' | 'attrs'>
}
export type TreeNodeData = Record<string, any>
export type FilterMethod = (query: string, node: TreeNodeData) => boolean
export interface TreeOptionProps {
  value?: string
  label?: string
  children?: string
  disabled?: string
}
export interface TreeNode {
  key: TreeKey
  label?: string
  disabled?: boolean
  children?: TreeNode[]
  level: number
  parent?: TreeNode
  rawNode: TreeNodeData
  isLeaf?: boolean
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeNodeData[]>,
    default: () => []
  },
  emptyText: String,
  props: {
    type: Object as PropType<TreeOptionProps>,
    default: () => ({
      value: 'id',
      label: 'label',
      disabled: 'disabled',
      children: 'children'
    })
  },
  load: Function as PropType<(node: TreeOptionProps) => Promise<TreeOptionProps[]>>,
  // 是否高亮当前选中节点
  highlightCurrent: Boolean,
  // 默认展开的节点的 key 的数组
  defaultExpandedKeys: {
    type: Array as PropType<TreeKey[]>,
    default: () => []
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  // 默认勾选的节点的 key 的数组
  defaultCheckedKeys: {
    type: Array as PropType<TreeKey[]>,
    default: () => []
  },
  // 当前选中的节点
  currentNodeKey: [String, Number] as PropType<TreeKey>,
  // 对树节点进行筛选时执行的方法
  filterNodeMethod: Function as PropType<FilterMethod>,
  indent: {
    type: Number,
    default: 16
  },
  icon: iconPropType,
  lazy: {
    type: Boolean,
    default: false
  }
} as const
export const treeEmits = {
  nodeClick: (data: TreeNodeData, node: TreeNode, e: MouseEvent) => data && node && e,
  checkChange: (data: TreeNodeData, checked: boolean) =>
    data && typeof checked === 'boolean',
  nodeExpand: (data: TreeNodeData, node: TreeNode) => data && node,
  nodeCollapse: (data: TreeNodeData, node: TreeNode) => data && node
}
export const treeContextKey: InjectionKey<TreeContext> = Symbol('treeContextKey')

export type TreeProps = ExtractPropTypes<typeof treeProps>
export type TreeEmits = typeof treeEmits