import { ShallowRef, getCurrentInstance, ref, shallowRef } from "vue"
import { useEventListener } from '@vueuse/core'

export const useFocus = <T extends HTMLElement>(target: ShallowRef<T | undefined>) => {
  const { emit } = getCurrentInstance()!
  const wrapperRef = shallowRef<HTMLElement>()
  // 记录是否聚焦
  const isFocused = ref(false)

  const handleFocus = (e: FocusEvent) => {
    if (isFocused.value) return
    isFocused.value = true
    emit('focus', e)
  }
  const handleBlur = (e: FocusEvent) => {
    isFocused.value = false
    emit('blur', e)
  }
  // 点击输入框任何地方都尝试获取焦点
  useEventListener(wrapperRef, 'click', () => {
    target.value?.focus()
  })

  return {
    wrapperRef,
    isFocused,
    handleFocus,
    handleBlur
  }
}