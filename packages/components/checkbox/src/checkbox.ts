import { UPDATE_MODEL_EVENT } from '@storm/constants'
import { isBoolean, isNumber, isString } from '@storm/utils'
import { ExtractPropTypes } from 'vue'

type checkboxValueType = number | string | boolean
export const checkboxProps = {
  modelValue: {
    type: [Number, String, Boolean],
    default: undefined,
  },
  label: {
    type: [String, Boolean, Number],
  },
  indeterminate: Boolean,
  disabled: Boolean,
  checked: Boolean,
  name: String
}

export const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (val: checkboxValueType) => isNumber(val) || isString(val) || isBoolean(val),
  change: (val: checkboxValueType) => isNumber(val) || isString(val) || isBoolean(val)
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxEmits = typeof checkboxEmits