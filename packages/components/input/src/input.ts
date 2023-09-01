import { UPDATE_MODEL_EVENT } from "@storm/constants";
import { iconPropType, isString } from "@storm/utils";
import { ExtractPropTypes, PropType } from "vue";

export const inputProps = {
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [String, Number, Object] as PropType<string | number | null | undefined>,
    default: ''
  },
  disabled: Boolean,
  placeholder: String,
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  suffixIcon: {
    type: iconPropType
  },
  prefixIcon: {
    type: iconPropType
  },
  maxLength: [String, Number]
}

export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (val: string) => isString(val),
  input: (val: string) => isString(val),
  change: (val: string) => isString(val),
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  keydown: (e: KeyboardEvent | Event) => e instanceof Event,
  clear: () => true
}

export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputEmits = typeof inputEmits