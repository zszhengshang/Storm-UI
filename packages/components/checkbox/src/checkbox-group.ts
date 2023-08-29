import { ExtractPropTypes, PropType, WritableComputedRef, InjectionKey } from 'vue'
import { checkboxValueType } from './checkbox'
import { UPDATE_MODEL_EVENT } from '@storm/constants'
import { isArray } from '@storm/utils'

export type CheckboxGroupValueType = Exclude<checkboxValueType, boolean>[]
type CheckboxGroupContext = {
  modelValue?: WritableComputedRef<any>,
  disabled?: boolean,
  changeEvent?: (...args: any) => any
}
export const checkboxGroupProps = {
  modelValue: {
    type: Array as PropType<CheckboxGroupValueType>,
    default: () => []
  },
  diabled: Boolean
}

export const checkGroupEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxGroupValueType) => isArray(val),
  change: (val: CheckboxGroupValueType) => isArray(val)
}

export const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext> = Symbol('checkboxGroupContextKey')

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupEmits = typeof checkGroupEmits