import { UPDATE_MODEL_EVENT } from "@storm/constants"
import { isBoolean, isNumber, isString } from "@storm/utils"
import { ExtractPropTypes } from "vue"

export const switchProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: Boolean,
  loading: Boolean,
  name: String
}

export const switchEmits = {
  [UPDATE_MODEL_EVENT]: (val: boolean) => isBoolean(val),
  change: (val: boolean) => isBoolean(val)
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchEmits = typeof switchEmits