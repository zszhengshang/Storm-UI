import { UPDATE_MODEL_EVENT } from "@storm/constants"
import { isBoolean, isNumber, isString } from "@storm/utils"
import { ExtractPropTypes } from "vue"

type radioValueType = string | number | boolean
export const radioProps = {
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  label: {
    type: [String, Number, Boolean],
    default: ''
  },
  disabled: Boolean,
  name: {
    type: String,
    default: undefined,
  }
}

export const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val: radioValueType) => isString(val) || isNumber(val) || isBoolean(val),
  change: (val: radioValueType) => isString(val) || isNumber(val) || isBoolean(val)
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioEmits = typeof radioEmits