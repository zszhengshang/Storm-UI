import { iconPropType } from "@storm/utils"
import { PropType } from "vue"

export type Key = string | number
type Node = {
  id: number
  text: string
  checked: boolean
  indeterminate: boolean
  data: Record<string, any>
  expanded: boolean
  parent: Node
  visible: boolean
  isCurrent: boolean
  isLeaf: boolean
  canFocus: boolean
  level: number
  loaded: boolean
  childNodes: Node[]
  loading: boolean
}
export type LoadFn = (
  node: Node,
  resolve: (data: Record<string, any>) => void
) => void
export type filterNodeMethodFn = (
  value: any,
  data: Record<string, any>,
  node: Node
) => boolean

export interface TreeData {
  label?: Key
  children?: TreeData[]
  isLeaf?: boolean
  disabled?: boolean
}
export const treeProps = {
  data: {
    type: Array,
    default: () => []
  },
  emptyText: String,
  nodeKey: String,
  props: {
    type: Object as PropType<TreeData>,
    default: () => ({
      label: 'label',
      disabled: 'disabled',
      children: 'children'
    })
  },
  load: Function as PropType<LoadFn>,
  // 自定义内容
  renderContent: Function,
  // 是否高亮当前选中节点
  highlightCurrent: Boolean,
  // 	是否默认展开所有节点
  defaultExpandAll: Boolean,
  // 默认展开的节点的 key 的数组
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  // 默认勾选的节点的 key 的数组
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  // 当前选中的节点
  currentNodeKey: [String, Number] as PropType<Key>,
  // 对树节点进行筛选时执行的方法
  filterNodeMethod: Function as PropType<filterNodeMethodFn>,
  // 手风琴模式
  accordion: Boolean,
  indent: {
    type: Number,
    default: 18
  },
  icon: iconPropType,
  lazy: {
    type: Boolean,
    default: false
  },
  draggable: {
    type: Boolean,
    default: false
  },
  // 节点能否被拖拽
  allowDrag: Function,
  // 节点能否拖放到目标节点
  allowDrop: Function
}