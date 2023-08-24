import { computed, getCurrentInstance, inject, ref } from "vue";
import { RadioProps } from "./radio";
import { radioGroupKey } from "./radio-group";
import { UPDATE_MODEL_EVENT } from "@storm/constants";

export const useRadio = (props: RadioProps) => {
  const radioRef = ref<HTMLInputElement>()
  const { emit } = getCurrentInstance()!
  const radioGroup = inject(radioGroupKey, undefined)
  const isGroup = computed(() => !!radioGroup)

  const model = computed<RadioProps['modelValue']>({
    get() {
      return isGroup.value ? radioGroup!.modelValue : props.modelValue
    },
    set(val) {
      if (isGroup.value) {
        radioGroup!.changeEvent(val)
      } else {
        emit(UPDATE_MODEL_EVENT, val)
      }
      radioRef.value!.checked = props.modelValue === props.label
    }
  })

  const isDisabled = computed(() => !radioGroup?.disabled ? props.disabled : radioGroup?.disabled)

  return {
    radioRef,
    model,
    isDisabled,
    radioGroup
  }
}