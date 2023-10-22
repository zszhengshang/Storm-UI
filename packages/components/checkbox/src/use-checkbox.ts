import { SetupContext, computed, getCurrentInstance, inject } from "vue";
import { CheckboxProps } from "./checkbox";
import { checkboxGroupContextKey } from "./checkbox-group";
import { isArray, isBoolean } from "@storm/utils";
import { UPDATE_MODEL_EVENT } from "@storm/constants";

export const useCheckbox = (props: CheckboxProps, slots: SetupContext['slots']) => {
  const { emit } = getCurrentInstance()!
  const checkboxGroup = inject(checkboxGroupContextKey, undefined)
  const isGroup = computed(() => !!checkboxGroup)

  const model = computed({
    get() {
      return isGroup.value ? checkboxGroup?.modelValue?.value : props.modelValue
    },
    set(val: unknown) {
      if (isGroup.value && isArray(val)) {
        checkboxGroup?.changeEvent?.(val)
      } else {
        emit(UPDATE_MODEL_EVENT, val)
      }
    }
  })
  const isChecked = computed(() => {
    const value = model.value
    if (isBoolean(value)) {
      return value
    } else if (isArray(value)) {
      return value.includes(props.label)
    } else {
      return !!value
    }
  })
  const isDisabled = computed(() => checkboxGroup?.disabled ? checkboxGroup.disabled : props.disabled)
  // 没传label也没有默认插槽
  const hasOwnLabel = computed<boolean>(() => {
    return !!(slots.default || props.label)
  })

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    emit('change', target.checked)
  }

  return {
    model,
    isChecked,
    isDisabled,
    hasOwnLabel,
    handleChange
  }
}