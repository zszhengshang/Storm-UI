import { ExtractPropTypes, PropType } from "vue";

export type ProgressFn = (percentage: number) => string
export const progressProps = {
  percentage: {
    type: Number,
    default: 0,
    validator: (val: number): boolean => val >= 0 && val <= 100
  },
  // 进度条高度
  height: {
    type: Number,
    default: 6
  },
  // 文本内嵌
  textInside: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: ''
  },
  // 是否为动画进度条
  indeterminate: {
    type: Boolean,
    default: false
  },
  // 动画速度
  duration: {
    type: Number,
    default: 3
  },
  color: {
    type: String,
    default: ''
  },
  showText: {
    type: Boolean,
    default: true
  },
  format: {
    type: Function as PropType<ProgressFn>,
    default: (percentage: number): string => `${percentage}%`
  }
} as const

export type ProgressProps = ExtractPropTypes<typeof progressProps>