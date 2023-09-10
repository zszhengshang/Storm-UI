import { ExtractPropTypes, PropType } from "vue";
import { TreeNode } from "./tree";

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  showCheckbox: {
    type: Boolean,
    default: false
  }
} as const

export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  }
} as const

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>
export type TreeNodeContentProps = ExtractPropTypes<typeof treeNodeContentProps>