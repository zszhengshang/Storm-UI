import { iconPropType } from "@storm/utils"
import { ExtractPropTypes, PropType } from "vue"

export type Size = 'small' | 'default' | 'large'
export type Type = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
export type NativeType = 'button' | 'submit' | 'reset'

export const buttonProps = {
  size: {
    type: String as PropType<Size>,
    default: ''
  },
  type: {
    type: String as PropType<Type>,
    default: 'default'
  },
  round: Boolean,
  loading: Boolean,
  disabled: Boolean,
  icon: {
    type: iconPropType
  },
  nativeType: {
    type: String as PropType<NativeType>,
    default: 'button'
  }
} as const

export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent,
  mousedown: (e: MouseEvent) => e instanceof MouseEvent
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits