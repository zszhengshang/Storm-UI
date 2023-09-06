import { ExtractPropTypes, PropType } from "vue";

export type ProgressFn = (percentage: number) => string
export const progressProps = {
  percentage: {
    type: Number,
    default: 0,
    validator: (val: number): boolean => val >= 0 && val <= 100
  },
  type: {
    type: String,
    default: 'line'
  },
  height: {
    type: Number,
    default: 6
  },
  textInside: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: ''
  },
  indeterminate: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 3
  },
  color: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 126
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