import { ExtractPropTypes, PropType } from "vue";
import { TreeKey, TreeNode } from "./tree";
import type { CheckboxValueType } from '@storm/components/checkbox'
import { isBoolean } from "@storm/utils";

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  expanded: {
    type: Boolean,
    default: false
  },
  checked: {
    type: Boolean,
    default: false
  },
  indeterminate: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  hiddenExpandIcon: {
    type: Boolean,
    default: false
  },
  loadingKeys: Object as PropType<Set<TreeKey>>
} as const

export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  }
} as const

export const treeNodeEmits = {
  check: (node: TreeNode, checked: CheckboxValueType) => node && isBoolean(checked)
}

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>
export type TreeNodeContentProps = ExtractPropTypes<typeof treeNodeContentProps>