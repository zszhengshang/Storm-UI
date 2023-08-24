import { ExtractPropTypes, InjectionKey } from "vue"
import { radioEmits } from "./radio"

interface RadioGroupContext extends RadioGroupProps {
  changeEvent: (val: RadioGroupProps['modelValue']) => void
}
export const radioGroupProps = {
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  disabled: Boolean,
  name: {
    type: String,
    default: undefined,
  }
}

export const radioGroupEmits = radioEmits
export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('radioGroupKey')

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
export type RadioGroupEmits = typeof radioGroupEmits