import { computed, inject } from "vue";
import { RadioProps } from "./radio";
import { radioGroupKey } from "./radio-group";

export const useRadio = (props: RadioProps) => {
  const radioGroup = inject(radioGroupKey, undefined)
  const isGroup = computed(() => !!radioGroup)
}