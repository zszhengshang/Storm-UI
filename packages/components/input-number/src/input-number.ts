import { UPDATE_MODEL_EVENT } from "@storm/constants"
import { isNil, isNumber, isUndefined } from "@storm/utils"
import { ExtractPropTypes } from "vue"

export const inputNumberProps = {
  modelValue: Number,
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY
  },
  min: {
    type: Number,
    default: Number.NEGATIVE_INFINITY
  },
  step: {
    type: Number,
    default: 1
  },
  precision: {
    type: Number,
    validator: (val: number) => val >= 0
  },
  readonly: Boolean,
  disabled: Boolean,
  controls: {
    type: Boolean,
    default: true
  },
  name: String,
  label: String,
  placeholder: String
}

export const inputNumberEmits = {
  [UPDATE_MODEL_EVENT]: (val: number | undefined) => isNumber(val) || isNil(val),
  change: (val: number | undefined) => isNumber(val) || isUndefined(val),
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
}

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>
export type InputNumberEmits = typeof inputNumberEmits